import { useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useRoomStore } from "../../store/room";
import { useSocket } from "../socket/socket-provider";
import { request } from "../../utils/request";
import { detectDeviceAsync, Device } from "mediasoup-client";
import { useTransportStore } from "../../store/transport";
import { usePeerStore } from "../../store/peer";
import { useProducerStore } from "../../store/producer";
import { useMicStore } from "../../store/mic";
import { reset } from "../../utils/reset";
import { useShallow } from "../../hooks/use-shallow";
import type { EventError, Room } from "types";

export const useRoom = (room: Room) => {
  const { socket } = useSocket();
  const deviceref = useRef<Device | null>(null);
  const router = useRouter();
  const setroomstore = useRoomStore((state) => state.set);
  const peerstore = usePeerStore(
    useShallow((state) => ({
      reset: state.reset,
      peers: state.peers,
      add: state.add
    }))
  );

  const leave = useCallback(async () => {
    if (!socket) return;

    setroomstore({ state: "disconnecting" });

    await request({
      socket,
      event: "leave",
      payload: {}
    });

    reset();
  }, [socket]);

  const join = useCallback(async () => {
    if (!socket) return;

    setroomstore({ state: "connecting" });

    const {
      producer,
      reset: resetproducer,
      set: setproducerstore,
      add: addproducer
    } = useProducerStore.getState();

    const {
      send_transport,
      receive_transport,
      resetsendtransport,
      resetreceivetransport,
      setsendtransport,
      setreceivetransport
    } = useTransportStore.getState();

    const { id: micid, setstream, settrack } = useMicStore.getState();

    if (producer) resetproducer();

    if (send_transport) resetsendtransport();

    if (receive_transport) resetreceivetransport();

    try {
      const { rtp_capabilities } = await request({
        socket,
        event: "rtp capabilities",
        payload: {
          room_id: room._id
        }
      });

      if (!deviceref.current) {
        let handlername = await detectDeviceAsync();

        if (!handlername) handlername = "Chrome74";

        deviceref.current = new Device({ handlerName: handlername });
      }

      const device = deviceref.current;

      if (!device.loaded)
        await device.load({ routerRtpCapabilities: rtp_capabilities });

      {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: micid ? { deviceId: micid } : true
        });

        const track = stream.getAudioTracks()[0]!;

        track.enabled = false;

        setTimeout(() => track.stop(), 120000);
      }

      const { transport_options: sendtransportoptions } = await request({
        socket,
        event: "create transport",
        payload: {
          room_id: room._id,
          direction: "send"
        }
      });

      const sendtransport = device.createSendTransport({
        id: sendtransportoptions.id,
        iceParameters: sendtransportoptions.ice_parameters,
        iceCandidates: sendtransportoptions.ice_candidates,
        dtlsParameters: {
          ...sendtransportoptions.dtls_parameters,
          role: "auto"
        },
        iceServers: []
      });

      sendtransport.on(
        "connect",
        ({ dtlsParameters: dtls_parameters }, callback, errorback) => {
          request({
            socket,
            event: "connect transport",
            payload: {
              room_id: room._id,
              transport_id: sendtransport.id,
              dtls_parameters
            }
          })
            .then(callback)
            .catch(errorback);
        }
      );

      sendtransport.on(
        "produce",
        async (
          { kind, rtpParameters: rtp_parameters, appData: app_data },
          callback,
          errorback
        ) => {
          try {
            const { id } = await request({
              socket,
              event: "produce",
              payload: {
                room_id: room._id,
                transport_id: sendtransport.id,
                kind,
                rtp_parameters,
                app_data: app_data as Record<string, string>
              }
            });

            callback({ id });
          } catch (e) {
            errorback(e as Error);
          }
        }
      );

      setsendtransport(sendtransport);

      const { transport_options: receivetransportoptions } = await request({
        socket,
        event: "create transport",
        payload: {
          room_id: room._id,
          direction: "receive"
        }
      });

      const receivetransport = device.createRecvTransport({
        id: receivetransportoptions.id,
        iceParameters: receivetransportoptions.ice_parameters,
        iceCandidates: receivetransportoptions.ice_candidates,
        dtlsParameters: {
          ...receivetransportoptions.dtls_parameters,
          role: "auto"
        },
        iceServers: []
      });

      setreceivetransport(receivetransport);

      receivetransport.on(
        "connect",
        ({ dtlsParameters: dtls_parameters }, callback, errorback) => {
          request({
            socket,
            event: "connect transport",
            payload: {
              room_id: room._id,
              transport_id: receivetransport.id,
              dtls_parameters
            }
          })
            .then(callback)
            .catch(errorback);
        }
      );

      const { peers } = await request({
        socket,
        event: "join",
        payload: {
          room_id: room._id,
          rtp_capabilities: device.rtpCapabilities
        }
      });

      for (const peer of peers) peerstore.add(peer);

      if (!device.canProduce("audio")) {
        setroomstore({
          state: "connected",
          warn_message: "Cannot consume your audio due to some unknown error"
        });

        toast.info("connected");

        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: micid ? { deviceId: micid } : true
      });

      const track = stream.getAudioTracks()[0]!;

      setstream(stream);
      settrack(track);

      const producer = await sendtransport.produce({
        track,
        codecOptions: {
          opusStereo: true,
          opusDtx: true
        }
      });

      producer.on("transportclose", () => {
        setproducerstore({ producer: null });
      });

      producer.on("trackended", async () => {
        toast.warn("Microphone disconnected");

        await leave();

        await router.replace("/app/rooms");
      });

      addproducer(producer);

      setroomstore({ state: "connected" });
    } catch (e) {
      const error = e as Error;
      console.error("[useRoom.join()] error", error);

      reset({
        room: {
          state: "error",
          error: "errors" in error ? (error as EventError) : error.message
        }
      });
    }
  }, [socket, leave, room._id]);

  const mute = useCallback(async () => {
    if (!socket) return;

    const { producer, setpaused } = useProducerStore.getState();

    if (!producer) return;

    producer.pause();

    try {
      await request({
        socket,
        event: "pause producer",
        payload: {
          producer_id: producer.id
        }
      });

      setpaused(true);
    } catch (e) {
      console.error("[useRoom.mute()] error", e);
      producer.resume();

      toast.error("Failed to mute");
    }
  }, [socket]);

  const unmute = useCallback(async () => {
    if (!socket) return;

    const { producer, setpaused } = useProducerStore.getState();

    if (!producer) return;

    producer.resume();

    try {
      await request({
        socket,
        event: "resume producer",
        payload: {
          producer_id: producer.id
        }
      });

      setpaused(false);
    } catch (e) {
      console.error("[useRoom.unmute()] error", e);
      producer.pause();

      toast.error("Failed to unmute");
    }
  }, [socket]);

  const disable = useCallback(async () => {
    if (!socket) return;

    const { producer, remove } = useProducerStore.getState();

    if (!producer) return;

    producer.close();

    await request({
      socket,
      event: "close producer",
      payload: {
        producer_id: producer.id
      }
    });

    remove();
  }, [socket]);

  const togglemute = useCallback(async () => {
    const { producer } = useProducerStore.getState();

    if (!producer) return;

    if (producer.paused) await unmute();
    else await mute();
  }, [mute, unmute]);

  return {
    join,
    leave,
    mute,
    unmute,
    disable,
    togglemute
  };
};

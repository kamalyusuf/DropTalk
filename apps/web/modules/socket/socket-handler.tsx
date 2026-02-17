import { useEffect } from "react";
import { useSocket } from "./socket-provider";
import { useTransportStore } from "../../store/transport";
import { useConsumerStore } from "../../store/consumer";
import { usePeerStore } from "../../store/peer";
import { toast } from "react-toastify";
import { useRoomStore } from "../../store/room";
import { useRoomChatStore } from "../../store/room-chat";
import { useUpdateSocketQuery } from "../../hooks/use-update-socket-query";
import { useSettingsStore } from "../../store/settings";
import { reset } from "../../utils/reset";
import { useShallow } from "../../hooks/use-shallow";
import { useRoomChatDrawer } from "../../store/room-chat-drawer";
import { useUserStore } from "../../store/user";
import { SMALL_LAYOUT } from "../../hooks/use-small-layout";
import type { SocketEventHandler } from "./types";

export const SocketHandler = () => {
  const { socket } = useSocket();
  const updatequery = useUpdateSocketQuery();
  const addchat = useRoomChatStore((state) => state.add);
  const { setactivespeaker, setroomstore } = useRoomStore(
    useShallow((state) => ({
      setactivespeaker: state.setactivespeaker,
      setroomstore: state.set
    }))
  );
  const { addpeer, removepeer } = usePeerStore(
    useShallow((state) => ({
      addpeer: state.add,
      removepeer: state.remove
    }))
  );
  const consumerstore = useConsumerStore(
    useShallow((state) => ({
      add: state.add,
      remove: state.remove,
      pause: state.pause,
      resume: state.resume
    }))
  );

  useEffect(() => {
    if (!socket) return;

    const on_error: SocketEventHandler<"error"> = (error) => {
      error.errors.forEach((e) => toast.error(e.message));
    };

    const on_new_consumer: SocketEventHandler<"new consumer"> = async ({
      peer_id,
      producer_id,
      id,
      kind,
      rtp_parameters,
      app_data,
      producer_paused
    }) => {
      const receivetransport = useTransportStore.getState().receive_transport;

      if (!receivetransport) return;

      try {
        const consumer = await receivetransport.consume({
          id,
          producerId: producer_id,
          kind,
          rtpParameters: rtp_parameters,
          appData: {
            ...app_data,
            peer_id
          }
        });

        consumerstore.add({
          consumer,
          paused: producer_paused,
          peer_id
        });

        socket.emit("consumer consumed", {
          consumer_id: consumer.id
        });
      } catch (e) {
        const error = e as Error;
        console.error(error);
        toast.error("Failed to receive remote audio stream.");
      }
    };

    const on_new_peer: SocketEventHandler<"new peer"> = ({ peer }) => {
      addpeer(peer);

      if (useSettingsStore.getState().notify_on_join)
        toast.info(`${peer.display_name} has joined the room`);
    };

    const on_consumer_closed: SocketEventHandler<"consumer closed"> = ({
      peer_id
    }) => {
      consumerstore.remove(peer_id);
    };

    const on_consumer_paused: SocketEventHandler<"consumer paused"> = ({
      peer_id
    }) => {
      consumerstore.pause(peer_id);
    };

    const on_consumer_resumed: SocketEventHandler<"consumer resumed"> = ({
      peer_id
    }) => {
      consumerstore.resume(peer_id);
    };

    const on_peer_left: SocketEventHandler<"peer left"> = ({ peer }) => {
      removepeer(peer._id);
    };

    const on_active_speaker: SocketEventHandler<"active speaker"> = ({
      peer_id,
      speaking
    }) => {
      setactivespeaker(peer_id, speaking);
    };

    const on_peer_updated: SocketEventHandler<"peer updated"> = ({ peer }) => {
      updatequery("rooms", (draft) => {
        draft.rooms.forEach((room) => {
          if (room.creator._id === peer._id)
            room.creator.display_name = peer.display_name;
        });
      });
    };

    const on_delete_room: SocketEventHandler<"delete room"> = ({ room_id }) => {
      updatequery("rooms", (draft) => {
        const index = draft.rooms.findIndex((room) => room._id === room_id);

        if (index > -1) draft.rooms.splice(index, 1);
      });
    };

    const on_create_room: SocketEventHandler<"create room"> = ({ room }) => {
      updatequery("rooms", (draft) => {
        draft.rooms.unshift(room);
      });
    };

    const on_chat_message: SocketEventHandler<"chat message"> = ({
      message
    }) => {
      const { opened, unread, setunread } = useRoomChatDrawer.getState();
      const userid = useUserStore.getState().user?._id;
      const matches = window.matchMedia(SMALL_LAYOUT).matches;

      if (!opened && matches && message.creator._id !== userid && !unread)
        setunread(true);

      addchat(message);
    };

    const on_update_room_members_count: SocketEventHandler<
      "update room members count"
    > = ({ room_id, members_count }) => {
      updatequery("rooms", (draft) => {
        const room = draft.rooms.find((room) => room._id === room_id);

        if (room) room.members_count = members_count;
      });
    };

    const on_room_session_at: SocketEventHandler<"room session at"> = ({
      in_session_at
    }) => {
      setroomstore({ in_session_at });
    };

    const on_transport_closed: SocketEventHandler<"transport closed"> = () => {
      reset({
        room: {
          state: "closed"
        }
      });
    };

    socket.on("error", on_error);
    socket.on("new consumer", on_new_consumer);
    socket.on("new peer", on_new_peer);
    socket.on("consumer closed", on_consumer_closed);
    socket.on("consumer paused", on_consumer_paused);
    socket.on("consumer resumed", on_consumer_resumed);
    socket.on("peer left", on_peer_left);
    socket.on("active speaker", on_active_speaker);
    socket.on("peer updated", on_peer_updated);
    socket.on("delete room", on_delete_room);
    socket.on("create room", on_create_room);
    socket.on("chat message", on_chat_message);
    socket.on("update room members count", on_update_room_members_count);
    socket.on("room session at", on_room_session_at);
    socket.on("transport closed", on_transport_closed);

    return () => {
      socket.off("error", on_error);
      socket.off("new consumer", on_new_consumer);
      socket.off("new peer", on_new_peer);
      socket.off("consumer closed", on_consumer_closed);
      socket.off("consumer paused", on_consumer_paused);
      socket.off("consumer resumed", on_consumer_resumed);
      socket.off("peer left", on_peer_left);
      socket.off("active speaker", on_active_speaker);
      socket.off("peer updated", on_peer_updated);
      socket.off("delete room", on_delete_room);
      socket.off("create room", on_create_room);
      socket.off("chat message", on_chat_message);
      socket.off("update room members count", on_update_room_members_count);
      socket.off("room session at", on_room_session_at);
      socket.off("transport closed", on_transport_closed);
    };
  }, [socket]);

  return null;
};

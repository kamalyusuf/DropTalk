import { useState, useEffect, useRef, useCallback } from "react";
import { Loader, ActionIcon, Drawer, Badge, Box } from "@mantine/core";
import { useHotkeys, useMounted } from "@mantine/hooks";
import type { Room } from "types";
import { useRoom } from "./use-room";
import { Layout } from "../../components/layout";
import { Chat } from "./chat/chat";
import { RoomPanel } from "./room-panel";
import type { PageComponent } from "../../types";
import { useRoomStore } from "../../store/room";
import { useSocket } from "../socket/socket-provider";
import { RoomLogin } from "./room-login";
import { RoomError } from "./room-error";
import { useActiveSpeaker } from "../../hooks/use-active-speaker";
import { Alert } from "../../components/alert";
import { AbsoluteCenter } from "../../components/absolute-center";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IconMessage } from "@tabler/icons-react";
import { useRoomChatDrawer } from "../../store/room-chat-drawer";
import { useSmallLayout } from "../../hooks/use-small-layout";

interface Props {
  room: Room;
}

export const RoomPage: PageComponent<Props> = ({ room }) => {
  useActiveSpeaker();
  const mounted = useMounted();
  const { join, leave, togglemute } = useRoom(room);
  const roomstate = useRoomStore((state) => state.state);
  const { state } = useSocket();
  const [ok, setok] = useState(false);
  const called = useRef(false);
  const { replace, events } = useRouter();
  const matches = useSmallLayout();
  const { opened, open, close, unread } = useRoomChatDrawer();
  const left = useRef(false);

  const locked = room.status === "protected";

  useEffect(() => {
    if (
      ((locked && ok) || !locked) &&
      state === "connected" &&
      !called.current
    ) {
      called.current = true;

      join();
    }
  }, [state, ok, locked, join]);

  useEffect(() => {
    if (roomstate !== "closed") return;

    toast.error("Audio connection lost");
    replace("/app/rooms");
  }, [roomstate, replace]);

  const safeleave = useCallback(async () => {
    if (left.current) return;

    left.current = true;
    await leave();
  }, [leave]);

  const exit = useCallback(async () => {
    await safeleave();
    await replace("/app/rooms");
  }, [safeleave, replace]);

  useEffect(() => {
    const listener = async () => {
      await safeleave();
    };

    events.on("routeChangeStart", listener);

    return () => {
      events.off("routeChangeStart", listener);
    };
  }, [events, safeleave]);

  useHotkeys([["m", () => togglemute()]]);

  if (!mounted) return null;

  if (state === "connecting")
    return (
      <AbsoluteCenter>
        <Loader size="lg" />
      </AbsoluteCenter>
    );

  if (state !== "connected")
    return (
      <Alert
        type="error"
        message="connection failed. try refreshing the page"
        wrap
      />
    );

  if (locked && !ok) return <RoomLogin room={room} onok={setok} />;

  if (roomstate === "error") return <RoomError />;

  if (roomstate === "closed") return null;

  if (roomstate === "connected")
    return (
      <Layout title={`${room.name} | DropTalk`}>
        <Box
          style={{
            display: "flex",
            gap: "var(--mantine-spacing-lg)",
            alignItems: "stretch",
            height: "calc(100vh - var(--mantine-spacing-xl) * 4)",
            width: "100%",
            overflow: "hidden"
          }}
        >
          <RoomPanel room={room} actions={{ leave: exit, togglemute }} />
          {matches ? (
            <>
              <Box
                style={{
                  position: "fixed",
                  bottom: 24,
                  right: 24,
                  zIndex: 50,
                  display: "inline-block"
                }}
              >
                <Box style={{ position: "relative", display: "inline-block" }}>
                  <ActionIcon
                    variant="light"
                    color="indigo"
                    size="lg"
                    radius="xl"
                    aria-label="Open chat"
                    onClick={open}
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <IconMessage size={22} stroke={1.5} />
                  </ActionIcon>
                  {unread && (
                    <Badge
                      color="red"
                      size="xs"
                      circle
                      style={{ position: "absolute", top: -4, right: -4 }}
                    >
                      !
                    </Badge>
                  )}
                </Box>
              </Box>
              <Drawer
                opened={opened}
                onClose={close}
                size="100%"
                styles={{
                  content: { backgroundColor: "var(--color-background)" },
                  header: {
                    backgroundColor: "var(--color-surface)",
                    borderBottom: "1px solid var(--color-shade)"
                  },
                  close: { color: "white" },
                  body: { height: "90%" }
                }}
              >
                <Chat drawer />
              </Drawer>
            </>
          ) : (
            <Chat />
          )}
        </Box>
      </Layout>
    );

  return null;
};

RoomPage.authenticate = "yes";

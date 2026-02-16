import {
  Group,
  Text,
  Button,
  ScrollArea,
  Notification,
  Stack,
  ActionIcon,
  Modal,
  Box,
  SimpleGrid
} from "@mantine/core";
import { ToggleMuteButton } from "../audio/toggle-mute-button";
import { PeerBadge } from "../user/peer-badge";
import { useRouter } from "next/router";
import type { Room } from "types";
import { usePeerStore } from "../../store/peer";
import { useUserStore } from "../../store/user";
import { useRoomStore } from "../../store/room";
import { useClipboard, useDisclosure, useHotkeys } from "@mantine/hooks";
import { IconShare, IconInfoCircle, IconLogout } from "@tabler/icons-react";
import { useRoomTimeElapsed } from "./use-room-time-elapsed";
import { useCallback } from "react";
import { KeyboardShortcut } from "../../components/keyboard-shortcut";
import { useShallow } from "../../hooks/use-shallow";

interface Props {
  room: Room;
  actions: {
    leave: () => Promise<void>;
    togglemute: () => Promise<void>;
  };
}

export const RoomPanel = ({ room, actions }: Props) => {
  const router = useRouter();
  const peers = usePeerStore((state) => state.peers);
  const user = useUserStore((state) => state.user);
  const clipboard = useClipboard({ timeout: 1500 });
  const elapsed = useRoomTimeElapsed();
  const [opened, { open, close }] = useDisclosure(false);
  const { activespeakers, roomstate, setroomstore, warning } = useRoomStore(
    useShallow((state) => ({
      roomstate: state.state,
      warning: state.warn_message,
      activespeakers: state.active_speakers,
      setroomstore: state.set
    }))
  );

  const leaving = roomstate === "disconnecting";

  useHotkeys([
    [
      "l",
      async () => {
        await actions.leave();
        await router.replace("/app/rooms");
      }
    ],
    ["s", () => clipboard.copy(window.location)]
  ]);

  const leave = useCallback(async () => {
    await actions.leave();
    await router.replace("/app/rooms");
  }, [actions.leave]);

  if (!user) return null;

  return (
    <>
      <Box
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          borderRadius: "var(--radius-card)",
          backgroundColor: "var(--color-elevated)",
          border: "1px solid var(--color-shade)",
          boxShadow: "var(--shadow-card)",
          overflow: "hidden"
        }}
      >
        {!!warning && (
          <Notification
            color="yellow"
            onClose={() => setroomstore({ warn_message: "" })}
            style={{ borderRadius: 0 }}
          >
            {warning}
          </Notification>
        )}

        <Box
          p="lg"
          style={{
            borderBottom: "1px solid var(--color-shade)"
          }}
        >
          <Group
            justify="space-between"
            align="flex-start"
            wrap="wrap"
            gap="md"
          >
            <Box style={{ minWidth: 0 }}>
              <Text
                fw={700}
                size="lg"
                c="white"
                style={{ letterSpacing: "-0.01em" }}
              >
                {room.name}
              </Text>
              {room.description ? (
                <Text size="sm" c="dimmed" mt={2}>
                  {room.description}
                </Text>
              ) : null}
            </Box>
            <Group gap="xs">
              <Text c="dimmed">{elapsed}</Text>
              <ActionIcon
                color="indigo"
                variant="subtle"
                onClick={open}
                aria-label="Keyboard shortcuts"
              >
                <IconInfoCircle size={18} />
              </ActionIcon>
            </Group>
          </Group>

          <Group
            justify="space-between"
            align="center"
            mt="lg"
            wrap="wrap"
            gap="sm"
          >
            <ToggleMuteButton toggle={actions.togglemute} />
            <Group gap="sm">
              <Button
                radius="md"
                variant="subtle"
                color="gray"
                leftSection={<IconShare size={14} />}
                onClick={() => clipboard.copy(window.location)}
              >
                {clipboard.copied ? "Copied" : "Share link"}
              </Button>
              <Button
                radius="md"
                variant="subtle"
                color="red"
                onClick={leave}
                disabled={leaving}
                loading={leaving}
                leftSection={<IconLogout size={16} />}
              >
                Leave room
              </Button>
            </Group>
          </Group>
        </Box>

        <Box
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Text fw={500} c="dimmed" px="lg" pt="md" pb="xs">
            In this room
          </Text>
          <ScrollArea
            style={{ flex: 1 }}
            type="auto"
            offsetScrollbars
            styles={{
              root: { flex: 1 },
              thumb: { backgroundColor: "var(--color-primary)" }
            }}
          >
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3 }}
              spacing="sm"
              p="lg"
              pt="xs"
            >
              <PeerBadge
                peer={user}
                speaker={Boolean(activespeakers[user._id])}
                me={true}
              />
              {Object.values(peers).map((peer) => (
                <PeerBadge
                  key={peer._id}
                  peer={peer}
                  speaker={Boolean(activespeakers[peer._id])}
                  me={false}
                />
              ))}
            </SimpleGrid>
          </ScrollArea>
        </Box>
      </Box>

      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text fw={600} size="lg" c="white">
            Keyboard shortcuts
          </Text>
        }
        radius="var(--radius-card)"
        styles={{
          content: {
            backgroundColor: "var(--color-elevated)",
            border: "1px solid var(--color-shade)"
          },
          header: {
            backgroundColor: "var(--color-elevated)",
            borderBottom: "1px solid var(--color-shade)"
          }
        }}
      >
        <Stack gap="sm">
          <KeyboardShortcut shortcut="m" label="Mute / unmute" />
          <KeyboardShortcut shortcut="s" label="Share room link" />
          <KeyboardShortcut shortcut="l" label="Leave room" />
          <KeyboardShortcut shortcut="c" label="Focus chat" />
        </Stack>
      </Modal>
    </>
  );
};

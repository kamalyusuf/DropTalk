import { Box, Text, ThemeIcon, Stack, Modal, Slider } from "@mantine/core";
import { Audio } from "../audio/audio";
import { useConsumerStore } from "../../store/consumer";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import { useShallow } from "../../hooks/use-shallow";
import type { User } from "types";

export const PeerBadge = ({
  peer,
  speaker,
  me
}: {
  peer: User;
  speaker: boolean;
  me: boolean;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { consumers, setvolume } = useConsumerStore(
    useShallow((state) => ({
      consumers: state.consumers,
      setvolume: state.setvolume
    }))
  );

  const paused = consumers[peer._id]?.paused;
  const volume = consumers[peer._id]?.volume;
  const consumer = consumers[peer._id]?.consumer;
  const initial = peer.display_name.slice(0, 1).toUpperCase();

  const card = (
    <Box
      component="button"
      type="button"
      onClick={() => !me && open()}
      disabled={me}
      style={{
        width: "100%",
        border: "none",
        cursor: me ? "default" : "pointer",
        textAlign: "left",
        padding: "var(--mantine-spacing-md)",
        borderRadius: "var(--radius-app)",
        backgroundColor: "var(--color-surface)",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: speaker
          ? me
            ? "var(--color-danger)"
            : "var(--color-primary)"
          : "var(--color-shade)",
        transition: "border-color 0.15s ease, background-color 0.15s ease"
      }}
      onMouseEnter={(e) => {
        if (!me) e.currentTarget.style.backgroundColor = "var(--color-elevated)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-surface)";
      }}
    >
      <Stack gap="xs" align="center">
        <ThemeIcon
          size={48}
          radius="xl"
          color={me ? "red" : "indigo"}
          variant="light"
        >
          {paused ? (
            <AiOutlineAudioMuted size={24} />
          ) : (
            <Text fw={700} size="lg">
              {initial}
            </Text>
          )}
        </ThemeIcon>
        <Text size="sm" fw={500} c="white" truncate style={{ width: "100%", textAlign: "center" }}>
          {me ? "You" : peer.display_name}
        </Text>
        {speaker && (
          <Text size="xs" c={me ? "red" : "indigo"}>
            Speaking
          </Text>
        )}
      </Stack>
    </Box>
  );

  return (
    <>
      {card}
      {me ? null : <Audio consumer={consumer!} volume={volume ?? 100} />}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text fw={600} size="lg" c="white">
            {peer.display_name} — Volume
          </Text>
        }
        radius="var(--radius-card)"
        styles={{
          content: { backgroundColor: "var(--color-elevated)", border: "1px solid var(--color-shade)" },
          header: { backgroundColor: "var(--color-elevated)", borderBottom: "1px solid var(--color-shade)" }
        }}
      >
        <Slider
          value={volume}
          onChange={(value) => setvolume(peer._id, value)}
          label={(v) => `${v}%`}
        />
      </Modal>
    </>
  );
};

import { ActionIcon } from "@mantine/core";
import { IconMicrophoneFilled, IconMicrophoneOff } from "@tabler/icons-react";
import { useProducerStore } from "../../store/producer";

interface Props {
  toggle: () => Promise<void>;
}

export const ToggleMuteButton = ({ toggle }: Props) => {
  const producer = useProducerStore((state) => state.producer);

  return (
    <ActionIcon
      onClick={toggle}
      variant="light"
      color={producer?.paused ? "red" : "indigo"}
      size="lg"
      radius="xl"
      aria-label={producer?.paused ? "Unmute" : "Mute"}
    >
      {producer?.paused ? (
        <IconMicrophoneOff size={24} />
      ) : (
        <IconMicrophoneFilled size={24} />
      )}
    </ActionIcon>
  );
};

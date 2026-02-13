import { ActionIcon } from "@mantine/core";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
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
      {producer?.paused ? <IoMdMicOff size={24} /> : <IoMdMic size={24} />}
    </ActionIcon>
  );
};

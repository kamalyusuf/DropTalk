import { Modal, Text } from "@mantine/core";
import { CreateRoomForm } from "./create-room-form";

interface Props {
  opened: boolean;
  setopened: (value: boolean) => void;
}

export const CreateRoomModal = ({ opened, setopened }: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setopened(false)}
      title={
        <Text fw={700} size="xl">
          Create a room
        </Text>
      }
      size="md"
      radius="var(--radius-card)"
      padding="xl"
      styles={{
        content: {
          backgroundColor: "var(--color-elevated)",
          border: "1px solid var(--color-shade)",
          boxShadow: "var(--shadow-card)"
        },
        header: {
          backgroundColor: "var(--color-elevated)",
          borderBottom: "1px solid var(--color-shade)",
          paddingBottom: 0
        }
      }}
    >
      <CreateRoomForm oncancel={() => setopened(false)} />
    </Modal>
  );
};

import { Group, Text, Button, Box, ThemeIcon } from "@mantine/core";
import { IconLock, IconUsers } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { micenabled } from "../../utils/mic";
import type { Room } from "types";

interface Props {
  room: Room;
}

export const RoomCard = ({ room }: Props) => {
  const router = useRouter();

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--mantine-spacing-md)",
        padding: "var(--mantine-spacing-md) var(--mantine-spacing-lg)",
        borderRadius: "var(--radius-app)",
        border: "1px solid var(--color-shade)",
        backgroundColor: "var(--color-surface)",
        transition: "border-color 0.15s ease, background-color 0.15s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-elevated)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-surface)";
      }}
    >
      <Group gap="md" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
        <ThemeIcon size={44} radius="xl" color="indigo" variant="light">
          <IconUsers size={22} />
        </ThemeIcon>
        <Box style={{ minWidth: 0, flex: 1 }}>
          <Group gap="xs" align="center">
            <Text fw={600} size="md" c="white" lineClamp={1}>
              {room.name}
            </Text>
            {room.status === "protected" && (
              <ThemeIcon size="sm" radius="sm" color="yellow" variant="light">
                <IconLock size={12} />
              </ThemeIcon>
            )}
          </Group>
          {room.description ? (
            <Text size="sm" c="dimmed" lineClamp={1} mt={2}>
              {room.description}
            </Text>
          ) : null}
          <Text size="xs" c="dimmed" mt={4}>
            {room.members_count} in room · {room.creator.display_name}
          </Text>
        </Box>
      </Group>

      <Button
        size="sm"
        radius="md"
        variant="light"
        color="indigo"
        onClick={async () => {
          if (!(await micenabled())) return;

          await router.push(`/app/rooms/${room._id}`);
        }}
      >
        Join
      </Button>
    </Box>
  );
};

import { ActionIcon, Box, Group, Text } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";

interface Props {
  opened: boolean;
  toggle: () => void;
  title?: string;
}

export const MobileHeader = ({ opened, toggle, title }: Props) => {
  return (
    <Box
      py="md"
      px="md"
      style={{
        borderBottom: "1px solid var(--color-shade)",
        backgroundColor: "var(--color-surface)",
        position: "sticky",
        top: 0,
        zIndex: 99
      }}
    >
      <Group justify="space-between">
        <Group>
          <ActionIcon
            variant="transparent"
            color="gray"
            onClick={toggle}
            aria-label="Toggle navigation"
          >
            <IconMenu2 />
          </ActionIcon>
          <Text fw={700} size="lg" c="white">
            uhhhh
          </Text>
        </Group>
        {title && (
          <Text size="sm" c="dimmed" truncate>
            {title}
          </Text>
        )}
      </Group>
    </Box>
  );
};

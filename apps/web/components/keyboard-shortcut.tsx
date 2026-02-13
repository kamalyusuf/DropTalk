import { Kbd, Group, Text } from "@mantine/core";

interface Props {
  shortcut: string;
  label: string;
}

export const KeyboardShortcut = ({ shortcut, label }: Props) => {
  return (
    <Group gap="sm">
      <Kbd>{shortcut}</Kbd>
      <Text c="dimmed">{label}</Text>
    </Group>
  );
};

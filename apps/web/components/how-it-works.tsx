import {
  Box,
  Container,
  Group,
  rem,
  Stack,
  Text,
  ThemeIcon,
  Title
} from "@mantine/core";

export const HowItWorks = () => {
  return (
    <Box
      py={{ base: rem(48), sm: rem(64) }}
      px="md"
      style={{
        backgroundColor: "var(--color-surface)",
        borderTop: "1px solid var(--color-shade)"
      }}
    >
      <Container size="md">
        <Title order={2} ta="center" fw={700} mb="xl" c="white">
          How it works
        </Title>
        <Stack gap="xl">
          <Group align="flex-start" wrap="nowrap" gap="lg">
            <ThemeIcon size={36} radius="md" color="indigo" variant="light">
              1
            </ThemeIcon>
            <Box>
              <Text fw={600} c="white">
                Open the app and enter a display name
              </Text>
              <Text size="sm" c="dimmed" mt={4} style={{ lineHeight: 1.55 }}>
                No sign-up. Just pick a name (and optionally “remember me” for
                next time).
              </Text>
            </Box>
          </Group>
          <Group align="flex-start" wrap="nowrap" gap="lg">
            <ThemeIcon size={36} radius="md" color="indigo" variant="light">
              2
            </ThemeIcon>
            <Box>
              <Text fw={600} c="white">
                Create a room or join an existing one
              </Text>
              <Text size="sm" c="dimmed" mt={4} style={{ lineHeight: 1.55 }}>
                Create a room with a name and description, or browse the list
                and join any public room. Protected rooms need a password.
              </Text>
            </Box>
          </Group>
          <Group align="flex-start" wrap="nowrap" gap="lg">
            <ThemeIcon size={36} radius="md" color="indigo" variant="light">
              3
            </ThemeIcon>
            <Box>
              <Text fw={600} c="white">
                Share the link and talk
              </Text>
              <Text size="sm" c="dimmed" mt={4} style={{ lineHeight: 1.55 }}>
                Share the room URL with others. Once they’re in, you can talk in
                real time and use chat if you need it.
              </Text>
            </Box>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
};

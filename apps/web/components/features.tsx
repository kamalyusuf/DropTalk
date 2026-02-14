import {
  Box,
  Container,
  rem,
  SimpleGrid,
  Text,
  ThemeIcon
} from "@mantine/core";
import {
  IconLock,
  IconMessageCircle,
  IconMicrophone,
  IconUsers
} from "@tabler/icons-react";

export const Features = () => {
  return (
    <Box py={{ base: rem(48), sm: rem(64) }} px="md">
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          <Box
            p="lg"
            style={{
              borderRadius: "var(--mantine-radius-md)",
              border: "1px solid var(--color-shade)",
              backgroundColor: "var(--color-surface)",
              height: "100%"
            }}
          >
            <ThemeIcon size={40} radius="md" color="indigo" variant="light">
              <IconMicrophone size={22} />
            </ThemeIcon>
            <Text fw={600} size="lg" mt="md" c="white">
              Real-time voice
            </Text>
            <Text size="sm" c="dimmed" mt="xs" style={{ lineHeight: 1.55 }}>
              Talk with others with low-latency audio. Mute and unmute anytime.
              No video, no clutter—just voice.
            </Text>
          </Box>
          <Box
            p="lg"
            style={{
              borderRadius: "var(--mantine-radius-md)",
              border: "1px solid var(--color-shade)",
              backgroundColor: "var(--color-surface)",
              height: "100%"
            }}
          >
            <ThemeIcon size={40} radius="md" color="indigo" variant="light">
              <IconUsers size={22} />
            </ThemeIcon>
            <Text fw={600} size="lg" mt="md" c="white">
              Instant rooms
            </Text>
            <Text size="sm" c="dimmed" mt="xs" style={{ lineHeight: 1.55 }}>
              Create a room with a name and optional description. Share the
              link—anyone with it can join. Public or password-protected.
            </Text>
          </Box>
          <Box
            p="lg"
            style={{
              borderRadius: "var(--mantine-radius-md)",
              border: "1px solid var(--color-shade)",
              backgroundColor: "var(--color-surface)",
              height: "100%"
            }}
          >
            <ThemeIcon size={40} radius="md" color="indigo" variant="light">
              <IconLock size={22} />
            </ThemeIcon>
            <Text fw={600} size="lg" mt="md" c="white">
              No account needed
            </Text>
            <Text size="sm" c="dimmed" mt="xs" style={{ lineHeight: 1.55 }}>
              No email, no password. Choose a display name and you’re in.
              Optional “remember me” so returning is one click.
            </Text>
          </Box>
          <Box
            p="lg"
            style={{
              borderRadius: "var(--mantine-radius-md)",
              border: "1px solid var(--color-shade)",
              backgroundColor: "var(--color-surface)",
              height: "100%"
            }}
          >
            <ThemeIcon size={40} radius="md" color="indigo" variant="light">
              <IconMessageCircle size={22} />
            </ThemeIcon>
            <Text fw={600} size="lg" mt="md" c="white">
              In-room chat
            </Text>
            <Text size="sm" c="dimmed" mt="xs" style={{ lineHeight: 1.55 }}>
              Text chat alongside voice. Share links, notes, or quick replies
              without interrupting the conversation.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

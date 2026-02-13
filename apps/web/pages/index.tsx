import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Text,
  Title,
  Group,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Divider,
  rem
} from "@mantine/core";
import {
  IconMicrophone,
  IconUsers,
  IconLock,
  IconMessageCircle,
  IconArrowRight,
  IconBrandGithub
} from "@tabler/icons-react";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>uhhhh — Voice rooms, drop in and talk</title>
        <meta
          name="description"
          content="Create voice rooms in seconds. No account required. Share a link, talk with others in real time."
        />
      </Head>

      <Box component="main" style={{ minHeight: "100vh" }}>
        {/* Header */}
        <Box
          component="header"
          py="md"
          style={{
            borderBottom: "1px solid var(--color-shade)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "var(--color-background)"
          }}
        >
          <Container size="lg">
            <Group justify="space-between" align="center">
              <Text
                component={Link}
                href="/"
                fw={700}
                size="lg"
                c="white"
                style={{ letterSpacing: "-0.02em", textDecoration: "none" }}
              >
                uhhhh
              </Text>
              <Button
                component={Link}
                href="/app"
                variant="filled"
                color="indigo"
                size="sm"
                radius="md"
              >
                Open app
              </Button>
            </Group>
          </Container>
        </Box>

        {/* Hero */}
        <Box
          py={{ base: rem(60), sm: rem(80) }}
          px="md"
          style={{
            background: `linear-gradient(180deg, var(--color-surface) 0%, var(--color-background) 100%)`
          }}
        >
          <Container size="lg">
            <Box ta="center" maw={720} mx="auto">
              <Title
                order={1}
                fw={800}
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1
                }}
              >
                Voice rooms. Drop in, talk.
              </Title>
              <Text
                size="xl"
                c="dimmed"
                mt="lg"
                maw={560}
                mx="auto"
                style={{ lineHeight: 1.65 }}
              >
                Create a room in seconds. Share a link. No sign-up required—just
                pick a name and go. Real-time voice with optional chat, so you
                can run standups, hang out, or brainstorm without the friction.
              </Text>
              <Group justify="center" mt="xl" gap="md">
                <Button
                  component={Link}
                  href="/app"
                  size="lg"
                  radius="md"
                  variant="filled"
                  color="indigo"
                  rightSection={<IconArrowRight size={18} />}
                >
                  Get started
                </Button>
              </Group>
            </Box>
          </Container>
        </Box>

        {/* Features */}
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
                  Talk with others with low-latency audio. Mute and unmute
                  anytime. No video, no clutter—just voice.
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
                  Text chat alongside voice. Share links, notes, or quick
                  replies without interrupting the conversation.
                </Text>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>

        {/* How it works */}
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
                  <Text
                    size="sm"
                    c="dimmed"
                    mt={4}
                    style={{ lineHeight: 1.55 }}
                  >
                    No sign-up. Just pick a name (and optionally “remember me”
                    for next time).
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
                  <Text
                    size="sm"
                    c="dimmed"
                    mt={4}
                    style={{ lineHeight: 1.55 }}
                  >
                    Create a room with a name and description, or browse the
                    list and join any public room. Protected rooms need a
                    password.
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
                  <Text
                    size="sm"
                    c="dimmed"
                    mt={4}
                    style={{ lineHeight: 1.55 }}
                  >
                    Share the room URL with others. Once they’re in, you can
                    talk in real time and use chat if you need it.
                  </Text>
                </Box>
              </Group>
            </Stack>
          </Container>
        </Box>

        {/* CTA */}
        <Box
          py={{ base: rem(56), sm: rem(72) }}
          px="md"
          style={{
            borderTop: "1px solid var(--color-shade)"
          }}
        >
          <Container size="sm">
            <Box
              p="xl"
              style={{
                borderRadius: "var(--mantine-radius-md)",
                border: "1px solid var(--color-shade)",
                backgroundColor: "var(--color-surface)",
                textAlign: "center"
              }}
            >
              <Title order={3} fw={700} c="white">
                Ready to start?
              </Title>
              <Text c="dimmed" size="sm" mt="sm" mb="lg">
                Create your first room in under a minute.
              </Text>
              <Button
                component={Link}
                href="/app"
                size="lg"
                radius="md"
                variant="filled"
                color="indigo"
                rightSection={<IconArrowRight size={18} />}
              >
                Open app
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Footer */}
        <Divider color="var(--color-shade)" />
        <Box py="lg" px="md">
          <Container size="lg">
            <Group justify="space-between" align="center">
              <Text size="sm" c="dimmed">
                uhhhh — voice rooms, drop in and talk
              </Text>
              <Group gap="xs">
                {/* <Button
                  component={Link}
                  href="/app"
                  variant="subtle"
                  color="gray"
                  size="xs"
                  radius="md"
                >
                  Open app
                </Button> */}
                <Button
                  component="a"
                  href="https://github.com/kamalyusuf/uhhhh"
                  target="_blank"
                  variant="subtle"
                  color="gray"
                  size="xs"
                  leftSection={<IconBrandGithub size={16} />}
                >
                  GitHub
                </Button>
              </Group>
            </Group>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;

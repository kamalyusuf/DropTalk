import { Box, Button, Container, Group, rem, Text, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export const Hero = () => {
  return (
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
            pick a name and go. Real-time voice with optional chat, so you can
            run standups, hang out, or brainstorm without the friction.
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
  );
};

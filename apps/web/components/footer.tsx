import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Stack,
  Text
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export const Footer = () => {
  return (
    <>
      <Divider color="var(--color-shade)" />
      <Box py="lg" px="md">
        <Container size="lg">
          <Group justify="space-between" align="center" visibleFrom="sm">
            <TagLine />
            <Group gap="xs">
              <GithubButton />
            </Group>
          </Group>

          <Stack align="center" gap="md" hiddenFrom="sm">
            <TagLine />
            <GithubButton />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

function TagLine() {
  return (
    <Text size="sm" c="dimmed">
      DropTalk — voice rooms, drop in and talk
    </Text>
  );
}

function GithubButton() {
  return (
    <Button
      component="a"
      href="https://github.com/kamalyusuf/DropTalk"
      target="_blank"
      rel="noopener noreferrer"
      variant="subtle"
      color="gray"
      size="xs"
      leftSection={<IconBrandGithub size={16} />}
    >
      GitHub
    </Button>
  );
}

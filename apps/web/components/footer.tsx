import { Box, Button, Container, Divider, Group, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export const Footer = () => {
  return (
    <>
      <Divider color="var(--color-shade)" />
      <Box py="lg" px="md">
        <Container size="lg">
          <Group justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              DropTalk — voice rooms, drop in and talk
            </Text>
            <Group gap="xs">
              <Button
                component="a"
                href="https://github.com/kamalyusuf/DropTalk"
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
    </>
  );
};

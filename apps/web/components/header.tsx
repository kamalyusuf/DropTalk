import { Box, Button, Container, Group, Text, ThemeIcon } from "@mantine/core";
import Link from "next/link";
import { IconMicrophone } from "@tabler/icons-react";

export const Header = () => {
  return (
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
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Group gap="xs">
              <ThemeIcon variant="transparent">
                <IconMicrophone />
              </ThemeIcon>
              <Text size="xl" fw={700}>
                DropTalk
              </Text>
            </Group>
          </Link>
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
  );
};

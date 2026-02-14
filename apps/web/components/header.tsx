import { Box, Button, Container, Group, Text } from "@mantine/core";
import Link from "next/link";

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
  );
};

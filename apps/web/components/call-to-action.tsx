import { Box, Container, Text, rem, Title, Button } from "@mantine/core";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

export const CallToAction = () => {
  return (
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
  );
};

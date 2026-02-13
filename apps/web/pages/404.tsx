import { Box, Button, Container, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";

const Custom404Page = () => {
  const router = useRouter();

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container size="sm">
        <Box ta="center" maw={400} mx="auto">
          <Text
            fw={700}
            style={{
              fontSize: "clamp(4rem, 20vw, 8rem)",
              lineHeight: 1,
              color: "var(--color-shade)"
            }}
          >
            404
          </Text>
          <Title order={2} fw={600} c="white" mt="lg" size="h3">
            Page not found
          </Title>
          <Text c="dimmed" size="sm" mt="xs" mb="xl">
            The page you’re looking for doesn’t exist or was moved.
          </Text>
          <Button
            variant="light"
            color="indigo"
            radius="md"
            onClick={() => router.replace("/")}
          >
            Back to home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Custom404Page;

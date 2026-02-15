import { Box, Button, Container, Text, Title } from "@mantine/core";

const ServerError = () => {
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
            500
          </Text>
          <Title order={2} fw={600} c="white" mt="lg" size="h3">
            Something went wrong
          </Title>
          <Text c="dimmed" size="sm" mt="xs" mb="xl">
            Our servers couldn’t handle your request. Try refreshing the page.
          </Text>
          <Button
            variant="light"
            color="indigo"
            radius="md"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ServerError;

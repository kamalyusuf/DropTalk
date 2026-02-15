import { useState } from "react";
import { Layout } from "../../components/layout";
import { Box, Group, Button, Title, Text, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { CreateRoomModal } from "./create-room-modal";
import { Rooms } from "./rooms";
import { useMounted } from "@mantine/hooks";
import type { PageComponent } from "../../types";

export const RoomsPage: PageComponent = () => {
  const [opened, setopened] = useState(false);
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <Layout title="Rooms | DropTalk">
      <Box style={{ maxWidth: 900, width: "100%", margin: "0 auto" }}>
        <Group
          justify="space-between"
          align="flex-end"
          mb="xl"
          wrap="wrap"
          gap="md"
        >
          <Box>
            <Title
              order={1}
              fw={700}
              c="white"
              style={{ letterSpacing: "-0.02em" }}
            >
              Rooms
            </Title>
            <Text c="dimmed" mt={4}>
              Join a room or create your own to start talking
            </Text>
          </Box>
          <Button
            leftSection={<IconPlus size={18} />}
            size="md"
            radius="md"
            onClick={() => setopened(true)}
          >
            New room
          </Button>
        </Group>

        <Stack
          p="lg"
          style={{
            borderRadius: "var(--radius-card)",
            backgroundColor: "var(--color-elevated)",
            border: "1px solid var(--color-shade)",
            boxShadow: "var(--shadow-card)",
            minHeight: 320,
            maxHeight: "calc(100vh - 220px)",
            overflow: "auto"
          }}
        >
          <Rooms />
        </Stack>
      </Box>

      <CreateRoomModal opened={opened} setopened={setopened} />
    </Layout>
  );
};

RoomsPage.authenticate = "yes";

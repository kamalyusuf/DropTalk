import {
  Button,
  PasswordInput,
  Stack,
  Text,
  Title,
  ThemeIcon,
  Box
} from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Layout } from "../../components/layout";
import { useSocket } from "../socket/socket-provider";
import { request } from "../../utils/request";
import { toast } from "react-toastify";
import { micenabled } from "../../utils/mic";
import type { Room } from "types";

interface Props {
  room: Room;
  onok: (ok: boolean) => void;
}

export const RoomLogin = ({ room, onok }: Props) => {
  const { socket } = useSocket();
  const [password, setpassword] = useState("");
  const [oking, setoking] = useState(false);

  return (
    <Layout>
      <Box
        style={{
          maxWidth: 400,
          margin: "0 auto",
          paddingTop: "clamp(3rem, 12vh, 6rem)"
        }}
      >
        <Box
          p="xl"
          style={{
            borderRadius: "var(--radius-card)",
            backgroundColor: "var(--color-elevated)",
            border: "1px solid var(--color-shade)",
            boxShadow: "var(--shadow-card)"
          }}
        >
          <Stack gap="xl">
            <Box ta="center">
              <ThemeIcon
                size={56}
                radius="xl"
                color="yellow"
                variant="light"
                style={{ margin: "0 auto" }}
              >
                <IconLock size={28} />
              </ThemeIcon>
              <Title order={3} fw={700} c="white" mt="md">
                This room is protected
              </Title>
              <Text size="sm" c="dimmed" mt="xs">
                Enter the password to join
              </Text>
            </Box>

            <form
              onSubmit={async (event) => {
                event.preventDefault();
                if (!socket) return toast.error("Web server is down");
                if (!(await micenabled())) return;
                setoking(true);
                try {
                  const { ok } = await request({
                    socket,
                    event: "room login",
                    payload: { room_id: room._id, password }
                  });
                  onok(ok);
                } catch (e) {
                } finally {
                  setoking(false);
                }
              }}
            >
              <Stack gap="md">
                <PasswordInput
                  label={<Text component="span">Password</Text>}
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setpassword(e.currentTarget.value)}
                  size="md"
                  radius="md"
                />
                <Button
                  type="submit"
                  size="md"
                  radius="md"
                  fullWidth
                  loading={oking}
                  disabled={oking}
                >
                  Join room
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
};

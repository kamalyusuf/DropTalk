import {
  Button,
  Group,
  TextInput,
  Text,
  Checkbox,
  Stack,
  PasswordInput,
  Box,
  Title
} from "@mantine/core";
import { useRouter } from "next/router";
import { useSocket } from "../socket/socket-provider";
import { request } from "../../utils/request";
import { toast } from "react-toastify";
import { micenabled } from "../../utils/mic";
import { useState } from "react";
import { useSettingsStore } from "../../store/settings";
import { useUpdateSocketQuery } from "../../hooks/use-update-socket-query";

interface Props {
  oncancel: () => void;
}

export const CreateRoomForm = ({ oncancel }: Props) => {
  const { socket } = useSocket();
  const router = useRouter();
  const [creating, setcreating] = useState(false);
  const autojoin = useSettingsStore((state) => state.auto_join_room);
  const update = useUpdateSocketQuery();
  const [form, setform] = useState({
    name: "",
    description: "",
    private: false,
    require_password: false,
    password: ""
  });

  const onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setform((prev) => ({
      ...prev,
      [event.target.name]: ["private", "require_password"].includes(
        event.target.name
      )
        ? event.target.checked
        : event.target.value
    }));
  };

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!socket) return toast.error("Web server is down");

    setcreating(true);

    try {
      if (!(await micenabled())) return;
      const { room } = await request({
        socket,
        event: "create room",
        payload: {
          name: form.name,
          description: form.description,
          password: (form.require_password && form.password) || undefined,
          visibility: form.private ? "private" : "public"
        }
      });
      oncancel();
      update("rooms", (draft) => {
        draft.rooms.unshift(room);
      });

      await router[
        autojoin || room.visibility === "private" ? "push" : "prefetch"
      ](`/app/rooms/${room._id}`);
    } catch (e) {
    } finally {
      setcreating(false);
    }
  };

  return (
    <form onSubmit={onsubmit}>
      <Text c="dimmed" mb="lg">
        Rooms are deleted when everyone leaves.
      </Text>

      <Stack gap="lg">
        <Box>
          <Stack gap="sm">
            <TextInput
              name="name"
              label={<Text component="span">Room name</Text>}
              placeholder="e.g. Team standup"
              required
              data-autofocus
              autoComplete="off"
              radius="md"
              size="sm"
              onChange={onchange}
            />
            <TextInput
              name="description"
              label={<Text component="span">Description (optional)</Text>}
              placeholder="What's this room for?"
              autoComplete="off"
              radius="md"
              size="sm"
              onChange={onchange}
            />
          </Stack>
        </Box>

        <Box>
          <Title order={4} mb="sm">
            Privacy
          </Title>
          <Stack gap="xs">
            <Checkbox
              name="private"
              label={<Text component="span">Private room</Text>}
              size="sm"
              onChange={onchange}
            />
            <Checkbox
              name="require_password"
              label={<Text component="span">Require password to join</Text>}
              size="sm"
              onChange={onchange}
            />
            {form.require_password && (
              <PasswordInput
                name="password"
                placeholder="Password"
                radius="md"
                size="sm"
                onChange={onchange}
              />
            )}
          </Stack>
        </Box>

        <Group justify="flex-end" gap="sm" mt="md">
          <Button variant="subtle" color="gray" radius="md" onClick={oncancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={creating}
            disabled={creating || !form.name.trim()}
            radius="md"
          >
            Create room
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

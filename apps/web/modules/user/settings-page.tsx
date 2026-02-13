import {
  Box,
  Paper,
  TextInput,
  Checkbox,
  Button,
  Stack,
  Switch,
  Title,
  Text
} from "@mantine/core";
import { Layout } from "../../components/layout";
import { toast } from "react-toastify";
import { useState } from "react";
import { REMEMBER_ME_KEY, useUserStore } from "../../store/user";
import { useSocket } from "../socket/socket-provider";
import { DefaultMicSelector } from "../audio/default-mic-selector";
import { useSettingsStore } from "../../store/settings";
import { request } from "../../utils/request";
import { useShallow } from "../../hooks/use-shallow";
import type { PageComponent } from "../../types";

export const SettingsPage: PageComponent = () => {
  const { update, user } = useUserStore(
    useShallow((state) => ({ user: state.user!, update: state.update }))
  );
  const [name, setname] = useState(user.display_name);
  const { socket } = useSocket();
  const { autojoin, notifyonjoin, setsettings, timestamp } = useSettingsStore(
    useShallow((state) => ({
      autojoin: state.auto_join_room,
      notifyonjoin: state.notify_on_join,
      timestamp: state.message_timestamp,
      setsettings: state.set
    }))
  );
  const [remember, setremember] = useState(
    localStorage.getItem(REMEMBER_ME_KEY) === "true"
  );

  const onsubmit = async () => {
    if (!socket) return toast.error("Web server is down");

    const res = await request({
      socket,
      event: "update display name",
      payload: { new_display_name: name }
    });

    if (!res.ok) return;
    update(res.peer.display_name, remember);
    toast.success("Saved");
  };

  return (
    <Layout title={`${user.display_name} — Settings`}>
      <Box
        style={{
          maxWidth: 560,
          margin: "0 auto"
        }}
      >
        <Title
          order={1}
          fw={700}
          c="white"
          mb="xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Settings
        </Title>

        <Stack gap="lg">
          <Paper
            p="xl"
            radius="var(--radius-card)"
            style={{
              backgroundColor: "var(--color-elevated)",
              border: "1px solid var(--color-shade)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <Title order={3} mb="md">
              Profile
            </Title>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onsubmit();
              }}
            >
              <Stack gap="md">
                <TextInput
                  label={<Text component="span">Display name</Text>}
                  placeholder="Your name"
                  required
                  value={name}
                  onChange={(e) => setname(e.currentTarget.value)}
                  radius="md"
                  size="sm"
                />
                <Checkbox
                  label={
                    <Text component="span">Remember me on this browser</Text>
                  }
                  size="sm"
                  checked={remember}
                  onChange={(e) => setremember(e.currentTarget.checked)}
                />
                <Button type="submit" size="sm" radius="md">
                  Save changes
                </Button>
              </Stack>
            </form>
          </Paper>

          <Paper
            p="xl"
            radius="var(--radius-card)"
            style={{
              backgroundColor: "var(--color-elevated)",
              border: "1px solid var(--color-shade)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <Title order={3} mb="md">
              Preferences
            </Title>
            <Stack gap="sm">
              <Switch
                label={
                  <Text component="span">
                    Automatically join room after creating it
                  </Text>
                }
                size="sm"
                checked={autojoin}
                onChange={(e) =>
                  setsettings({ auto_join_room: e.currentTarget.checked })
                }
              />
              <Switch
                label={
                  <Text component="span">
                    Notify when someone joins the room
                  </Text>
                }
                size="sm"
                checked={notifyonjoin}
                onChange={(e) =>
                  setsettings({ notify_on_join: e.currentTarget.checked })
                }
              />
              <Switch
                label={
                  <Text component="span">Show timestamps on chat messages</Text>
                }
                size="sm"
                checked={timestamp}
                onChange={(e) =>
                  setsettings({ message_timestamp: e.currentTarget.checked })
                }
              />
            </Stack>
          </Paper>

          <Paper
            p="xl"
            radius="var(--radius-card)"
            style={{
              backgroundColor: "var(--color-elevated)",
              border: "1px solid var(--color-shade)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <Title order={3} mb="md">
              Audio
            </Title>
            <DefaultMicSelector />
          </Paper>
        </Stack>
      </Box>
    </Layout>
  );
};

SettingsPage.authenticate = "yes";

import { useState } from "react";
import {
  Button,
  TextInput,
  Box,
  Stack,
  Text,
  Title,
  ThemeIcon,
  Checkbox
} from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useUserStore } from "../../store/user";
import { Layout } from "../../components/layout";
import {
  generate_display_name,
  validate_display_name
} from "../../utils/display-name";
import type { PageComponent } from "../../types";

const AppEntryPage: PageComponent = () => {
  const router = useRouter();
  const [name, setname] = useState(generate_display_name());
  const [remember, setremember] = useState(false);
  const load = useUserStore((state) => state.load);

  return (
    <Layout title="DropTalk">
      <Box
        style={{
          maxWidth: 420,
          width: "100%",
          margin: "0 auto",
          paddingTop: "clamp(2rem, 8vh, 4rem)"
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
                color="indigo"
                variant="light"
                style={{ margin: "0 auto" }}
              >
                <IconUserCircle size={32} />
              </ThemeIcon>
              <Title
                order={2}
                fw={700}
                mt="md"
                style={{ letterSpacing: "-0.02em" }}
              >
                Welcome back
              </Title>
              <Text c="dimmed" mt="xs">
                Enter your display name to continue to the app
              </Text>
            </Box>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                const displayname = name.trim();

                if (!validate_display_name(displayname)) return;

                load(displayname, remember);
                router.push("/app/rooms");
              }}
            >
              <Stack gap="md">
                <TextInput
                  placeholder="Display name"
                  label={<Text component="span">Display name</Text>}
                  required
                  value={name}
                  onChange={(e) => setname(e.currentTarget.value)}
                  size="md"
                  radius="md"
                  autoFocus
                />
                <Checkbox
                  label={
                    <Text component="span">Remember me on this browser</Text>
                  }
                  size="sm"
                  checked={remember}
                  onChange={(e) => setremember(e.currentTarget.checked)}
                />
                <Button
                  type="submit"
                  size="md"
                  radius="md"
                  fullWidth
                  disabled={!name.trim()}
                >
                  Continue
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
};

AppEntryPage.authenticate = "not";

export default AppEntryPage;

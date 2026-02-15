import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Stack, Text, Group, ThemeIcon } from "@mantine/core";
import { IconMicrophone, IconSettings, IconUsers } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useUserStore } from "../store/user";
import { useRoomStore } from "../store/room";

const navitems = [
  { href: "/app/rooms", label: "Rooms", icon: IconUsers },
  { href: "/app/settings", label: "Settings", icon: IconSettings }
] as const;

export function AppSidebar() {
  const router = useRouter();
  const pathname = router.pathname;
  const user = useUserStore((state) => state.user);
  const roomstate = useRoomStore((state) => state.state);
  const inroom = roomstate === "connected";

  const matches = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      component="aside"
      style={{
        width: matches ? "100%" : "var(--sidebar-width)",
        minWidth: matches ? "100%" : "var(--sidebar-width)",
        height: "100%",
        borderRight: "1px solid var(--color-shade)",
        backgroundColor: "var(--color-surface)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0
      }}
    >
      <Box p="md" style={{ borderBottom: "1px solid var(--color-shade)" }}>
        <Link
          href="/app/rooms"
          style={{
            textDecoration: "none",
            color: "inherit",
            pointerEvents: inroom ? "none" : undefined
          }}
        >
          <Group gap="xs">
            <ThemeIcon variant="transparent">
              <IconMicrophone />
            </ThemeIcon>
            <Text size="xl" fw={700}>
              DropTalk
            </Text>
          </Group>
        </Link>
      </Box>

      <Stack gap={4} p="sm" style={{ flex: 1 }}>
        {navitems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Box
              key={href}
              component={Link}
              href={href}
              style={{
                pointerEvents: inroom ? "none" : undefined,
                borderRadius: "var(--radius-app)",
                padding: "10px 12px",
                textDecoration: "none",
                backgroundColor: active
                  ? "var(--color-primary-muted)"
                  : "transparent"
              }}
              onMouseEnter={(e) => {
                if (!inroom && !active) {
                  e.currentTarget.style.backgroundColor = "var(--color-shade)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Group gap="sm">
                <ThemeIcon
                  size="md"
                  radius="md"
                  variant={active ? "light" : "subtle"}
                  color="indigo"
                >
                  <Icon size={18} />
                </ThemeIcon>
                <Text
                  size="sm"
                  fw={active ? 600 : 500}
                  c={active ? "white" : "dimmed"}
                >
                  {label}
                </Text>
              </Group>
            </Box>
          );
        })}
      </Stack>

      {!!user && (
        <Box p="md" style={{ borderTop: "1px solid var(--color-shade)" }}>
          <Box
            component="button"
            type="button"
            onClick={() => !inroom && router.push("/app/settings")}
            style={{
              width: "100%",
              border: "none",
              background: "none",
              borderRadius: "var(--radius-app)",
              padding: "10px 12px",
              textAlign: "left",
              pointerEvents: inroom ? "none" : undefined
            }}
          >
            <Group gap="sm">
              <ThemeIcon size="md" radius="xl" color="indigo" variant="light">
                <Text size="xs" fw={700}>
                  {user.display_name.slice(0, 1).toUpperCase()}
                </Text>
              </ThemeIcon>
              <Box style={{ minWidth: 0, flex: 1 }}>
                <Text size="xs" c="dimmed" truncate>
                  Signed in as
                </Text>
                <Text size="sm" fw={500} c="white" truncate>
                  {user.display_name}
                </Text>
              </Box>
            </Group>
          </Box>
        </Box>
      )}
    </Box>
  );
}

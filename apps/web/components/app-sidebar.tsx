import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Stack, Text, Group, ThemeIcon } from "@mantine/core";
import { IconSettings, IconUsers } from "@tabler/icons-react";
import { useUserStore } from "../store/user";
import { useRoomStore } from "../store/room";

const navItems = [
  { href: "/app/rooms", label: "Rooms", icon: IconUsers },
  { href: "/app/settings", label: "Settings", icon: IconSettings }
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = router.pathname;
  const user = useUserStore((state) => state.user);
  const roomState = useRoomStore((state) => state.state);
  const inRoom = roomState === "connected";

  return (
    <Box
      component="aside"
      style={{
        width: "var(--sidebar-width)",
        minWidth: "var(--sidebar-width)",
        height: "100%",
        borderRight: "1px solid var(--color-shade)",
        backgroundColor: "var(--color-surface)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0
      }}
    >
      <Box p="md" style={{ borderBottom: "1px solid var(--color-shade)" }}>
        <Text
          component={Link}
          href="/app"
          fw={700}
          size="lg"
          c="white"
          style={{
            letterSpacing: "-0.02em",
            textDecoration: "none",
            pointerEvents: inRoom ? "none" : undefined
          }}
        >
          uhhhh
        </Text>
      </Box>

      <Stack gap={4} p="sm" style={{ flex: 1 }}>
        {navItems.map(({ href, label, icon: Icon }) => {
          // const isRoomDetail =
          //   href === "/app/rooms" &&
          //   pathname.startsWith("/app/rooms/") &&
          //   pathname !== "/app/rooms";

          // const active = pathname === href || isRoomDetail;

          const active = pathname === href;

          return (
            <Box
              key={href}
              component={Link}
              href={href}
              style={{
                pointerEvents: inRoom ? "none" : undefined,
                // opacity: inRoom ? 0.6 : 1,
                borderRadius: "var(--radius-app)",
                padding: "10px 12px",
                textDecoration: "none",
                backgroundColor: active
                  ? "var(--color-primary-muted)"
                  : "transparent"
              }}
              onMouseEnter={(e) => {
                if (!inRoom && !active) {
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

      {user && (
        <Box p="md" style={{ borderTop: "1px solid var(--color-shade)" }}>
          <Box
            component="button"
            type="button"
            onClick={() => !inRoom && router.push("/app/settings")}
            style={{
              width: "100%",
              border: "none",
              background: "none",
              // cursor: inRoom ? "default" : "pointer",
              borderRadius: "var(--radius-app)",
              padding: "10px 12px",
              // opacity: inRoom ? 0.6 : 1,
              textAlign: "left",
              pointerEvents: inRoom ? "none" : undefined
            }}
            // onMouseEnter={(e) => {
            //   if (!inRoom)
            //     e.currentTarget.style.backgroundColor = "var(--color-shade)";
            // }}
            // onMouseLeave={(e) => {
            //   e.currentTarget.style.backgroundColor = "transparent";
            // }}
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

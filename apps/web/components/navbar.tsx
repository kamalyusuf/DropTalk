import Link from "next/link";
import { Group, Box, Button, Text } from "@mantine/core";
import { Container } from "./container";
import { useUserStore } from "../store/user";
import { useRouter } from "next/router";
import { useRoomStore } from "../store/room";

export const NavBar = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const state = useRoomStore((state) => state.state);

  return (
    <Box py="md" style={{ borderBottom: "1px solid var(--color-shade)" }}>
      <Container>
        <Group justify="space-between" align="center">
          <Link
            href="/"
            legacyBehavior
            passHref
            scroll={false}
            style={{ textDecoration: "none" }}
          >
            <Text
              fw={700}
              size="lg"
              c="white"
              className="cursor-pointer"
              style={{
                pointerEvents: state === "connected" ? "none" : undefined,
                letterSpacing: "-0.02em"
              }}
            >
              uhhhh
            </Text>
          </Link>

          {!!user && (
            <Button
              size="xs"
              variant="subtle"
              color="gray"
              onClick={() => router.push("/app/settings")}
              style={{
                pointerEvents: state === "connected" ? "none" : undefined
              }}
            >
              {user.display_name}
            </Button>
          )}
        </Group>
      </Container>
    </Box>
  );
};

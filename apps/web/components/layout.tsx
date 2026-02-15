import Head from "next/head";
import { Box, Group, Drawer, Burger } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { AppSidebar } from "./app-sidebar";
import type { PropsWithChildren } from "react";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Layout = ({ children, title }: PropsWithChildren<Props>) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {title ? (
        <Head>
          <title>{title}</title>
        </Head>
      ) : null}

      <Group gap={0} style={{ height: "100vh", overflow: "hidden" }}>
        {!isMobile ? (
          <AppSidebar />
        ) : (
          <Drawer
            opened={opened}
            onClose={close}
            size="75%"
            padding={0}
            withCloseButton={false}
            styles={{
              content: {
                backgroundColor: "var(--color-surface)",
                display: "flex",
                flexDirection: "column"
              },
              body: {
                flex: 1,
                padding: 0,
                display: "flex",
                flexDirection: "column"
              }
            }}
          >
            <AppSidebar />
          </Drawer>
        )}

        <Box
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--color-background)",
            overflow: "hidden"
          }}
        >
          {isMobile && (
            <Box
              p="md"
              style={{
                borderBottom: "1px solid var(--color-shade)",
                backgroundColor: "var(--color-surface)"
              }}
            >
              <Group>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  size="sm"
                  color="white"
                />
                <Box style={{ fontWeight: 700, fontSize: 18, color: "white" }}>
                  DropTalk
                </Box>
              </Group>
            </Box>
          )}

          <Box
            style={{
              flex: 1,
              overflow: "auto",
              padding: isMobile
                ? "var(--mantine-spacing-md)"
                : "var(--mantine-spacing-lg)"
            }}
          >
            {children}
          </Box>
        </Box>
      </Group>
    </>
  );
};

import Head from "next/head";
import { Box, Group } from "@mantine/core";
import { AppSidebar } from "./app-sidebar";
import type { PropsWithChildren } from "react";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Layout = ({ children, title }: PropsWithChildren<Props>) => {
  return (
    <>
      {title ? (
        <Head>
          <title>{title}</title>
        </Head>
      ) : null}

      <Group
        // align="stretch"
        gap={0}
        style={{ height: "100vh" }}
      >
        <AppSidebar />
        <Box
          py="xl"
          px="lg"
          style={{
            flex: 1,
            height: "100%",
            overflow: "auto",
            backgroundColor: "var(--color-background)"
          }}
        >
          {children}
        </Box>
        {/* <Box
          component="main"
          py="xl"
          px="lg"
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            overflow: "auto",
            backgroundColor: "var(--color-background)"
          }}
        >
          {children}
        </Box> */}
      </Group>
    </>
  );
};

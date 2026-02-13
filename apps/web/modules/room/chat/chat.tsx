import { Box, ScrollArea, Text } from "@mantine/core";
import React, { useRef, useEffect } from "react";
import { ChatMessageInput } from "./chat-message-input";
import { ChatMessageCard } from "./chat-message-card";
import { useRoomChatStore } from "../../../store/room-chat";

interface Props {
  drawer?: boolean;
}

export const Chat: React.FC<Props> = ({ drawer }) => {
  const messages = useRoomChatStore((state) => state.messages);
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messages.length) return;
    viewport.current?.scrollTo({
      top: viewport.current!.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);

  return (
    <Box
      style={{
        flex: "0 0 380px",
        minWidth: drawer ? undefined : 320,
        maxWidth: drawer ? "100%" : 420,
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        borderRadius: "var(--radius-card)",
        backgroundColor: "var(--color-elevated)",
        border: "1px solid var(--color-shade)",
        boxShadow: "var(--shadow-card)",
        overflow: "hidden"
      }}
    >
      <Box
        px="lg"
        py="md"
        style={{
          borderBottom: "1px solid var(--color-shade)"
        }}
      >
        <Text fw={600} size="md" c="white">
          Chat
        </Text>
      </Box>

      <ScrollArea
        viewportRef={viewport}
        type="auto"
        scrollbarSize={6}
        style={{ flex: 1, minHeight: 0 }}
        styles={{
          viewport: { display: "flex", flexDirection: "column" },
          thumb: { backgroundColor: "var(--color-primary)" }
        }}
      >
        {messages.length === 0 ? (
          <Box py="xl" ta="center">
            <Text c="dimmed">No messages yet. Say hi!</Text>
          </Box>
        ) : (
          messages.map((message) => (
            <ChatMessageCard key={message._id} message={message} />
          ))
        )}
      </ScrollArea>

      <Box p="md" style={{ borderTop: "1px solid var(--color-shade)" }}>
        <ChatMessageInput />
      </Box>
    </Box>
  );
};

import { TextInput, ActionIcon } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useState, useRef } from "react";
import { CHAT_TEXT_LIMIT } from "../../../utils/constants";
import { useSocket } from "../../socket/socket-provider";
import { toast } from "react-toastify";
import { useHotkeys } from "@mantine/hooks";

export const ChatMessageInput = () => {
  const [content, setcontent] = useState("");
  const { socket } = useSocket();
  const ref = useRef<HTMLInputElement>(null);

  useHotkeys([["c", () => ref.current?.focus()]]);

  const send = () => {
    if (!socket) return toast.error("Web server is down");

    if (!content.trim()) return;

    socket.emit("chat message", { content });
    setcontent("");
  };

  return (
    <TextInput
      ref={ref}
      placeholder="Type a message..."
      variant="filled"
      radius="md"
      size="md"
      rightSection={
        <ActionIcon
          variant="light"
          color="indigo"
          size="sm"
          radius="md"
          onClick={send}
          aria-label="Send"
        >
          <IconSend size={16} />
        </ActionIcon>
      }
      styles={{ root: { width: "100%" } }}
      value={content}
      onChange={(e) =>
        setcontent(e.currentTarget.value.slice(0, CHAT_TEXT_LIMIT))
      }
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          send();
        }
      }}
      autoComplete="off"
    />
  );
};

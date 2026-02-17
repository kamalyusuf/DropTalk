import { io } from "socket.io-client";
import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
  type ReactNode,
  useContext
} from "react";
import { useUserStore } from "../../store/user";
import { toast } from "react-toastify";
import type { TypedSocket } from "./types";
import type { User } from "types";

type SocketState =
  | "idle"
  | "connected"
  | "error"
  | "disconnected"
  | "connecting";

type Context = {
  socket: TypedSocket | null;
  state: SocketState;
};

export const SocketContext = createContext<Context>({
  socket: null,
  state: "idle"
});

export const useSocket = () => useContext(SocketContext);

const connect = (me: User | null): Promise<TypedSocket> =>
  new Promise<TypedSocket>((resolve, reject) => {
    const socket: TypedSocket = io(
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:2300",
      {
        rememberUpgrade: true,
        path: "/ws",
        autoConnect: true,
        reconnectionAttempts: 5,
        transports: ["websocket", "polling"],
        withCredentials: true,
        query: {
          "@me": JSON.stringify(me)
        }
      }
    );

    const cleanup = () => {
      socket.off("connect", on_connect);
      socket.off("connect_error", on_connect_error);
      socket.io.off("error", on_manager_error);
    };

    const on_connect = () => {
      cleanup();
      resolve(socket);
    };

    const on_connect_error = (error: Error) => {
      cleanup();
      socket.disconnect();
      reject(error);
    };

    const on_manager_error = (error: Error) => {
      cleanup();
      socket.disconnect();
      reject(error);
    };

    socket.on("connect", on_connect);
    socket.on("connect_error", on_connect_error);
    socket.io.on("error", on_manager_error);
  });

interface Props {
  children: ReactNode;
}

export const SocketProvider = ({ children }: Props) => {
  const [socket, setsocket] = useState<TypedSocket | null>(null);
  const user = useUserStore((state) => state.user);
  const [state, setstate] = useState<SocketState>("idle");
  const called = useRef(false);

  const load = useCallback(() => {
    setstate("connecting");

    connect(user)
      .then((s) => {
        setsocket(s);
        setstate("connected");
      })
      .catch((e) => {
        const error = e as Error;
        console.error(error);

        setstate("error");

        toast.error("Failed to establish connection. Try reloading the page", {
          autoClose: false
        });
      });
  }, [user]);

  useEffect(() => {
    if (user && !socket && !called.current) {
      called.current = true;

      load();
    }
  }, [user, socket, load]);

  useEffect(() => {
    if (!socket) return;

    const on_disconnect = () => {
      setsocket(null);
      setstate("disconnected");
      called.current = false;
    };

    socket.on("disconnect", on_disconnect);

    return () => {
      socket.off("disconnect", on_disconnect);
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={useMemo(
        () => ({
          socket,
          state
        }),
        [socket, state]
      )}
    >
      {children}
    </SocketContext.Provider>
  );
};

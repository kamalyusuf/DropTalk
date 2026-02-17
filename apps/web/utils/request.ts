import { toast } from "react-toastify";
import type { Fn, EmptyObject, EventError } from "types";
import type {
  ServerEvent,
  TypedSocket,
  ClientToServerEvents
} from "../modules/socket/types";

export type SocketRequestParams<T extends ServerEvent> = Parameters<
  ClientToServerEvents[T]
>;

export type SocketRequestResponse<T extends ServerEvent> =
  SocketRequestParams<T>[0] extends Fn
    ? Parameters<SocketRequestParams<T>[0]>[0]
    : SocketRequestParams<T>[1] extends Fn
      ? Parameters<SocketRequestParams<T>[1]>[0]
      : never;

interface Config<T extends ServerEvent> {
  socket: TypedSocket;
  event: T;
  payload: SocketRequestParams<T>[0] extends undefined | Fn
    ? EmptyObject
    : SocketRequestParams<T>[0];
}

export const request = <T extends ServerEvent>({
  socket,
  event,
  payload
}: Config<T>): Promise<SocketRequestResponse<T>> =>
  new Promise<SocketRequestResponse<T>>((resolve, reject) => {
    let settled = false;
    let timer: ReturnType<typeof setTimeout>;
    let onerror: (error: EventError) => void;
    const request_id = window.crypto.randomUUID();

    const settle = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.off("request error", onerror);
      fn();
    };

    onerror = (error) => {
      if (error.request_id && error.request_id !== request_id) return;
      if (!error.request_id && error.event && error.event !== event) return;

      error.errors.forEach((e) => void toast.error(e.message));

      settle(() => reject(error));
    };

    timer = setTimeout(() => {
      settle(() => reject(new Error("Request timed out.")));
    }, 15000);

    socket.on("request error", onerror);

    socket.emit(
      event,
      // @ts-ignore
      { payload, __request__: true, request_id },
      (response: SocketRequestResponse<T>) => {
        settle(() => resolve(response));
      }
    );
  });

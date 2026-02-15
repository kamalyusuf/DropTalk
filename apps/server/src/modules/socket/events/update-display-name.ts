import { Room } from "../../room/room.model.js";
import type { CallbackEvent } from "../types.js";

export const handler: CallbackEvent<"update display name"> = {
  on: "update display name",
  input: (s) => ({
    new_display_name: s.string().min(3)
  }),
  invoke: ({ peer, payload, cb, io }) => {
    peer.user.display_name = payload.new_display_name;

    for (const room of Room.rooms.values())
      if (room.creator._id === peer.user._id)
        room.creator.display_name = payload.new_display_name;

    io.emit("peer updated", { peer: peer.user });

    cb({ ok: true, peer: peer.user });
  }
};

import consola from "consola";
import { Peer } from "../../mediasoup/peer.js";
import { MediasoupRoom } from "../../mediasoup/room.js";
import { env } from "../../../lib/env.js";
import { logger } from "../../../lib/logger.js";

export const ondisconnect = (peer: Peer) => async (reason: string) => {
  if (env.isDevelopment)
    consola.info(`${peer.user.display_name} disconnected. Reason: ${reason}.`);

  try {
    if (!peer.active_room_id) return;

    const rid = peer.active_room_id;

    const room = MediasoupRoom.findbyid(rid);

    room.leave(peer);
  } catch (e) {
    const error = e as Error;

    logger.error(`Failed to leave room. reason: ${error.message}`, error);
  } finally {
    Peer.remove(peer);
  }
};

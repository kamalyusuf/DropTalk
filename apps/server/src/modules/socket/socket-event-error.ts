import type { EventError } from "types";

export class SocketEventError implements EventError {
  event: EventError["event"];
  request_id?: EventError["request_id"];
  errors: EventError["errors"];

  constructor(
    event: EventError["event"],
    param: EventError["errors"][number] | Array<EventError["errors"][number]>,
    request_id?: string
  ) {
    this.errors = this.parse(param);
    this.event = event;
    this.request_id = request_id;
  }

  private parse(
    param: EventError["errors"][number] | Array<EventError["errors"][number]>
  ): EventError["errors"] {
    return Array.isArray(param) ? param.map((p) => p) : [param];
  }
}

export class NotInRoomError extends Error {
  constructor(name?: string) {
    super(
      name
        ? `You need to join the ${name} room before doing that.`
        : `You need to join the room before doing that.`
    );
  }
}

export class NoProducerFoundError extends Error {
  constructor() {
    super("Producer does not exist.");
  }
}

export class NoTransportFoundError extends Error {
  constructor() {
    super("Transport does not exist.");
  }
}

export class NoConsumerFoundError extends Error {
  constructor() {
    super("Consumer does not exist.");
  }
}

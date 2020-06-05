import MockDiscord from './mockDiscord';

export default class MockDiscordConsumer {
  public mockDiscord: MockDiscord;

  constructor() {
    this.mockDiscord = new MockDiscord();
  }
}

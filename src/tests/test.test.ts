import MockDiscord from './mockDiscord';

// const discord = new MockDiscord();

jest.mock('./mockDiscord', () => {
  console.log('mock');
  return function () {
    return {
      message: new MockDiscord().message
    };
  };
});

describe('hey', () => {
  it('should hey', async (done) => {
    const d = new MockDiscord();
    console.log(d.message);
  });
});

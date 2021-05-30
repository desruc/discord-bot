import schedule from 'node-schedule';

import morningTrivia from './trivia';

export default (client) => {
  // Morning trivia
  schedule.scheduleJob('1 8 * * *', function () {
    morningTrivia(client);
  });
};

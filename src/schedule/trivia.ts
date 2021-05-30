import { Client, Message, MessageEmbed } from 'discord.js';
import axios from 'axios';

import { getTextChannel } from '../utils/helpers';

function shuffleArray(array) {
  const temp = [...array];
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}

interface OpenTriviaResponse {
  response_code: number;
  results: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}

const morningTrivia = async (
  client: Client
): Promise<Message | Array<Message> | void> => {
  const channel = await getTextChannel(
    await client.guilds.fetch('208189454253424640')
  );

  const response = await axios.get(
    'https://opentdb.com/api.php?amount=1&encode=url3986'
  );

  const data: OpenTriviaResponse = response.data;

  const embed = new MessageEmbed().setColor('RANDOM');

  const triviaResult = data.results[0];

  embed.setTitle(decodeURIComponent(triviaResult.question));

  let answer: string = '';

  if (triviaResult.type === 'boolean') {
    answer = triviaResult.correct_answer;
    embed.setDescription('True or False?');
  } else {
    const decodedIncorrect = triviaResult.incorrect_answers.map((i) =>
      decodeURIComponent(i)
    );

    answer = decodeURIComponent(triviaResult.correct_answer);

    const answers = shuffleArray([...decodedIncorrect, answer]).join('\n');

    embed.setDescription(answers);
  }

  const filter = (response) =>
    answer.toLowerCase().trim() === response.content.toLowerCase().trim();

  channel.send(embed).then(() => {
    channel
      .awaitMessages(filter, { max: 1, time: 1800000, errors: ['time'] })
      .then((collected) => {
        channel.send(`Nicely done, ${collected.first().author}! That is correct.`);
      })
      .catch(() => {
        channel.send(
          `Looks like nobody got the answer this time... it was ${answer}.`
        );
      });
  });
};

export default morningTrivia;

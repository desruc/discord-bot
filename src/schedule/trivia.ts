import { Client, Guild, Message, MessageEmbed, TextChannel, User } from 'discord.js';
import axios from 'axios';

import { getTextChannel } from '../utils/helpers';

function shuffleArray(array): string[] {
  const temp = [...array];
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}

interface TriviaResult {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface OpenTriviaResponse {
  response_code: number;
  results: TriviaResult[];
}

const handleWinner = async (guild: Guild, message: Message) => {
  const triviaRoleName = 'Trivia Kingpin';

  let existingRole = guild.roles.cache.find((r) => r.name === triviaRoleName);

  if (!existingRole) {
    existingRole = await guild.roles.create({
      data: {
        name: triviaRoleName,
        mentionable: false,
        hoist: true,
        color: 'RANDOM',
        position: 3
      }
    });
  }

  guild.members
    .fetch()
    .then((v) => {
      v.forEach((m) => m.roles.remove(existingRole));
    })
    .catch((e) => console.log(e));

  message.member.roles.add(existingRole);
};

const handleBooleanQuestion = async (
  question: TriviaResult,
  channel: TextChannel
) => {
  const embed = new MessageEmbed().setColor('RANDOM');

  embed.setTitle(decodeURIComponent(question.question));

  embed.setDescription('True or False?');

  const answer = decodeURIComponent(question.correct_answer);

  const filterAnswer = (response) =>
    ['true', 'false'].some((e) => e === response.content.toLowerCase().trim());

  channel.send(embed).then(() => {
    channel
      .awaitMessages(filterAnswer, { max: 1, time: 1800000, errors: ['time'] })
      .then((collected) => {
        const isTrue = answer.toLowerCase() === 'true';
        if (isTrue && collected.first().content.toLowerCase() === 'true') {
          channel.send(`Nicely done, ${collected.first().author}! That is correct.`);
        } else {
          channel.send(
            `Sorry ${
              collected.first().author
            }, but that's incorrect! Better luck next time.`
          );
        }
      })
      .catch(() => {
        channel.send(
          `Looks like nobody got the answer this time... it was ${answer}.`
        );
      });
  });
};

const handleMultiple = async (question: TriviaResult, channel: TextChannel) => {
  const embed = new MessageEmbed().setColor('RANDOM');

  embed.setTitle(decodeURIComponent(question.question));

  const decodedIncorrect = question.incorrect_answers.map((i) =>
    decodeURIComponent(i)
  );

  const answer = decodeURIComponent(question.correct_answer);

  const answers = shuffleArray([...decodedIncorrect, answer]);

  const jointAnswers = answers.join('\n');

  embed.setDescription(jointAnswers);

  const answerFilter = (response) =>
    answers.some((a) =>
      response.content.toLowerCase().trim().includes(a.toLowerCase())
    );

  await channel.send(embed);

  const collector = await channel.createMessageCollector(answerFilter, {
    time: 1800000
  });

  collector.on('collect', (m) => {
    const lowerCaseMsg = m.content.toLowerCase();

    if (answers.filter((a) => lowerCaseMsg.includes(a.toLowerCase())).length > 1) {
      channel.send('One answer at a time, wise guy.');
    } else if (lowerCaseMsg.includes(answer.toLowerCase())) {
      channel.send(`Nicely done, ${m.author}! That is correct.`);
      collector.stop('winner');
    } else {
      channel.send('Nope... try again.');
    }
  });

  collector.on('end', (_, reason) => {
    if (reason !== 'winner') {
      channel.send(
        `Looks like nobody got the answer this time... it was ${answer}.`
      );
    }
  });
};

const morningTrivia = async (
  client: Client,
  guild: Guild
): Promise<Message | Array<Message> | void> => {
  const channel = await getTextChannel(guild);

  const response = await axios.get(
    'https://opentdb.com/api.php?amount=1&encode=url3986'
  );

  const data: OpenTriviaResponse = response.data;

  const triviaResult = data.results[0];

  const isBool = triviaResult.type === 'boolean';

  if (isBool) {
    await handleBooleanQuestion(triviaResult, channel);
  } else {
    await handleMultiple(triviaResult, channel);
  }
};

export default morningTrivia;

import { Client, Message, MessageEmbed } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';
import axios from 'axios';

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

export default class Trivia extends Command {
  constructor(client: Bot) {
    super(client);
    this.name = 'trivia';
  }

  public async exec(
    client: Client,
    message: Message
  ): Promise<Message | Array<Message> | void> {
    const response = await axios.get(
      'https://opentdb.com/api.php?amount=1&encode=url3986'
    );

    const data: OpenTriviaResponse = response.data;

    const embed = new MessageEmbed().setColor('RANDOM');

    const triviaResult = data.results[0];

    embed.setTitle(decodeURIComponent(triviaResult.question));

    let answer = null;

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

    message.channel.send(embed);
  }
}

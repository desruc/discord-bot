import { GuildMember } from 'discord.js';
import { randomNumber } from '../utils/helpers';

export const getGreeting = (member: GuildMember): string => {
  const greetings: string[] = [
    `G'day ${member}!`,
    `By rights you shouldn't even be here, ${member}. But you are. It's like in the great stories, ${member}. The ones that really mattered. Full of darkness and danger they were, and sometimes you didn't want to know the end. Because how could the end be happy? How could the world go back to the way it was when so much bad happened? But in the end, it's only a passing thing, this shadow. Even darkness must pass. A new day will come, and when the sun shines it will shine out the clearer. Those were the stories that stayed with you. That meant something, even if you were too small to understand why. But I think, ${member}, I do understand. I know now. Folk in those stories had lots of chances of turning back only they didn’t. Because they were holding on to something. That there’s a rank above Divine, ${member}, and it’s worth fighting for.`
  ];
  return greetings[randomNumber(0, greetings.length - 1)];
};

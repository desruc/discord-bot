import { TextChannel, Guild } from 'discord.js';

export const randomNumber = (min: number, max: number): number => {
  const strictMin: number = Math.ceil(Number(min));
  const strictMax: number = Math.floor(Number(max));
  return Math.floor(Math.random() * (strictMax - strictMin + 1)) + strictMin;
};

export const asyncForEach = async (
  array: Array<any>,
  callback: (el: any, index: number, array: Array<any>) => Promise<any>
): Promise<any> => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const getTextChannel = async (
  guild: Guild,
  channelName = ''
): Promise<TextChannel> => {
  const textChannels = guild.channels.cache.filter(({ type }) => type === 'text');
  const baseChannel = textChannels.first();

  if (channelName.trim().length === 0) return baseChannel as TextChannel;

  const channel = textChannels.find((c) => {
    const cText = c as TextChannel;
    return cText.name === channelName;
  });

  if (channel) return channel as TextChannel;
  else return baseChannel as TextChannel;
};

export const msToString = (ms: number): string => {
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 60);
  const mins = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);

  if (hours > 0) return `${hours}h ${mins}m`;
  if (mins > 0) return `${mins}m ${seconds}s`;
  return `${seconds}s`;
};

export const isValidNumber = (num: string | number): boolean =>
  !isNaN(Number(num)) && isFinite(Number(num));

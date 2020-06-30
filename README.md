# Discord Bot

> A 'everything under the kitchen sink' fantasy RPG discord bot written in Typescript.

![CircleCI](https://circleci.com/gh/desruc/discord-bot.svg?style=shield)

## Features
- Leveling system to engage users
- Memes on demand
- An RPG!

### Inspiration
I started this bot as a fun excuse to learn Typescript. The RPG element is inspired by the popular discord bot, EPIC RPG.

### Tech stack
- Typescript
- Discord.js
- MongoDB

### Development
1. Create an `.env` file and fill out the values (`.env.example` has the required fields)
2. Install dependences `npm install`
3. Point your `.env` file at either a local MonogDB container or an externally hosted solution.
4. Compile the source with `npm run build`. You will need to do this every time you make a change.
5. Run the bot with `npm run start`
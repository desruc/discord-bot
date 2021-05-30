require('dotenv').config();
import { resolve } from 'path';
import { ShardingManager } from 'discord.js';
import Logger from './core/logger';

import config from './constants/config';

const { name, totalShards, discordToken } = config;

const shardingLogger = new Logger(`${name}-sharding`).logger;

const shardCount: number | 'auto' =
  totalShards === 'auto' ? totalShards : Number(totalShards);

let shardsSpawned = 0;

const shards = new ShardingManager(resolve(__dirname, 'initBot.js'), {
  totalShards: shardCount,
  mode: 'worker',
  respawn: true,
  token: discordToken
});

shards
  .on('shardCreate', (shard) => {
    shardsSpawned++;
    shardingLogger.info(`[ShardManager] Shard #${shard.id} Spawned.`);
    shard
      .on('disconnect', () => {
        shardingLogger.warn('SHARD_DISCONNECTED: ', {
          stack: `[ShardManager] Shard #${shard.id} Disconnected`
        });
      })
      .on('reconnecting', () => {
        shardingLogger.info(`[ShardManager] Shard #${shard.id} Reconnected.`);
      });
    if (shardsSpawned === shards.totalShards)
      shardingLogger.info('[ShardManager] All shards spawned successfully.');
  })
  .spawn(shardCount);

process.on('unhandledRejection', (e) => {
  shardingLogger.error('UNHANDLED_REJECTION: ', e);
});

process.on('uncaughtException', (e) => {
  shardingLogger.error('UNCAUGHT_EXCEPTION: ', e);
  shardingLogger.warn('NODE_WARN: ', {
    stack: 'Uncaught Exception detected. Restarting...'
  });
});

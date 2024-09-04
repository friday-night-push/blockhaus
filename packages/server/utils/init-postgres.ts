import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';

import { logger } from './logger';
import { TopicModel } from '../topic/topic.model';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env;

export const initPostgres = async (): Promise<Sequelize | null> => {
  try {
    const sequelize = new Sequelize({
      host: 'localhost',
      port: Number(POSTGRES_PORT),
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      dialect: 'postgres',
      logging: false,
      models: [TopicModel],
    });
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    logger.info('All models were synchronized successfully.');
    return sequelize;
  } catch (e) {
    logger.error(e);
  }
  return null;
};

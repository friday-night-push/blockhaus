import { Sequelize } from 'sequelize-typescript';

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
    });
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
    return sequelize;
  } catch (e) {
    console.error(e);
  }
  return null;
};

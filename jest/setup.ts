/* eslint-disable no-await-in-loop */
import * as child_process from 'child_process';
import { promisify } from 'util';

const exec = promisify(child_process.exec);

const isContainerHealthy = async (containerName: string) => {
  const { stdout } = await exec(
    `docker inspect --format "{{.State.Health.Status}}" ${containerName}`,
  );
  return stdout === 'healthy\n';
};

const waitForContainer = async (containerName: string) => {
  let isHealthy: boolean;
  do {
    await promisify(setTimeout)(1000);
    process.stdout.write('.');
    isHealthy = await isContainerHealthy(containerName);
  } while (!isHealthy);
};

const startDBContainer = async () => {
  await exec(`docker-compose up -d db`);
};

const setupDatabase = async () => {
  process.stdout.write('\nSetting up database for tests.\n');
  await startDBContainer();
  process.stdout.write('Waiting...');
  await waitForContainer('alura-challenge-db');
  process.stdout.write('Done!\n');
};

module.exports = async () => {
  await setupDatabase();
};

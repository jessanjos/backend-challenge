import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateIncome1647806739491 implements MigrationInterface {
  name = 'CreateIncome1647806739491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`incomes\` (\`id\` varchar(36) NOT NULL, \`description\` varchar(255) NOT NULL, \`value\` decimal(6,2) NOT NULL, \`date\` datetime(6) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_97e5fd316b6564de937eaa2a76\` (\`description\`, \`date\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_97e5fd316b6564de937eaa2a76\` ON \`incomes\``,
    );
    await queryRunner.query(`DROP TABLE \`incomes\``);
  }
}

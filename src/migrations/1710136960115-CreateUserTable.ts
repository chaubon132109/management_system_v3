const { MigrationInterface, QueryRunner, Table } = require("typeorm");

class CreateUserTable1710131022405 {

    async up(queryRunner) {
        await queryRunner.createTable(
            new Table({
              name: 'users',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'username',
                  type: 'varchar',
                  isUnique: true,
                },
                {
                  name: 'password',
                  type: 'varchar',
                },
                {
                  name: 'email',
                  type: 'varchar',
                },
                {
                  name: 'isActive',
                  type: 'boolean',
                  default: true,
                },
              ],
            }),
            true,
          );
    }

    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }

}

module.exports = CreateUserTable1710131022405;

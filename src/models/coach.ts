import {
  DataTypes,
  Model,
  ModelConfig,
  Op,
  Sequelize,
} from '@ananke/sequelize';

export default class Coach extends Model {
  static setup(sequelize: Sequelize, modelConfig: ModelConfig = {}) {
    return this.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
      {
        sequelize,
      },
    );
  }

  static associate(models: any) {
  }

  static async authenticate(emailOrUsername: string, password: string): Promise<Coach | null> {
    return this.findOne({
      where: {
        [Op.or]: [
          {
            name: emailOrUsername,
          },
          {
            email: emailOrUsername,
          },
        ]
      },
    })
  }
}

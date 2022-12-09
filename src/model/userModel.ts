import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { ReviewInstance } from "./reviewModel";
interface UserAttributes {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phonenumber: string;
  password: string;
}
export class UserInstance extends Model<UserAttributes> {}
UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "firstname is required",
        },
        notEmpty: {
          msg: "Please provide a firstname",
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "last name is required",
        },
        notEmpty: {
          msg: "Please provide a last name",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "last name is required",
        },
        notEmpty: {
          msg: "Please provide a last name",
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "email is required",
        },
        isEmail: {
          msg: "Please provide a a valid Email",
        },
      },
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "phone number is required",
        },
        notEmpty: {
          msg: "Please provide a valid phone number",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is required",
        },
        notEmpty: {
          msg: "Please provide a password",
        },
      },
    },
  },
  {
    sequelize: db,
    tableName: "user",
  }
);
UserInstance.hasMany(ReviewInstance, {foreignKey:'userId', as:"review"});
ReviewInstance.belongsTo(UserInstance, {foreignKey: 'userId', as :'user'})
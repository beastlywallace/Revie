import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
interface ReviewAttributes {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
}
export class ReviewInstance extends Model<ReviewAttributes>{ }
ReviewInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "review",
  }
);

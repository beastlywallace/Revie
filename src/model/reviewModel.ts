import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
interface ReviewAttributes {
  id: string;
  // title: string;
  reviews: string;
  image: string;
  video: string;
  rating: number;
  userId: string;
  // date:string;
}
export class ReviewInstance extends Model<ReviewAttributes>{ }
ReviewInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    // title: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    reviews: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
    },
    // date: {
    //   type: DataTypes.STRING,
    // },
  },
  {
    sequelize: db,
    tableName: "review",
  }
);

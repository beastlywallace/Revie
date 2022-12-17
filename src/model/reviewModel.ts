import { DataTypes, Model } from "sequelize";
import { VisitorsInstance } from "./visitorsModel";
import db from "../config/database.config";
interface ReviewAttributes {
  id: string;
  title: string;
  address: string;
  reviews: string;
  image: string;
  video: string;
  userId: string;
}
export class ReviewInstance extends Model<ReviewAttributes> {}
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviews: {
      type: DataTypes.STRING,
      allowNull: true,
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
  },
  {
    sequelize: db,
    tableName: "review",
  }
);

ReviewInstance.hasMany(VisitorsInstance, {
  foreignKey: "houseId",
  as: "visitor_review",
});
VisitorsInstance.belongsTo(ReviewInstance, {
  foreignKey: "houseId",
  as: "reviews",
});

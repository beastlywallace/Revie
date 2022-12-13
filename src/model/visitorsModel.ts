import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
interface VisitorsAttributes {
  id: string;
  rating: number;
  houseId: string;
  review: string;
}
export class VisitorsInstance extends Model<VisitorsAttributes> {}
VisitorsInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    rating: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    review: {
      type: DataTypes.STRING,
    },
    houseId: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "visitor_review",
  }
);

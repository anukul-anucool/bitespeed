import { DataTypes, Model } from "sequelize";
import { sequelize } from "../app";

interface ContactAttributes {
  id: number;
  phoneNumber?: string;
  email?: string;
  linkedId: number | null;
  linkPrecedence: "primary" | "secondary";
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

class Contact extends Model<ContactAttributes> implements ContactAttributes {
  public id!: number;
  public phoneNumber?: string;
  public email?: string;
  public linkedId!: number | null;
  public linkPrecedence!: "primary" | "secondary";
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date | null;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    linkPrecedence: {
      type: DataTypes.ENUM("primary", "secondary"),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Contact",
    sequelize, // passing the `sequelize` instance is important
  }
);

export default Contact;

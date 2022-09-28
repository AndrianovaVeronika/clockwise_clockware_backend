'use strict';
import {
    Association,
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from "sequelize";
import sequelize from "../../connections/db.connection";
import {ICity} from "./city.interface";
import Master from "../master";

class City extends Model<InferAttributes<City>, InferCreationAttributes<City>>
    implements ICity {
    declare id: CreationOptional<number>;
    declare name: string;
    declare price: number;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
    // declare readonly deletedAt!: CreationOptional<Date>;

    declare masters?: NonAttribute<string[]>;

    declare static associations: {
        masters: Association<City, Master>
    }
}

City.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'City',
    // paranoid: true, // soft delete
});

export default City;
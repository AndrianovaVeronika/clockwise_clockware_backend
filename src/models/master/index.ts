'use strict';
import {
    Association,
    CreationOptional,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from "sequelize";
import {IMaster} from "./master.interface";
import sequelize from "../../connections/db.connection";
import City from "../city";

class Master extends Model<InferAttributes<Master, { omit: 'cities' }>, InferCreationAttributes<Master, { omit: 'cities' }>>
    implements IMaster {
    declare id: CreationOptional<number>;
    declare name: string;
    declare rating: number;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
    // declare readonly deletedAt!: CreationOptional<Date>;

    declare setCities: HasManySetAssociationsMixin<City, string>;
    declare getCities: HasManyGetAssociationsMixin<City>;

    declare cities?: NonAttribute<string[]>;
    declare userId?: number;

    declare static associations: {
        roles: Association<Master, City>
    }
}

Master.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'Master',
    // paranoid: true, // soft delete
});

export default Master;
'use strict';
import {DataTypes, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, Model} from "sequelize";
import {IMaster, MasterInput} from "./master.interface";
import sequelize from "../../connections/db.connection";
import City from "../city";

class Master extends Model<IMaster, MasterInput> implements IMaster {
    public id!: number;
    public name!: string;
    public rating!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
    declare setCities: HasManySetAssociationsMixin<City, string>;
    declare getCities: HasManyGetAssociationsMixin<City>;

    static associate(models: any) {
        Master.hasMany(models.Order, {foreignKey: 'masterId'});
        Master.belongsToMany(models.City, {through: 'MasterCities'});
        Master.belongsTo(models.User, {foreignKey: 'userId'});
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
    }
}, {
    sequelize,
    modelName: 'Master',
    paranoid: true, // soft delete
    timestamps: true
});

export default Master;
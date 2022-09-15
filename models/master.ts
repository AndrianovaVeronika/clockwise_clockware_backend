'use strict';
import {DataTypes, Model} from "sequelize";
import {IMaster, MasterInput} from "./interfaces/master.interface";
import sequelize from "../connections/db.connection";

class Master extends Model<IMaster, MasterInput> implements IMaster {
    public id!: number;
    public name!: string;
    public rating!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    static associate(models) {
        Master.hasMany(models.Order, {foreignKey: 'masterId'});
        Master.belongsToMany(models.City, {through: 'MasterCities'});
        Master.belongsTo(models.User, {foreignKey: 'userId'});
    }
}

Master.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
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
    paranoid: true, //soft delete
    timestamps: true
});

export default Master;
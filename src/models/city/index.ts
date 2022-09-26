'use strict';
import {DataTypes, Model} from "sequelize";
import {CityInput, ICity} from "./city.interface";
import sequelize from "../../connections/db.connection";

class City extends Model<ICity, CityInput> implements ICity {
    public id!: number;
    public name!: string;
    public price!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // public readonly deletedAt!: Date;

    static associate(models: any) {
        City.hasMany(models.Order, {foreignKey: 'cityId'});
        City.belongsToMany(models.Master, {through: 'MasterCities'});
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
}, {
    sequelize,
    modelName: 'Index',
    paranoid: true, // soft delete
    timestamps: true
});

export default City;
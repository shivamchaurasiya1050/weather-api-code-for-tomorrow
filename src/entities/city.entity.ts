import { Model } from 'sequelize-typescript'
import { AllowNull, Column, DataType, Table } from "sequelize-typescript";

@Table
export class City extends Model<City>{
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    
    })
    name:string
}
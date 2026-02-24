// weather.model.ts

import { Model } from 'sequelize-typescript'
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { City } from "./city.entity";

@Table
export class Weather extends Model<Weather> {

  @Column(DataType.FLOAT)
  temperature: number;

  @Column(DataType.FLOAT)
  minTemp: number;

  @Column(DataType.FLOAT)
  maxTemp: number;

  @Column(DataType.DATE)
  date: Date;
}
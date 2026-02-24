import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { City } from 'src/entities/city.entity';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Weather } from 'src/entities/weather.entity';
import { WeatherService } from 'src/weather/weather.service';

@Module({
    imports:[SequelizeModule.forFeature([City,Weather])],
    controllers:[AnalyticsController],
    providers: [AnalyticsService,WeatherService]

})
export class AnalyticsModule {}

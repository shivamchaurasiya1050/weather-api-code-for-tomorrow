import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from 'src/entities/city.entity';
import { Weather } from 'src/entities/weather.entity';
import { WeatherService } from 'src/weather/weather.service';

@Injectable()
export class AnalyticsService {

  constructor(
    @InjectModel(City)
    private cityModel: typeof City,

    @InjectModel(Weather)
    private weatherModel: typeof Weather,

    private weatherService: WeatherService,
  ) {}

 async analyzeCities(cities: string[]) {

  const weatherResults = await Promise.all(
    cities.map(city => this.weatherService.getCurrentWeather(city))
  );

  const results: { city: string; temp: number }[] = [];

  for (const data of weatherResults) {

    const [cityRecord] = await this.cityModel.findOrCreate({
      where: { name: data.name }
    });

await this.weatherModel.create({
  temperature: data.main.temp,
  minTemp: data.main.temp_min,
  maxTemp: data.main.temp_max,
  date: new Date(),
  cityId: cityRecord.id
} as any);

    results.push({
      city: data.name,
      temp: data.main.temp
    });
  }

  const temps = results.map(r => r.temp);

  const averageTemperature =
    temps.reduce((a, b) => a + b, 0) / temps.length;

  const highestTemperature =
    results.reduce((prev, curr) =>
      prev.temp > curr.temp ? prev : curr
    );

  const lowestTemperature =
    results.reduce((prev, curr) =>
      prev.temp < curr.temp ? prev : curr
    );

  const hotCities =
    results.filter(r => r.temp > 30)
           .map(r => r.city);

  return {
    averageTemperature,
    highestTemperature,
    lowestTemperature,
    hotCities
  };
}

async getCityAnalytics(name: string) {

  const current = await this.weatherService.getCurrentWeather(name);
  const forecast = await this.weatherService.getForecast(name);
  const temps: number[] = forecast.list.map(
    (item: any) => item.main.temp
  );

  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  const warning =
    current.main.temp > 35
      ? "Extreme heat warning"
      : null;

  return {
    city: name,
    currentTemperature: current.main.temp,
    forecastMin: minTemp,
    forecastMax: maxTemp,
    warning
  };
}
}
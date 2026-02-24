import { HttpServer, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
    export class WeatherService{
        constructor(private configService: ConfigService) {}
         async getCurrentWeather(city:string){
               const apiKey = this.configService.get<string>('WEATHER_API_KEY');
            const {data}= await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            return data
         }

         async getForecast(city: string) {
            const apiKey = this.configService.get<string>('WEATHER_API_KEY');
         
           const { data } = await axios.get(
             `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
           );
         
           return data;
         }
    }



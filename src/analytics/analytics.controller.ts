import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {

  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('cities')
  async analyzeCities(@Body() body: { cities: string[] }) {
    return this.analyticsService.analyzeCities(body.cities);
  }


@Get('city/:name')
async getCityAnalytics(@Param('name') name: string) {
  return this.analyticsService.getCityAnalytics(name);
}
}
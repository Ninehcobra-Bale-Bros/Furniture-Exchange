import { Injectable } from '@nestjs/common';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { RevenueRepository } from './repository/revenue.repository';
import { RevenueDto } from './dto/revenue.dto';

@Injectable()
export class RevenueService {
  constructor(private readonly revenueRepository: RevenueRepository) {}

  async createRevenue(dto: CreateRevenueDto) {
    const revenue = await this.revenueRepository
      .save(RevenueDto.toEntity(dto))
      .then((res) => RevenueDto.fromEntity(res));

    return revenue;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { PrismaService } from '../prisma.service';
import { Flower } from '@prisma/client';

@Injectable()
export class FlowersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Flower[]> {
    return this.prisma.flower.findMany();
  }

  async findOne(id: string): Promise<Flower> {
    const flower = await this.prisma.flower.findUnique({
      where: { id },
    });

    if (!flower) {
      throw new NotFoundException(`Flower with ID ${id} not found`);
    }

    return flower;
  }

  async create(createFlowerDto: CreateFlowerDto): Promise<Flower> {
    return this.prisma.flower.create({
      data: createFlowerDto,
    });
  }

  async update(id: string, updateFlowerDto: UpdateFlowerDto): Promise<Flower> {
    try {
      return await this.prisma.flower.update({
        where: { id },
        data: updateFlowerDto,
      });
    } catch (error) {
      throw new NotFoundException(`Flower with ID ${id} not found`);
    }
  }

  async patch(id: string, patchFlowerDto: UpdateFlowerDto): Promise<Flower> {
    try {
      return await this.prisma.flower.update({
        where: { id },
        data: patchFlowerDto,
      });
    } catch (error) {
      throw new NotFoundException(`Flower with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<Flower> {
    try {
      return await this.prisma.flower.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Flower with ID ${id} not found`);
    }
  }
}

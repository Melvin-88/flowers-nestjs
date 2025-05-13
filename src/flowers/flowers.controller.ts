import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { JwtAuthGuard } from '../auth/jwt.strategy/jwt-auth.guard';
import { Flower } from '@prisma/client';

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Flower[]> {
    return this.flowersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Flower> {
    return this.flowersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createFlowerDto: CreateFlowerDto): Promise<Flower> {
    return this.flowersService.create(createFlowerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFlowerDto: UpdateFlowerDto,
  ): Promise<Flower> {
    return this.flowersService.update(id, updateFlowerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() patchFlowerDto: UpdateFlowerDto,
  ): Promise<Flower> {
    return this.flowersService.patch(id, patchFlowerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<Flower> {
    return this.flowersService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService, User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Omit<User, 'password'>[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Omit<User, 'password'> {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(
    @Body() body: { username: string; password: string; role: string },
  ): Omit<User, 'password'> {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<User>,
  ): Omit<User, 'password'> {
    return this.usersService.update(+id, body);
  }

  @Patch(':id')
  patch(
    @Param('id') id: string,
    @Body() body: Partial<User>,
  ): Omit<User, 'password'> {
    return this.usersService.patch(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Omit<User, 'password'> {
    return this.usersService.remove(+id);
  }
}

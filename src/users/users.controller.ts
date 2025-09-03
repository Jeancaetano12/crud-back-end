import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log('REQUISIÇÃO POST RECEBIDA:');
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    console.log('REQUISIÇÃO FIND ALL RECEBIDA');
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('REQUISIÇÃO FIND ONE RECEBIDA:');
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log('REQUISIÇÃO UPDATE RECEBIDA:');
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('REQUISIÇÃO REMOVE RECEBIDA:');
    return this.usersService.remove(id);
  }
}

import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {User} from 'src/entity/user.entity';
import {CreateUserDto, UpdateUserDto} from '../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(parseInt(id, 10), user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: {id: number}): Promise<User> {
    return this.userService.findOneById(params.id);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  MethodNotAllowedException,
  UseInterceptors,
} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {User} from 'src/entity/user.entity';
import {AccountType, CreateUserDto, UpdateUserDto} from '../dto/user.dto';
import {TokenPayload} from 'src/auth/dto/auth.dto';
import {LoggedInUser} from 'src/common/decorators/loggedInUser.decorator';
import {TransformInterceptor} from 'src/common/interceptor/transform.interceptor';

@UseInterceptors(TransformInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user, AccountType.Local);
  }

  @Put(':id')
  async update(
    @LoggedInUser() loggedInUser: TokenPayload,
    @Param('id') id: string,
    @Body() user: UpdateUserDto
  ): Promise<User> {
    if (loggedInUser.id !== parseInt(id, 10)) {
      throw new MethodNotAllowedException();
    }
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

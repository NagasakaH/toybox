import {Injectable, Inject} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from '../../entity/user.entity';
import {CreateUserDto, UpdateUserDto} from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.userRepository.create(user);
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    const property = await this.userRepository.findOneBy({id: id});
    return this.userRepository.save({...property, ...user});
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({id: id});
  }
}

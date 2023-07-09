import {Injectable, Inject} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from '../../entity/user.entity';
import {AccountType, CreateUserDto, UpdateUserDto} from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private configService: ConfigService
  ) {}

  async create(user: CreateUserDto, accountType: AccountType): Promise<User> {
    const salt = bcrypt.genSaltSync(
      this.configService.get<number>('bcrypt.round')
    );
    let hashedPassword = '';
    if (accountType === AccountType.Local) {
      hashedPassword = (await bcrypt.hash(user.password, salt)).toString();
    }

    return this.userRepository.save({
      name: user.name,
      email: user.email,
      hashedPassword: hashedPassword,
      accountType: accountType,
    });
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    const property = await this.userRepository.findOneBy({userId: id});
    return this.userRepository.save({...property, ...user});
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({userId: id});
  }

  async findOneByEmail(email: string, accountType: AccountType): Promise<User> {
    return this.userRepository.findOneBy({
      email: email,
      accountType: accountType,
    });
  }
}

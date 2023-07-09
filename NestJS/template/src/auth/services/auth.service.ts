import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';
import {AccountType} from 'src/user/dto/user.dto';
import {TokenPayload} from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService)
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async signInLocal(
    email: string,
    password: string
  ): Promise<{access_token: string}> {
    const user = await this.userService.findOneByEmail(
      email,
      AccountType.Local
    );

    if (await bcrypt.compare(password, user.hashedPassword)) {
      const payload: TokenPayload = {
        id: user.userId,
        name: user.name,
        email: user.email,
        accountType: user.accountType,
      };
      const token = await this.jwtService.signAsync(payload);
      return {access_token: token};
    } else {
      throw new UnauthorizedException();
    }
  }
}

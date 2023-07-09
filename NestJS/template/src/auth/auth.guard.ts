import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
// eslint-disable-next-line node/no-extraneous-import
import {Request} from 'express';
import {TokenPayload} from './dto/auth.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService)
    private jwtService: JwtService,
    @Inject(ConfigService)
    private configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & {user?: TokenPayload}>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const secret = this.configService.get<string>('jwt.secret');
    try {
      const user = await this.jwtService.verifyAsync<TokenPayload>(token, {
        secret: secret,
      });
      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

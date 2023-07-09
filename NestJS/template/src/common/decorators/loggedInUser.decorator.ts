import {ExecutionContext, createParamDecorator} from '@nestjs/common';
import {TokenPayload} from 'src/auth/dto/auth.dto';
// eslint-disable-next-line node/no-extraneous-import
import {Request} from 'express';

// auth.guardが詰めたユーザー情報を取得するためのデコレータ
export const LoggedInUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TokenPayload => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & {user: TokenPayload}>();
    return request.user;
  }
);

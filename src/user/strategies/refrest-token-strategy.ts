import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExporation: false,
      secretOrKey: `${process.env.jwt_secret}`,
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, username: payload.username };
  }
}
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '~/app/strategies/jwt.strategy';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
})
export class AuthorizationModule {}

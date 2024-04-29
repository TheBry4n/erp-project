import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule, JwtService } from '@nestjs/jwt'

@Module({
  imports: [JwtModule],
  providers: [AuthService, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
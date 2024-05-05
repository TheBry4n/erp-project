import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { RefreshGuard } from '@server/guards'

@Module({
  imports: [JwtModule],
  providers: [AuthService, JwtService, RefreshGuard],
  controllers: [AuthController]
})
export class AuthModule {}

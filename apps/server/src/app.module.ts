import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CorsMiddleware } from './middleware';
import { RefreshGuard } from './guards';
import { RefreshStrategy } from './startegy';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({}),
    PrismaModule,
    AuthModule
  ],
  providers: [RefreshGuard, RefreshStrategy]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

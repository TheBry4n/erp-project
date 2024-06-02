import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CorsMiddleware, DecompressionMiddleware } from './middleware';
import { RefreshGuard } from './guards';
import { RefreshStrategy } from './startegy';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({}),
    PrismaModule,
    AuthModule,
    ProductModule,
    UserModule
  ],
  providers: [RefreshGuard, RefreshStrategy]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    
    // consumer
    //   .apply(DecompressionMiddleware)
    //   .forRoutes({ path: '/products/create', method: RequestMethod.POST })
  }
}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [AuthModule, UserModule, ProductsModule, PrismaModule],
  providers: [PostsService],
})
export class AppModule {}

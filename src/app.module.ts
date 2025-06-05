import { Module } from '@nestjs/common';
import { PostsModule } from './post.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [PostsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

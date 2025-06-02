import { Module } from '@nestjs/common';
import { PostsModule } from './post.module';

@Module({
  imports: [PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

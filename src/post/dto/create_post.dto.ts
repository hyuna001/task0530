import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  authorId: string = 'timely';

  @IsString()
  authorName: string = '홍길동';

  @IsDate()
  createdAt: Date = new Date();

  @IsDate()
  @IsOptional()
  updatedAt: Date = new Date();

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean = false;
}

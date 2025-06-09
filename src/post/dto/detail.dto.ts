import { Exclude } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class DetailDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string | null;

  @IsString()
  authorId: string = 'timely';

  @IsString()
  authorName: string = '홍길동';

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  isDeleted: boolean;
}

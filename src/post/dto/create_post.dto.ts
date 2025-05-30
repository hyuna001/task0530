import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { format } from 'date-fns';

export class CreatePostDto { 

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    authorId: string = "timely";

    @IsString()
    authorName: string = "홍길동";

    @IsDate()
    createdAt: Date = new Date();

    @IsDate()
    @IsOptional()
    updatedAt: Date = new Date();
   
    @IsBoolean()
    @IsOptional()
    isDeleted: boolean = false;

    getFormattedCreatedAt(): string {
        return format(this.createdAt, 'yyyy-MM-dd HH:mm:ss');
    }

    getFormattedUpdatedAt(): string {
        return format(this.updatedAt, 'yyyy-MM-dd HH:mm:ss');
    }
}
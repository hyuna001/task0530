import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create_post.dto";
import { IsOptional, IsString } from "class-validator";


export class UpdatePostDto extends PartialType(CreatePostDto) {
//export class UpdatePostDto  {

    @IsString()
    @IsOptional()
    title ?: string;

    @IsString()
    @IsOptional()
    content ?: string;

}

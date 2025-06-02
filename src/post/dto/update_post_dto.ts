import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create_post.dto";
import { IsString } from "class-validator";


export class UpdatePostDto extends PartialType(CreatePostDto) {
//export class UpdatePostDto  {

    @IsString()
    title ?: string;

    @IsString()
    content ?: string;

}

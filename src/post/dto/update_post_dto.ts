import { PartialType, PickType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create_post.dto";
import { IsOptional, IsString } from "class-validator";


export class UpdatePostDto extends PickType(PartialType(CreatePostDto), ['title', 'content', 'updatedAt', 'isDeleted']) {}

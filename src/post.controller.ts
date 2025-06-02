import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';

import { CreatePostDto } from './post/dto/create_post.dto';
import { UpdatePostDto } from './post/dto/update_post_dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {

    constructor(private postService : PostService){};

    @Get()
    getAll() {
        return this.postService.getAllPosts();
    }

    @Get(':id')
    getOne(@Param('id') postId:number) {
        return this.postService.getOnePost(postId);
    }

    @Post()
    insertPost(@Body() postData: CreatePostDto){
        return this.postService.createPost(postData);
    }

    //삭제
    @Put('/del/:id')
    deletePost(@Param('id') postId:number) {
        return this.postService.deletePost(postId);
    }

    //수정
    @Patch(':id')
    updatePost(@Param('id') postId:number, @Body() updateData: UpdatePostDto) {
        return this.postService.updatePost(postId, updateData);
    }

}

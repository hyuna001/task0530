import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Redirect } from '@nestjs/common';

import { CreatePostDto } from './post/dto/create_post.dto';
import { UpdatePostDto } from './post/dto/update_post_dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {

    constructor(private readonly postService : PostService){};

    @Post()
    createPost(@Body() postData: CreatePostDto){
        return this.postService.createPost(postData);
    }

    @Get()
    getAll(@Query ('page') page : string, @Query ('limit') limit : string) {

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;

        return this.postService.getAll(pageNum, limitNum);
    }
    
    @Get(':id')
    getOne(@Param ('id', ParseIntPipe) id :number) {
        return this.postService.getPostDetail(id);
    }

    @Patch(':id')
    updatePost(@Param('id', ParseIntPipe) id :number, @Body() updateData : UpdatePostDto){
        return this.postService.updatePost(id, updateData);
    }

    @Delete(':id')
    deletePost(@Param('id', ParseIntPipe) id :number){
        return this.postService.deletePost(id);
    }


}

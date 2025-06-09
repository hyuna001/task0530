import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Redirect } from '@nestjs/common';

import { CreatePostDto } from './post/dto/create_post.dto';
import { UpdatePostDto } from './post/dto/update_post_dto';
import { PostService } from './post.service';
import { PaginationDto } from './post/dto/pagination.dto';

@Controller('posts')
export class PostController {

    constructor(private readonly postService : PostService){};

    @Post()
    createPost(@Body() postData: CreatePostDto){
        return this.postService.createPost(postData);
    }

    @Get()
    getAll(@Query () paginationDto : PaginationDto ){
       return this.postService.getAll(paginationDto);
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

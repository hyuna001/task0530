import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Redirect } from '@nestjs/common';

import { CreatePostDto } from './post/dto/create_post.dto';
import { UpdatePostDto } from './post/dto/update_post_dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {

    // constructor(private readonly postService : PostService){};

    // @Get()
    // getAll() {
    //     return this.postService.getAllPosts();
    // }

    // @Get(':id')
    // getOne(@Param('id') postId:number) {
    //     return this.postService.getOnePost(postId);
    // }

    // @Post()
    // insertPost(@Body() postData: CreatePostDto){
    //     return this.postService.createPost(postData);
    // }

    // //삭제
    // @Delete('/:id')
    // deletePost(@Param('id', ParseIntPipe) postId:number) {
    //     this.postService.deletePost(postId);
    //     return {
    //         message: 'delete success',
    //         postId: postId,
    //     }
    // }

    // //수정
    // @Patch(':id')
    // updatePost(@Param('id') postId:number, @Body() updateData: UpdatePostDto) {
   
    //     this.postService.updatePost(postId, updateData);
    //     return {
    //         message: 'update success',
    //         postId: postId,
    //     }
    // }

}

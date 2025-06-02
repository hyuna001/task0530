import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post/entities/post.entity';
import { CreatePostDto } from './post/dto/create_post.dto';
import { UpdatePostDto } from './post/dto/update_post_dto';
import { plainToInstance } from 'class-transformer';
import { format } from 'date-fns/format';


@Injectable()
export class PostService {

    private posts: Post[] = [];
   
    // all
    getAllPosts(){
        // 글 제목, 작성자 아이디, 작성자 이름, 작성일, 수정일
        const post = this.posts.map( post => {
            return {
                title: post.title,
                authorId: post.authorId,
                authorName: post.authorName,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            }
        })

        return post;
    }


    // one 
    getOnePost(postId:number) {
        // 글 제목, 글 내용, 작성자 아이디, 작성자 이름, 작성일, 수정일
        const post = this.posts.map( post => {
            return {
                title: post.title,
                authorId: post.authorId,
                authorName: post.authorName,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            }
        })
        return this.posts.find(post => post.id == postId && post.isDeleted == false);
    }
    

    //insert
    createPost(postData : CreatePostDto){
        //글 제목, 글 내용, 작성자 아이디, 작성자 이름 
        const id = this.posts.length + 1;

        this.posts.push({
            id,
            ...postData,

        });

        return this.posts;
    }


    

    // update
    updatePost(id: number, updateData: UpdatePostDto): Post {

        const post = this.getOnePost(id);

        if(post){
            post.title = updateData.title || post.title;
            post.content = updateData.content || post.content;
            post.updatedAt = updateData.updatedAt || new Date();
        } else {
            throw new NotFoundException("update failed! ");
        }

        return post;
    }

    // delete
    deletePost(postId:number) {
        const post = this.getOnePost(postId);

        if(post){
            post.isDeleted = true;
        } else {
            throw new NotFoundException("delete failed! ");
        }

        return this.posts;
    }

}

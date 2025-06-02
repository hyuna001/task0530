import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post/entities/post.entity';
import { CreatePostDto } from './post/dto/create_post.dto';
import { UpdatePostDto } from './post/dto/update_post_dto';
import { plainToInstance } from 'class-transformer';
import { format } from 'date-fns/format';


@Injectable()
export class PostService {

    private posts: Post[] = [];
    private postId: number = 0;
   
    // all
    getAllPosts() {
        return this.posts
            .filter(p => !p.isDeleted)
            .map(post => ({
                id: post.id,
                title: post.title,
                content: post.content,
                authorName: post.authorName,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }));
    }


    // one 
    getOnePost(postId:number) {
        const post = this.posts.find(post => post.id == postId && post.isDeleted == false);

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        return post;
    }
    
    
    //insert
    createPost(postData : CreatePostDto){
   
        // const id = this.posts.length + 1;
        this.postId++;
        
        this.posts.push({
            id : this.postId,
            ...postData,
        });

        return 'create success';
    }


    // update
    updatePost(id: number, updateData: UpdatePostDto) {

        const post = this.getOnePost(id);

        if(!post){
            throw new NotFoundException("update failed! ");
        }else {
            post.title = updateData.title ?? post.title;
            post.content = updateData.content || post.content;
            post.updatedAt = updateData.updatedAt || new Date();

            return post;
        }
    }

    // delete
    deletePost(postId:number) {
        const post = this.getOnePost(postId);

        if(post){
            post.isDeleted = true;
        } else {
            throw new NotFoundException("delete failed! ");
        }
    }

}

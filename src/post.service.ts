import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post/entities/post.entity';
import { CreatePostDto } from './post/dto/create_post.dto';
import { UpdatePostDto } from './post/dto/update_post_dto';


@Injectable()
export class PostService {
    private posts: Post[] = [];
   
    getAllPosts(){
         return this.posts;
    }

  
    getOnePost(postId:number) {
        return this.posts.find(post => post.id == postId && post.isDeleted == false);
    }

    
    createPost(postData : CreatePostDto){
        const id = this.posts.length + 1;
        
        this.posts.push({
            id,
            ...postData
        });

        return this.posts;
    }

 
    updatePost(postId:number, updatedPostData:UpdatePostDto){
        const post = this.getOnePost(postId);
        
        if(post){
            this.posts = this.posts.map(post => post.id == postId ? { ...post, ...updatedPostData } : post);
      
        } else {
            throw new NotFoundException("업데이트 실패");
        }     
        

        return this.posts;
    }

    deletePost(postId:number) {
        const post = this.getOnePost(postId);

        if(post){
            post.isDeleted = true;
        } else {
            throw new NotFoundException("삭제 실패.");
        }

        return this.posts;
    }
}

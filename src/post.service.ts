import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post/entities/post.entity';
import { CreatePostDto } from './post/dto/create_post.dto';
import { UpdatePostDto } from './post/dto/update_post_dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from './prisma/prisma.service';




@Injectable()
export class PostService { 

    constructor(private readonly prismaService: PrismaService) {}

    async createPost(postData: CreatePostDto) {
        const post = await this.prismaService.post.create({
            data: {
                ...postData
            }
        });

        return post;
    }


    async getAll(page : number, limit : number){
        const list = await this.prismaService.post.findMany({
                skip : ( page - 1 ) * limit,
                take : limit ,
                orderBy : {createdAt : 'desc'}
            }
        );
        
        const cnt = await this.prismaService.post.count();
        const lastPg = Math.ceil(cnt / limit); 

        return {
            list,
            cnt,
            page,
            lastPg
        }
    }   

    async getPostDetail (id : number) {
        const detail = await this.prismaService.post.findUnique({
            where: {
                id: id,
                isDeleted: false
            }
        });

        console.log(id);
        console.log(detail);

        return detail;
    }

    async updatePost(id :number , updateData : UpdatePostDto){
        const post = await this.prismaService.post.update({
            where: {
                id: id
            },
            data: updateData
        });

        return 'update success';
    }

    async deletePost(id :number){
        const post = await this.prismaService.post.update({
            where: {
                id: id
            },
            data: {
                isDeleted: true
            }
        });

        return post;
    }   

}

   
    
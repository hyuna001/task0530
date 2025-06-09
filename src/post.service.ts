import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post/entities/post.entity';
import { CreatePostDto } from './post/dto/create_post.dto';
import { UpdatePostDto } from './post/dto/update_post_dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from './prisma/prisma.service';
import { PaginationDto } from './post/dto/pagination.dto';




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


    async getAll(paginationDto : PaginationDto){

        const {page, limit} = paginationDto;    
        // const page = paginationDto.page;
        // const limit = paginationDto.limit;

        const skip = ( page - 1 ) * limit;
        const take = limit;


        const list = await this.prismaService.post.findMany({
                skip,
                take ,
                orderBy : {createdAt : 'desc'},
                where : {
                    isDeleted : false
                }
            }
        );
        
        const total = await this.prismaService.post.count();

        const lastPg = Math.ceil(total / limit); 

        return {
            list,
            total,
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

        return 'delete success';
    }   

}

   
    
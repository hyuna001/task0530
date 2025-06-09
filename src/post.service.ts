import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './post/dto/create_post.dto';
import { UpdatePostDto } from './post/dto/update_post_dto';
import { PrismaService } from './prisma/prisma.service';
import { PaginationDto } from './post/dto/pagination.dto';
import { DetailDto } from './post/dto/detail.dto';
import { Post } from 'generated/prisma';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(postData: CreatePostDto) {
    const post = await this.prismaService.post.create({
      data: {
        ...postData,
      },
    });

    return post;
  }

  async getAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    // const page = paginationDto.page;
    // const limit = paginationDto.limit;

    const skip = (page - 1) * limit;
    const take = limit;

    const list = await this.prismaService.post.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      where: {
        isDeleted: false,
      },
    });

    const total = await this.prismaService.post.count();

    const lastPg = Math.ceil(total / limit);

    //test
    // const first = await this.prismaService.post.findFirst({
    //   where: {
    //     isDeleted: true,
    //   },
    //   select: {
    //     id: true,
    //     authorId: true,
    //   },
    // });

    //console.log('first : ', first);

    //test2
    // const unique = await this.prismaService.post.findUnique({
    //   where: {
    //     id: 53,
    //   },
    //   select: {
    //     id: true,
    //     authorId: true,
    //   },
    // });

    // console.log('unique : ', unique);

    return {
      //   list,
      //   total,
      //   page,
      //   lastPg,

      data: list,
      meta: {
        total,
        page,
        lastPg,
      },
    };
  }

  async getPostDetail(id: number) {
    const detail: Post | null = await this.prismaService.post.findUnique({
      where: {
        id: id,
        isDeleted: false,
      },
    });

    if (!detail) {
      throw new NotFoundException('Post not found');
    } else {
      return plainToInstance(DetailDto, detail);
      //return new DetailDto(detail);
    }
  }

  async updatePost(id: number, updateData: UpdatePostDto) {
    await this.prismaService.post.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return 'update success';
  }

  async deletePost(id: number) {
    await this.prismaService.post.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
      },
    });

    return 'delete success';
  }
}

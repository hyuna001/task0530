export class Post {

    id: number;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    isDeleted: boolean = false;

}
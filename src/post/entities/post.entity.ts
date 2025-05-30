export class Post {

    id: number;
    title: string;
    content: string;
    authorId: string = "timely";
    authorName: string = "홍길동";
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    isDeleted: boolean = false;

 
}
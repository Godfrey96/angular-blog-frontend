import { Category } from "./category";

export class Post {
    id?: string;
    title?: string;
    updatedAt?: string;
    description?: string;
    image?: string;
    username?: string;
    category?: Category;
}
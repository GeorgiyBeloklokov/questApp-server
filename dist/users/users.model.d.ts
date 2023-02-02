import { Model } from 'sequelize-typescript';
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/role/role.model';
interface UserCreationAttrs {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    email: string;
    password: string;
    banned: boolean;
    banReason: string;
    roles: Role[];
    posts: Post[];
}
export {};

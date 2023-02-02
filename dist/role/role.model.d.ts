import { Model } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
interface RoleUserCreationAttrs {
    value: string;
    description: string;
}
export declare class Role extends Model<Role, RoleUserCreationAttrs> {
    id: number;
    value: string;
    description: string;
    users: User[];
}
export {};

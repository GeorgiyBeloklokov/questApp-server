import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
export declare class UsersService {
    private userRepository;
    private roleService;
    constructor(userRepository: typeof User, roleService: RoleService);
    createUsers(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUsersByEmail(email: string): Promise<User>;
    addRole(dto: AddRoleDto): Promise<AddRoleDto>;
    ban(dto: BanUserDto): Promise<User>;
}

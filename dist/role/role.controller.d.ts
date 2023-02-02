import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    create(dto: CreateRoleDto): Promise<import("./role.model").Role>;
    getByValue(value: string): Promise<import("./role.model").Role>;
}

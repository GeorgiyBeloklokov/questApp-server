"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const exceptions_1 = require("@nestjs/common/exceptions");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const role_service_1 = require("../role/role.service");
const users_model_1 = require("./users.model");
let UsersService = class UsersService {
    constructor(userRepository, roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    async createUsers(dto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('user');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }
    async getAllUsers() {
        const user = await this.userRepository.findAll({ include: { all: true } });
        return user;
    }
    async getUsersByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });
        return user;
    }
    async addRole(dto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new exceptions_1.HttpException('User or role not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async ban(dto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new exceptions_1.HttpException('User not exist', common_1.HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, role_service_1.RoleService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
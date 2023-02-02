import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';
import { HttpException } from '@nestjs/common/exceptions';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User not authorized' });
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (error) {
      console.log(error);

      throw new HttpException('You don`t have access', HttpStatus.FORBIDDEN);
    }
  }
}

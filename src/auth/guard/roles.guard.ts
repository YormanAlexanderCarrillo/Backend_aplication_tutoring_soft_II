import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/common/Enums/enum.role";
import { ROLE_KEY } from "src/common/decorators/roles.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        //console.log(requiredRoles);

        if (!requiredRoles) {
            return false;
        }
        const { user } = context.switchToHttp().getRequest();

        return requiredRoles.some((role) => user.role === role);
    }
}
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    if (!session || !session.user) {
      throw new UnauthorizedException('User not logged in');
    }

    // Gắn user từ session vào request
    request.user = session.user;

    return true;
  }
}

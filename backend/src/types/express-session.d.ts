// src/types/express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: any; // bạn có thể thay `any` bằng interface UserSession nếu muốn
  }
}

import jwt, { SignOptions } from "jsonwebtoken";
import { ADMIN_ROLE, PERMISSION } from "../enums/admin.enum";

export interface IJwtPayload {
  id: string;
  role?: ADMIN_ROLE;
  expiresIn: string;
  permission?: PERMISSION;
  atcId?: string;
  name?: string;
}

export class JwtConfig {
  private static secret =
    process.env.JWT_SECRET || "7cF2pVn!yD@tQxM$zL9wB*G5hA&KmEo";

  private static getSecret(): string {
    return JwtConfig.secret;
  }

  public static assignToken({
    id,
    role,
    expiresIn,
    permission,
    atcId,
    name,
  }: IJwtPayload) {
    const payload = { id, role, permission, atcId, name };
    const options: SignOptions = { expiresIn } as SignOptions;
    return jwt.sign(payload, JwtConfig.getSecret(), options);
  }

  public static verifyToken(token: string) {
    try {
      const isValidToken = jwt.verify(token, JwtConfig.getSecret());
      if (isValidToken) {
        return jwt.decode(token);
      }
    } catch (error: unknown) {
      console.log((error as Error).message, "jwt error");
      return false;
    }
  }
}

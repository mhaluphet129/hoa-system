import { SignJWT, jwtVerify } from "jose";

export async function sign(
  payload: Record<any, any>,
  secret: string
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = Math.floor((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000); // one hour
  const nbf = Math.floor((new Date().getTime() - 60 * 60 * 1000) / 1000);

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(nbf)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(
  token: string,
  secret: string
): Promise<Record<any, any>> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload;
}

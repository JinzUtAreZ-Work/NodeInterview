import { get } from "lodash";
import { Request, Response, NextFunction, response } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";
import { validatePassword } from "../service/user.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh")?.toString(); // remove error below
  //console.log("refresh", refreshToken);
  if (!accessToken) {
    return next();
  }

  const { decoded, expired, valid } = verifyJwt(
    accessToken,
    "accessTokenPublicKey"
  );

  const user = await validatePassword(req.body);
  // console.log("deserializeRequest", user, req.body);

  if (!valid && !user) {
    return res.status(401).json({ error: "Please login again" });
  }

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      //res.setHeader("x-access-token", newAccessToken);
      res.set({
        "x-access-token": newAccessToken,
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

    const result = verifyJwt(newAccessToken as string, "accessTokenPublicKey");

    res.locals.user = result.decoded;

    //console.log("deserialize", result);

    return next();
  }
  //console.log("deserialized", decoded, expired);
  return next();
};

export default deserializeUser;

// google.com fetch request error
// pending handleRefreshToken in refreshtokenrotation

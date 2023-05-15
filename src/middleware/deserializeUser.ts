import { get } from "lodash";
import { Request, Response, NextFunction, response } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

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

  // console.log("valid", valid);
  // if (!valid) {
  //   console.log("valid", valid, req.headers);
  //   // delete req.headers["authorization"];
  //   // delete req.headers["x-refresh"];
  //   res.removeHeader("authorization");
  // }

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
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

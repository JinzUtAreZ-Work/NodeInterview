import config from "config";

let allowedOrigins = config.get<Array<string>>("allowedOrigins");
//console.log(allowedOrigins);
export const corsOptions = {
  origin: (origin: any, callback: any) => {
    //console.log("cors", allowedOrigins);
    //console.log("cors", allowedOrigins.indexOf(origin) !== -1, !origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;

import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import multiparty from "multiparty";
import { get } from "lodash";

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // check file upload
      const chkFormData = get(req, "headers.content-type")?.toString();
      // if (chkFormData) {
      //   var form_data = new multiparty.Form();
      //   //console.log("parse formdata", form_data);
      //   form_data.parse(req, function (err, fields, files) {
      //     console.log("parse files", files);
      //     schema.parse({
      //       body: files,
      //     });
      //   });
      // }

      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      //console.log("resource", req.body);
      next();
    } catch (err: any) {
      return res.status(400).send(err.errors);
    }
  };

export default validateResource;

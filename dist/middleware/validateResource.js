"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const validateResource = (schema) => (req, res, next) => {
    var _a;
    try {
        // check file upload
        const chkFormData = (_a = (0, lodash_1.get)(req, "headers.content-type")) === null || _a === void 0 ? void 0 : _a.toString();
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
    }
    catch (err) {
        return res.status(400).send(err.errors);
    }
};
exports.default = validateResource;
//# sourceMappingURL=validateResource.js.map
import bcrypt from "bcrypt";
import config from "config";
import * as WorkerPool from "workerpool";
import BCrypt from "bcryptjs";

const bcryptHash = async () => {
  return await BCrypt.hash("password is long", 20);
};

WorkerPool.worker({
  bcryptHash,
});

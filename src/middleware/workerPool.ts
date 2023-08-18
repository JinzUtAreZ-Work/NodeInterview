import * as WorkerPool from "workerpool";
import * as Path from "path";
import dotenv from "dotenv";
dotenv.config();

type poolProxyType = WorkerPool.WorkerPoolOptions & {
  bcryptHash?: (password: string) => Promise<string> | undefined;
};

let poolProxy: poolProxyType;

// FUNCTIONS
export const init = async () => {
  if (process.env.WORKER_POOL_ENABLED === "1") {
    const pool = WorkerPool.pool(
      Path.join(__dirname, "../threads/workerFunctions.ts"),
      { minWorkers: "max" }
    );

    poolProxy = await pool.proxy();
    //console.log(pool);
    console.log(
      //@ts-expect-error
      `Worker Threads Enabled - Min Workers: ${pool.minWorkers} - Max Workers: ${pool.maxWorkers} - Worker Type: ${pool.workerType}`
    );
  }
};

export const get = async (): Promise<poolProxyType> => {
  return poolProxy;
};

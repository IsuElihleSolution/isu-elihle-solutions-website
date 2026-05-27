import sql from "mssql";

let poolPromise: Promise<sql.ConnectionPool> | null = null;

export function getPool(): Promise<sql.ConnectionPool> {
  if (poolPromise) return poolPromise;

  const { AZURE_SQL_SERVER, AZURE_SQL_DATABASE, AZURE_SQL_USER, AZURE_SQL_PASSWORD } = process.env;

  if (!AZURE_SQL_SERVER || !AZURE_SQL_DATABASE || !AZURE_SQL_USER || !AZURE_SQL_PASSWORD) {
    throw new Error("Missing Azure SQL environment variables");
  }

  const config: sql.config = {
    server: AZURE_SQL_SERVER,
    database: AZURE_SQL_DATABASE,
    user: AZURE_SQL_USER,
    password: AZURE_SQL_PASSWORD,
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  };

  poolPromise = new sql.ConnectionPool(config)
    .connect()
    .catch((err) => {
      poolPromise = null;
      throw err;
    });

  return poolPromise;
}

export { sql };

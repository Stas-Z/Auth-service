interface IDatabase {
    host: string;
    port: number;
    user: string;
    password: string;
}

export interface IConfig {
    port: number;
    secret: string;
    exptime: string | number;
    refresh: string;
    exprefresh: string;
    database: IDatabase;
    clientUrl: string;
    NODE_ENV: string;
}

export default () => ({
    port: parseInt(process.env.PORT || '5000', 10),
    secret: process.env.JWT_ACCES_TOKEN_SECRET,
    exptime: process.env.JWT_ACCES_TOKEN_EXPARATION_MS || 60 * 60 * 1000,
    refresh: process.env.JWT_REFRESH_TOKEN_SECRET,
    exprefresh: process.env.JWT_REFRESH_TOKEN_EXPARATION_MS,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.PORT || '3306', 10),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    },
    clientUrl: process.env.CLIENT_URL,
    NODE_ENV: process.env.NODE_ENV,
});

export default () => ({
    port: parseInt(process.env.PORT, 10) || 5005,
    secret: process.env.JWT_ACCES_TOKEN_SECRET,
    exptime: process.env.JWT_ACCES_TOKEN_EXPARATION_MS || 60 * 60 * 1000,
    refresh: process.env.JWT_REFRESH_TOKEN_SECRET,
    exprefresh: process.env.JWT_REFRESH_TOKEN_EXPARATION_MS,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    },
});

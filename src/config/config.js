import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 8080,
    urlHostMySQL: process.env.MYSQL_ADDON_HOST || "localhost",
    urlUserMySQL: process.env.MYSQL_ADDON_USER || "root",
    urlPasswordMySQL: process.env.MYSQL_ADDON_PASSWORD || "root",
    urlDatabaseMySQL: process.env.MYSQL_ADDON_DB || "escuela",
    portDataBase: process.env.MYSQL_ADDON_PORT || 3306,
    // gitHubCallBack: process.env.URL_GITHUB_CALL_BACK,
    tokenSecret: process.env.SECRET_TOKEN,
    // clientId: process.env.CLIENT_ID,
    // cookieToken: process.env.COOKIE_TOKEN,
    secretKey: process.env.SECRET_KEY,
    emailUser: process.env.EMAIL_USER,
    passwordAppGoogle: process.env.PASSWORD_APP_GOOGLE,
    allUrl: process.env.URL_ALL,
    // accessTokenMP: process.env.ACCESS_TOKEN_MP
}
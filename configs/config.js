module.exports = {
    NODE_ENV:process.env.NODE_ENV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june_2021',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'xxx',

    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'Apanovich0406',
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'apanovich.anna.itec@gmail.com',

    URL_FROM_FRONT_END: process.env.URL_FROM_FRONT_END,
    PASSWORD_FORGOT_URL: process.env.PASSWORD_FORGOT_URL,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
};

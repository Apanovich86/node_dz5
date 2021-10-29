module.exports = {
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    AUTHORIZATION: 'Authorization',
    CORS_NOT_ALLOWED: 'CORS is not allowed',

    PHOTO_MAX_SIZE: 2 * 1024 * 1024,
    FILE_MAX_SIZE: 5 * 1024 * 1024,
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/pjpeg',
        'image/tiff',
        'image/webp'
    ]
};

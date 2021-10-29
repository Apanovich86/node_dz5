const {ErrorHandler, errors} = require('../errors');
const {PHOTOS_MIMETYPES, PHOTO_MAX_SIZE} = require('../configs/constants');
module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const { avatar } = req.files;

            if (!avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = avatar;

            if (!PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(errors.NOT_SUPPORTED_ERR.message, errors.NOT_SUPPORTED_ERR.code);
            }

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(`File ${name} is too big`, errors.NOT_SUPPORTED_ERR.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

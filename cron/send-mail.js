const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const O_Auth = require('../dataBase/O_Auth');
const {emailService} = require('../service');
const {emailActionsEnum} = require('../configs');

module.exports = async () => {
    const tenDaysAgo = dayJs.utc().subtract(10, 'day');

    const users = await O_Auth.find({
        updateAt: {$lt: tenDaysAgo}
    });
    Promise.allSettled(users)
        .then((results) => results
            .forEach(({user_id: {id}}) => {
                emailService
                    .sendMail(id, emailActionsEnum.REMINDER_LETTER);
            }));
};

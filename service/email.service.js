const path = require('path');

const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const {ErrorHandler, errors} = require('../errors');
const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../configs/config');
const allTemplates = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(errors.WRONG_TEMPLATE_NAME.message, errors.WRONG_TEMPLATE_NAME.code);
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};
module.exports = {
    sendMail
};

const cron = require('node-cron');

const removeOldTokens = require('./old-token-remove');
const sendMail = require('./old-token-remove');

module.exports = () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log('Cron start at', new Date().toISOString());
        await removeOldTokens();
        console.log('Cron finished at', new Date().toISOString());
    });
    cron.schedule('0 0 12 * * 1', async () => {
        console.log('Cron start at', new Date().toISOString());
        await sendMail();
        console.log('Cron finished at', new Date().toISOString());
    });
};

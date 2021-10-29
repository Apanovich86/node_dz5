const { User } = require('../dataBase');
const { ADMIN } = require('../configs/user-rols.enum');

module.exports = async () => {
    const user = await User.findOne({role: ADMIN});

    if (!user) {
        await User.createUserWithHashPassword({
            name: 'Anna',
            email: 'ann.admin@gmail.com',
            password: 'Hello_World1',
            role: ADMIN
        });
    }
};

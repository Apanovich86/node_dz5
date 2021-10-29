const {Schema, model} = require('mongoose');

const {userRoles, modelNamesEnum} = require('../configs');
const {passwordService} = require('../service/password.service');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    avatar: {
        type: String
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.virtual('fullName').get(function() {
    return `${this.name} ${this.role} HA-HA`;
});

userSchema.methods = { // just for single record
    randomMethod() {
        console.log('**********************************************');
        console.log(this);
        console.log('**********************************************');
    },

    comparePassword(password) {
        return passwordService.compare(password, this.password);
    }
};

userSchema.statics = {
    testStatic(msg) {
        console.log('TEST STATIC', msg);

    },

    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});

    }
};

module.exports = model(modelNamesEnum.USER, userSchema);

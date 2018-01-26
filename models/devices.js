module.exports = function (mongo) {
    'use strict';
    let ObjectId = mongo.Schema.Types.ObjectId;
    let gsm = new mongo.Schema({
        name: {
            type: String,
            default: null
        },
        username: {
            type: String,
            default: null
        },
        password: {
            type: String,
            default: null
        },
        ip: {
            type: String,
            default: null
        },
        timeout: {
            type: String,
            default: null
        },
        keys: {
            account_id: {
                type: ObjectId,
                default: null
            },
            license_id: {
                type: ObjectId,
                default: null
            }
        },
        deleted: {
            status: {
                type: Number,
                default: 0
            },
            date: {
                type: Date,
                default: Date.now
            },
            account_id: {
                type: ObjectId,
                default: null
            },
            ip: {
                type: String,
                default: null
            }
        },
    });
    try {
        return mongo.model('gsm', gsm);
    } catch (e) {
        return mongo.model('gsm');

    }
};
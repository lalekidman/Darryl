module.exports = function (mongo) {
    if (!mongo) throw "Mongo db parameter is required.";
    var ObjectId = mongo.Schema.Types.ObjectId;
    var user_group = new mongo.Schema({
        name: {
            type: String,
            default: null
        },
        keys: {
            license_id: {
                type: ObjectId,
                default: null
            },
            account_id: {
                type: ObjectId,
                default: null
            },
        },
        members: [{
            user_id: {
                type: ObjectId,
                default: null,
                index: true
            }
            }],
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
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        }
    });
    try {
        return mongo.model('user_group', user_group);
    } catch (e) {
        return mongo.model('user_group');
    }
}
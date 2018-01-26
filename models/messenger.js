module.exports = function (mongo) {
    if (!mongo) throw "Mongo db parameter is required.";
    var ObjectId = mongo.Schema.Types.ObjectId;
    var messenger = new mongo.Schema({
        name: {
            type: String,
            default: null
        },
        pageId: {
            type: String,
            default: null
        },
        token: {
            type: String,
            default: null
        },
        deleted: {
            status: {
                type: Number,
                default: 0
            },
            account_id: {
                type :ObjectId,
                default: null
            },
            ip: {
                type: String,
                default: null
            },
            date: {
                type: Date,
                default: null
            }
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
        date: {
            updated: {
                type: Date,
                default: Date.now
            },
            created: {
                type: Date,
                default: Date.now
            }
        }
    });
    try {
        return mongo.model('messenger', messenger);
    } catch (e) {
        return mongo.model('messenger');
    }
};
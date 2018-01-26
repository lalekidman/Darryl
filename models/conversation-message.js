module.exports = function (mongo) {
    if (!mongo) throw "Mongo db parameter is required.";
    var ObjectId = mongo.Schema.Types.ObjectId;
    var conversation_messages = new mongo.Schema({
        number: {
            type: String,
            default: null
        },
        message: {
            type: String,
            default: null
        },
        mode: {
            type: String,
            default: "0"
        },
        status: {
            type: Number,
            default: 0
        },
        schedule: {
            time: {
                type: String,
                default: "0"
            },
            status: {
                type: Number,
                default: 0
            }
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
            conv_id: {
                type: ObjectId,
                default: null
            },
            auto_response_id: {
                type: ObjectId,
                default: null
            },
        },
        ports: {
            mode: {
                type: String,
                default: "1"
            },
            id: {
                type: ObjectId,
                default: null
            },
        },
        deleted: {
            status: {
                type: Number,
                default: 0
            },
            ip: {
                type: String,
                default: null
            },
            date: {
                type: Date,
                default: Date.now
            },
            account_id: {
                type: ObjectId,
                default: null
            }
        },
        message_type : {
            type : String,
            default : "sms"
        },
        fb_defaults : {
            type : Object,
            default : {}
        },
        reason: {
            type: String,
            default: null
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
        return mongo.model('conversation_messages', conversation_messages);
    } catch (e) {
        return mongo.model('conversation_messages');
    }
}
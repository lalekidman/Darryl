module.exports = function (mongo) {
    if (!mongo) throw "Mongo db parameter is required.";
    var ObjectId = mongo.Schema.Types.ObjectId;
    var conversation = new mongo.Schema({
        id: {
            type: String,
            default: null
        },
        number: {
            type: Array,
            default: null
        },
        mode: {
            type: String,
            default: "open"
        },
        access: {
            email: {
                type: Boolean,
                default: false
            },
            bot: {
                type: Boolean,
                default: false
            },
        },
        keys: {
            account_id: {
                type: ObjectId,
                default: null
            },
            license_id: {
                type: ObjectId,
                default: null
            },
            disposition_id: {
                type: ObjectId,
                default: null
            },
            page_id: {
                type: String,
                default: null
            }
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
        user_assign: {
            mode: {
                type: String,
                default: "1"
            },
            id: {
                type: ObjectId,
                default: null
            },
            user_id: {
                type: ObjectId,
                default: null
            },
            assigner_id: {
                type: ObjectId,
                default: null
            },
            remover_id: {
                type: ObjectId,
                default: null
            }
        },
        tickets: [{
            id: {
                type: ObjectId
            },
            value: {
                type: String,
                default: null
            },
            }],
        tags: [{
            name: {
                type: String,
                default: null
            }
        }],
        spam: {
            type: Number,
            default: 0
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
        merge : {
            list : {
                type : Array,
                default : []
            },
            account_id : {
                type : ObjectId,
                default : null
            },
            date : {
                type : Date,
                default : Date.now
            },
            status : {
                type : Number,
                default : 0
            }
        },
        message_type : {
            type : String,
            default : "sms"
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
        return mongo.model('conversations', conversation);
    } catch (e) {
        return mongo.model('conversations');
    }
};
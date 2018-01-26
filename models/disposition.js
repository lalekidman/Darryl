module.exports = function (mongo) {
    if (!mongo) throw "Mongo db parameter is required.";
    var ObjectId = mongo.Schema.Types.ObjectId;
    var dispositions = new mongo.Schema({
        id: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: "open"
        },
        color: {
            background : {
                type: String,
                default: null
            },
            font : {
                type: String,
                default: null
            }
        },
        enabled: {
            type: Boolean,
            default: false
        },
        conversation_status : {
            type : Boolean,
            default : false
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
        return mongo.model('dispositions', dispositions);
    } catch (e) {
        return mongo.model('dispositions');
    }
};
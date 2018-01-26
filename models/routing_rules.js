module.exports = function (mongo) {
    if (!mongo) throw "Mongo db parameter is required.";
    var ObjectId = mongo.Schema.Types.ObjectId;
    var routing_rules = new mongo.Schema({
        //            _id : {type : ObjectId, default : ObjectId, index : 1},
        name: {
            type: String,
            index: true
        },
        failed_sms: {
            type: Boolean,
            default: false
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
        prefix: [
            {
                number: {
                    type: String,
                    default: null
                }
            }
            ],
        ports: {
            id: {
                type: ObjectId,
                default: null
            },
            mode: {
                type: String,
                default: '1'
            },
        },
        deletes: {
            type: String,
            default: 1
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
        return mongo.model('routing_rules', routing_rules);
    } catch (e) {
        return mongo.model('routing_rules');
    }
}
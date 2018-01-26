module.exports = function (mongo) {
    if (!mongo) throw "Mongo db parameter is required.";
    var ObjectId = mongo.Schema.Types.ObjectId;
    var port_group = new mongo.Schema({
        name: {
            type: String,
            default: null
        },
        policy: {
            type: String,
            default: "asc",
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
        members: [
            {
                port_id: {
                    type: ObjectId,
                    default: null
                }
            }
        ],
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
        return mongo.model('port_group', port_group);
    } catch (e) {
        return mongo.model('port_group');
    }
}
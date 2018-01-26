module.exports = function (mongo) {
    if (!mongo) throw "Mongo db parameter is required.";
    var ObjectId = mongo.Schema.Types.ObjectId;
    var survey = new mongo.Schema({
        //            _id : {type : ObjectId, default : ObjectId, index : 1},
        name: {
            type: String,
            default: null,
            index: true
        },
        message: {
            type: String,
            default: null,
            index: true
        },
        deleted: {
            status : {type : Number, default : 0},
            date : {type : Date, default : Date.now},
            account_id : {type : ObjectId, default : null},
            ip : {type : String, default : null}
        },
        keys: {
            account_id: {
                type: ObjectId
            },
            license_id: {
                type: ObjectId
            }
        },
        options: [
            {
                answer: {
                    type: String,
                    default: null
                },
                response: {
                    type: String,
                    default: 0
                },
                deleted: {
                    type: String,
                    default: 0
                }
            }
            ],
        time_duration: {
            type: Date,
            default: null
        },
        response: [
            {
                conv_id: {
                    type: ObjectId,
                    default: null
                },
                options_id: {
                    type: ObjectId,
                    default: null
                },
                recipient: {
                    type: String,
                    default: null
                },
                status: {
                    type: Number,
                    default: 0
                }
                }
            ],
        date: {
            type: Date,
            default: Date.now
        },
        created: {
            type: Date,
            default: Date.now
        }
    });
    try {
        return mongo.model('surveys', survey);
    } catch (e) {
        return mongo.model('surveys');
    }
};
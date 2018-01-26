module.exports = function(mongo){
    if(!mongo) throw "Mongo db parameter is required.";
        var ObjectId = mongo.Schema.Types.ObjectId;
        var tickets = new mongo.Schema({
//            _id : {type : ObjectId, default : ObjectId, index : 1},
            name : {type : String, index : true},
            mode : {type : String, default : "1"},
            owner : {type : String,default : "1"},
            keys : {
                license_id : {type : ObjectId,default : null},
                account_id : {type : ObjectId,default : null},
            },
            options : [{
                value : {type : String, default : null}
            }],
            deletes : {type : String, default : "1"},
            created : {type : Date, default : Date.now},
            updated : {type : Date, default : Date.now}
        });
    try{
        return mongo.model('tickets',tickets);   
    }catch(e){
        return mongo.model('tickets');   
    }
}
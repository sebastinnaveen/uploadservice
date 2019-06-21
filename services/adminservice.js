var fbService = require(rootdir+'/services/firebaseservice.js');
var _ = require('lodash');
const axios = require('axios');

const apiurl = 'https://api.dialogflow.com/v1/intents?v=20190621'

  function getNpWords(obj, approvalId){
    
    _.forEach(obj, function(data){
        
        if(data.id === approvalId){
            data.status = 'done';
        }
    })
    
    return obj;
}

module.exports = {
    getApprovedData: function(callback){
        var resp = [];
        fbService.getData('/npwords', function(jsonResponse){
           // console.log(jsonResponse);
            if(!jsonResponse)
             callback(resp) ;

            resp =  _.filter(jsonResponse, function(o) { 
               // console.log(o)
                return o.status === 'approved'
            
            });
            console.log(resp)
            callback(resp) ;
        });
    },
    postActiondata: function(actionPayload,callback){
        var resp = [];
        var actionDataFb = [];
        var intentPayload ={
            "id":"",
            "name":"Intent11",
            "auto":true,"contexts":[],
            "responses":[{"resetContexts":false,"affectedContexts":[],"parameters":[],
            "messages":[{"type":0,"lang":"en","speech":"response 11"}],"defaultResponsePlatforms":{},
            "speech":[]}],"priority":500000,"webhookUsed":false,"webhookForSlotFilling":false,
            "lastUpdate":1558279995314,"fallbackIntent":false,"events":[],
            "userSays":[{"id":"","data":[{"text":"user message 11","userDefined":false}],"isTemplate":false,
            "count":0,"updated":1558279995316}]

        }
        var config = {
            headers: {
            'Authorization': 'bearer 8d0d9aca83134f21a656282813df0f00',
            'Content-Type': 'application/json'
            }
        };
       
        fbService.getData('/config/actions', function(jsonResponse){
            console.log(jsonResponse);
            if(!jsonResponse)
              callback(resp) ;

             actionDataFb = _.clone(jsonResponse);
            console.log(actionDataFb);
                actionDataFb.push(actionPayload);
                fbService.deleteData('/config/actions',function(delResp){
                    fbService.insertData('/config/actions',actionDataFb,function(insResp){

                        // start Create Intent
                        axios.post(apiurl,
                            JSON.stringify(intentPayload),
                        config
                        
                        )
                    .then(function (response) {
                        
                         
                         //Start Change status to Done
                         var approvalId =  req.body.approvalId;
                         fbService.getData('/npwords',function(jsonResponse){
                             if(!jsonResponse)
                                 return null;
                              var npwords = getNpWords(jsonResponse,approvalId);
                                console.log(npwords)
                                fbService.deleteData('/npwords',npwords,function(jsonResp){
                                 fbService.insertData('/npwords',npwords,function(jsonResp){
                 
                                    callback(jsonResp) ;   
                                 });
                                 
                                 
                                 });
                             });   

                         //End 
                    })
                    .catch(function (error) {
                        console.log(error);
                        callback(error) ;   
                    }); 
                        // End create intent
                       

                    });
                    
                    });
        
    }); 
}
}

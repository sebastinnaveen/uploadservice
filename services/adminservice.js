var fbService = require(rootdir+'/services/firebaseservice.js');
var _ = require('lodash');

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
    }
}

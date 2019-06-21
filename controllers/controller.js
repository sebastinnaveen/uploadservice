var adminService = require(rootdir+'/services/adminservice.js');

var finalObject={};
finalObject.getDashboard = async function(req,res,next){
    try {
              responsedata = [{'message':'Service started'}];
        res.status(200).json(responsedata);
    } catch (error) {
        res.send(error);
    }
};

finalObject.getApproved = async function(req,res,next){
    try {
             adminService.getApprovedData(function(data){
                //console.log(result)
                res.status(200).json(data);
             });
             
    } catch (error) {
        res.send(error);
    }
};

finalObject.postActions = async function(req,res,next){
    try {
        responsedata = [{'message':'Service started'}];
        res.status(200).json(responsedata);
             
    } catch (error) {
        res.send(error);
    }
};

module.exports=finalObject; 

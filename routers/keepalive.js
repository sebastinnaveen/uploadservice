var express = require("express");
const router=express.Router({mergeParams:true});
var controller = require(rootdir+'/controllers/controller');
/**
 * @swagger
 * /keepalive:
 *   get:
 *     description: Sample Data
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: keepalive
*/

router.get("/keepalive",async function(req,res,next){
    await controller.getkeepAlive(req,res,next);
});

module.exports=router;

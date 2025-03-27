const mysrvdemo = function(srv) {
    srv.on("myfoobar", function(req, res){
        console.log(req.data);
        
        return "Hello" + req.data.msg;
    });
};

module.exports = mysrvdemo;
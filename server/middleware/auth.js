const {User} = require('../models/User');

//인증 처리를 하는 곳
let auth = (req, res, next) => {
    //1. 클라이언트 쿠키를 토큰을 가져옴
    
    //2. 디코딩함 복호화해서 user 찾음 
    console.log("auth.js / auth정의 /" + req.cookies);
    let token = req.cookies.x_auth;//cookies 이거 오탘ㅋㅋㅋ
    //3. user가 있으면 인증 ok
    User.findByToken(token, (err, user) => {
        if(err) throw err;

        if(!user){
            return res.json({isAuth:false, error:true});
        }

        //user가 있으면 
        req.token = token;
        req.user = user;
        next();

    });
};

module.exports = {auth};
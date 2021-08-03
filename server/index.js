//시작점
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//express 호출
const app = express();
const port = 5000;

//model 가져옴
const {User} = require('./models/User');

//middleware가져옴 
const {auth} = require('./middleware/auth');

//config값 가져옴
const config = require('./config/key');

//body parser 옵션주기
///application/x-www-form-urlencoded 데이터를 분석해서 가지고 올 수 있게함 
app.use(bodyParser.urlencoded({extends: true}));
///application/json 형식 데이터 
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


//routes
app.get('/', (req, res) => {
    res.send('Hello World ggg');
});

//test용 // client 에서 localhost:5000/api/hello 라고 해야 응답한다. 
app.get('/api/hello', (req, res) =>{
    res.send("안녕하세요 서버입니다.");
});


//회원가입
app.post('/api/users/register', (req, res) => {
    //아이디 비번 등 가져올 것임
    //db에 저장 할 것임 
    const user = new User(req.body);

    //비밀번호 암호화 
    //db 저장 
    user.save((err, userInfo) => {
        //console.log(err);
        if(err){
            return res.json({success: false, err });
        }
        return res.status(200).json({success: true});
    });

});

//로그인
app.post('/api/users/login', (req, res) => {
    //이메일 db에서 찾기 
    User.findOne({email: req.body.email}, (err, user) => {
        //없으면 
        console.log('/login 함수 진입');

        if(!user){
            return res.json({
                loginSuccess: false,
                message: "해당 이메일을 사용하는 유저가 없습니다."
            });
        };
        console.log('/login 함수 진입');

        //이메일이 있다면 비밀번호 같은지 확인 
        user.comparePassword(req.body.password, (err, isMatch) =>{

            console.log('index.js comparePassword 함수 호출 부분' + isMatch);

            if(!isMatch){
                return res.json({loginSuccess: false, message:"비밀번호가 틀렸습니다"});
            }
            //비밀번호가 맞다면 token 생성 
            //jsonwebtoken 사용 
            user.generateToken((err, user) => {
                //user정보가 옴 

                if(err) return res.status(400).send(err);

                //토큰을 쿠키, 로컬스토리지, session 등에 저장할 수 있다. 
                //여기에는 쿠키에 저장 
                res.cookie("x_auth", user.token) //x_auth 라는 이름으로 
                   .status(200)
                   .json({loginSuccess: true, userId: user._id}); 
            });
        });
    });
});

//auth router
//auth 라는 미들웨어 추가 
app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 미들웨어 통과함 req 에 저장되어서 옴 
    //클라이언트에 정보 전달 
    //role 0 -> 일반유저
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth : true, 
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

//로그아웃 
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id},{token: ""}, (err, user) => {
        if(err) return res.json({success: false, err});

        return res.status(200).send({success: true});
    });
});



app.listen(port, () => {
    console.log(`Examle app listening on port ${port}`);
});







//시작점
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//express 호출
const app = express();
const port = 5000;

//model 가져옴
const {User} = require('./models/User');

//config값 가져옴
const config = require('./config/key');

//body parser 옵션주기
///application/x-www-form-urlencoded 데이터를 분석해서 가지고 올 수 있게함 
app.use(bodyParser.urlencoded({extends: true}));
///application/json 형식 데이터 
app.use(bodyParser.json());

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

//회원가입
app.post('/register', (req, res) => {
    //아이디 비번 등 가져올 것임
    //db에 저장 할 것임 
    const user = new User(req.body);

    //db 저장 
    user.save((err, userInfo) => {

        if(err){
            return res.json({success: false, err });
        }

        return res.status(200).json({success: true});
    });

});

app.listen(port, () => {
    console.log(`Examle app listening on port ${port}`);
});







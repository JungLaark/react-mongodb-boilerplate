const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;//salt가 몇글자인지 정의 
const jwt = require('jsonwebtoken');

//making schema 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String, 
        maxlength: 50   
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token : {//유효성 검사
        type: String
    },
    tokenExp: {
        type: Number
    }

});

//save 하기 전에 뭔갈 한다
userSchema.pre('save', function(next){
    //비밀번호 암호화   
    //https://www.npmjs.com/package/bcrypt technique 1
    //salt 만들기 
    let user = this;
    //비번 변경될 떄만 호출 
    if(user.isModified('password')){//db에 있는 값과 비교하여 변경되면 true 
        bcrypt.genSalt(saltRounds, function(err, salt) {

            if(err){
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err){
                    return next(err);
                }
                //암호화된 password로 변경
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

//비번 비교 
userSchema.methods.comparePassword = function(plainPassword, callback){
    //암호화된 비번비교 
    //암호화된 password 복호화 할 수 없음 

    console.log("comparePassword함수 원형");

    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
       
        if(err){
            return callback(err);
        } 
        callback(null, isMatch);
    });
};

//비밀번호가 일치하면 token 생성 
userSchema.methods.generateToken = function(callback){
    //jsonwebtoken이용 
    var user = this;
    //여기에 오류가 있었음
    var token = jwt.sign(user._id.toHexString(), 'secretToken');//토큰 생성 

    user.token = token;

    user.save(function(err, user){
        if(err) return callback(err);

        callback(null, user);
    });
};

//복호화
userSchema.statics.findByToken = function(token, cb){
    var user = this;
    //토큰을 decode
    jwt.verify(token, 'secretToken', function(err, decoded){
        //decoded에 복호화된 userid 리턴되어서 옴
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            
            if(err) return cb(err);

            cb(null, user);
        });
    });
}

const User = mongoose.model('User', userSchema);

module.exports = {User};
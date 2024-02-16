const { default: mongoose } = require("mongoose")
const bcrypt = require("bcrypt")     // 참고 : https://www.npmjs.com/package/bcrypt
const saltRounds = 10;


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
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    tocken: {
        type: String,
    },
    tockExp: {
        type: Number
    }
})

// save 함수 실행 전에 실행되는 함수
userSchema.pre('save', function( next ) {
    var user = this

    if(user.isModified('password')) {
        // 비밀번호를 암호화 시킴.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)

                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}

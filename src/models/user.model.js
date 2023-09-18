const mongoose = require('mongoose')



const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
const userSchema = new mongoose.Schema({
    name:{
        type: string,
        required: true,
    },
    email:{
        type: string,
        required: true,
        unique: true,
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email!`
          },
    },
    password: {
        type:string,
        required: true,
        select: false,

    },   
    content: {
        type: string,
        required: true,
    },
    articles: [{
        type: mongoose.Types.ObjectId,
        ref: "Articles",
    }],
    favorites: [{
        type: mongoose.Types.ObjectId,
        ref: "Topics",
    }],
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "Articles",
    }], 
});

constusercModel = new mongoose.model('User',userSchema);

module.exports = {userModel };

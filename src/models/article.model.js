const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title:{
        type: string,
        require: true,
    },
    slug:{
        type: string,
        required: true,
        unique: true,
    },
    landing: {
        type:string,
        default: "/public/images/topics/environment.png",
    },   
    content: {
        type: string,
        required: true,
    },
     
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "Users",
    }], 
    
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "comments",
    }],
    topics: [{
        type: mongoose.Types.ObjectId,
        ref: "Topics",
    }],
    
});

const ArticlecModel = new mongoose.model('Article', articleSchema);

module.exports = { ArticleModel };

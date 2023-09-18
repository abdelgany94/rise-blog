const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    author:{
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true,
    
    },
    articles:{
        type:mongoose.Types.ObjectId,
        ref: Articles,
        required: true,
    },
    content: {
        type:string,
        required: true,
        
    },
});

const CommentModel = new mongoose.model('Comments',commentSchema);

module.exports = { CommentModel };

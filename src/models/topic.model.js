const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    label:{
        type: string,
        require: true,
        unique: true,
    },
    articles:[{
        type:mongoose.Types.ObjectId,
        ref: articles,
    }],
    landing: {
        type:string,
        default: "/public/images/topics/environment.png"
         
    }
});

const TopicModel = new mongoose.model('Topics', topicSchema);

module.exports = { TopicModel };

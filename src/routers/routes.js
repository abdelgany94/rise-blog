const { CommentRouter } = require('./comments.routes');
const { TopicRouter } = require('./topic.routes');

const router = require('express').Router({ mergeParams: true });


router.get('/', (req, res)=>{
    res.send("hello guys !")
})

router.use('/topics', TopicRouter)
router.use('/comments', CommentRouter)


module.exports = { AppRouter: router };
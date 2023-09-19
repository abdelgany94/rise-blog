const { ArticleRouter } = require('./articles.routes');
const { CommentRouter } = require('./comments.routes');
const { TopicRouter } = require('./topic.routes');
const { UserRouter } = require('./users.routes');

const router = require('express').Router({ mergeParams: true });


router.get('/', (req, res)=>{
    res.send("hello guys !")
})

router.use('/topics', TopicRouter)
router.use('/comments', CommentRouter)
router.use('/articles', ArticleRouter)
router.use('/users', UserRouter)

module.exports = { AppRouter: router };
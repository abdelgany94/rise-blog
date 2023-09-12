const router = require('express').Router({ mergeParams: true });


router.get('/', (req, res)=>{
    res.send("hello guys !")
})



module.exports = { AppRouter: router };
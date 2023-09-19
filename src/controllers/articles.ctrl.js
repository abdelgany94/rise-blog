const { ArticleModel } = require("../models/article.model");

async function createNewArticle(req, res){
    try{
        const data = req.body;
        // const topicLanding = req.body.landingLink;
    
        // TODO upload landing image and add it link in the request data and create the ArticleModel instance with it
        const article = await ArticleModel.create(data);
        return res.status(200).json({ message: "Article créé avec succes", article });
        }catch(err){
        // TODO :implements error handling
        console.log(err);
        return res
        .status(400)
        .json({ message:'Une erreur est survenue', erreur: err});
    
        }
}
async function getArticleById(req, res){
    try {
        const article = await ArticleModel.findOne({_id: req.params.id});

        // TODO : populate author after writing authore data
        return res.status(200).json({ 
        message: article== null 
        ? "Cet article n'existe pas" 
        : "Article recupere avec success",
        article,
    });
      
    } catch (error) {
        // TODO :implements error handling
        console.log(error);
        return res.status(400).json({ message:'Une erreur est survenue', erreur: error});
    
    }
}
async function getAllArticles(req, res){
    try {
        const articles= await ArticleModel.find();

        // TODO : populate author after writing authore data
        return res.status(200).json({ message:"Liste des articles dispo", articles});
      
    } catch (error) {
        // TODO :implements error handling
        console.log(error);
        return res.status(400).json({ message:'Une erreur est survenue', erreur: error});
    
    }
}
async function updateArticle(req, res){
   try{
    const content = req.body.content;
    
        // TODO : Add the landing link key in the req body when using the middlewarares
        const article = await ArticleModel.findOneAndUpdate(
            {_id: req.params.id}, 
            {content},
            {new:true, upset:false});
        return res.status(200).json({ message: "Article modifié", article });
    } catch (error) {
        // TODO :implements error handling
        console.log(error);
        return res.status(400).json({ message:'Une erreur est survenue', erreur: error});
    }
}
async function deleteArticle(req, res){
    try{
        const content = req.body.content;
    
        // TODO : Delete to the topic in concerned article
        const article = await ArticleModel.findOneAndDelete({_id: req.params.id});
        return res.status(200).json({
             message: article == null 
             ? "Cet Article n'existe pas" 
             : "Article supprimé avec succes",
              article });
        }catch(err){
        // TODO :implements error handling
        console.log(err);
        return res
        .status(400)
        .json({ message:'Une erreur est survenue', erreur: err});
    }    
}


module.exports = {
    createNewArticle,
    getArticleById,
    getAllArticles,
    updateArticle,
    deleteArticle,
};
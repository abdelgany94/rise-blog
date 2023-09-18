const { CommentModel } = require("../models/comment.model");

async function createNewComment(req, res){
    try {
        // recuperer les donees de la requete afin de creer la comment
        const data = req.body;

        // TODO : verifier l'article est bien exixtant
        // TODO : verifier l'auteur est correct
        // TODO : recuper l'ID de l'auteur directement dans les cookies de la requete via l'aut mid
        const comment = await CommentModel.create(data);
        return res.status(201).json({ message: "Commentaire créé avec succes"})
    } catch (error) {
       // TODO : Implements error handling
       console.log(error);
       return res
       .status(400)
       .json({ message: "Une Erreur est survenue", erreur: error}); 
    }
}
async function getAllComments(req, res){
    try {
        const comments= await CommentModel.find();

        // TODO : populate author after writing authore data
        return res.status(200).json({ message: "Liste des commentaires disponible", comments});
      
    } catch (error) {
        // TODO :implements error handling
        console.log(error);
        return res.status(400).json({ message:'Une erreur est survenue', erreur: error});
    
    }
}
async function getCommentById(req, res){
    try {
        const comment= await CommentModel.findOne({_id: req.params.id});

        // TODO : populate author after writing authore data
        return res.status(200).json({ 
        message: comment== null 
        ? "Ce commentaire n'existe pas" 
        : "Commentaire recupere avec success",
        comment,
    });
      
    } catch (error) {
        // TODO :implements error handling
        console.log(error);
        return res.status(400).json({ message:'Une erreur est survenue', erreur: error});
    
    }
}
async function getCommentByAuthor(req, res){
    try {
        const comments= await CommentModel.findOne({author: req.params.id});

        // TODO : populate author after writing authore data
        return res.status(200).json({ message: "Commentaire recupere avec success !!!", comments});
      
    } catch (error) {
        // TODO :implements error handling
        console.log(error);
        return res.status(400).json({ message:'Une erreur est survenue', erreur: error});
    
    }
} 
async function updateComment(req, res){
    try {
        const content = req.body.content;
    
        // TODO : Add the landing link key in the req body when using the middlewarares
        const comment = await CommentModel.findOneAndUpdate(
            {_id: req.params.id}, 
            {content},
            {new:true, upset:false});
        return res.status(200).json({ message: "Commentaire modifié avec succes", comment });
    } catch (error) {
        // TODO :implements error handling
        console.log(error);
        return res.status(400).json({ message:'Une erreur est survenue', erreur: error});
    }
}
async function deleteComment(req,res){
    try{
        const content = req.body.content;
    
        // TODO : Delete to the topic in concerned article
        const comment = await CommentModel.findOneAndDelete({_id: req.params.id});
        return res.status(200).json({
             message: comment == null 
             ? "Ce Commentaire n'existe pas" 
             : "Commentaire supprimé avec succes",
             comment });
        }catch(err){
        // TODO :implements error handling
        console.log(err);
        return res
        .status(400)
        .json({ message:'Une erreur est survenue', erreur: err});
    }    
}

module.exports = {
    createNewComment,
    getAllComments,
    getCommentById,
    getCommentByAuthor,
    updateComment,
    deleteComment,
};
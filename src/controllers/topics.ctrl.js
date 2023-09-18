const { TopicModel } = require("../models/topic.model");
async function getAllTopics(req, res){
try {
    const topics = await TopicModel.find();
    return res.status(200).json({ message: "Liste des sujets disponible", topics });
  
} catch (error) {
    // TODO :implements error handling
    console.log(error);
    return res.status(400).json({ message:'Une erreur est survenue', erreur: error});

}
}
async function getTopicById(req, res){
    try {
        const topic = await TopicModel.findOne({_id: req.params.id});
        return res.status(200).json({ message: "Sujet récupéré avec succes", topic });
      
    } catch (error) {
        // TODO :implements error handling
        console.log(error);
        return res
        .status(400)
        .json({ message:'Une erreur est survenue', erreur: error});
    
    }
}

async function createNewTopic(req, res){
    try{
    const topicLabel = req.body.label;
    // const topicLanding = req.body.landingLink;

    // TODO upload landing image and add it link in the request data and create the TopicModel instance with it
    const topic = await TopicModel.create({label: topicLabel});
    return res.status(200).json({ message: "Sujet créé avec succes", topic });
    }catch(err){
    // TODO :implements error handling
    console.log(err);
    return res
    .status(400)
    .json({ message:'Une erreur est survenue', erreur: err});

    }
}
async function updateTopic(req, res){
    try{
        const data = req.body;
    
        // TODO : Add the landing link key in the req body when using the middlewarares
        const topic = await TopicModel.findOneAndUpdate({_id: req.params.id}, data, {new:true, upset:false});
        return res.status(200).json({ message: "Sujet modifié avec succes", topic });
        }catch(err){
        // TODO :implements error handling
        console.log(err);
        return res
        .status(400)
        .json({ message:'Une erreur est survenue', erreur: err});
    
        }
}
async function deleteTopic(req, res){
    try{
        const data = req.body;
    
        // TODO : Delete to the topic in concerned article
        const topic = await TopicModel.findOneAndDelete({_id: req.params.id});
        return res.status(200).json({ message:topic== null ? "Ce sujet n'existe pas" : "Sujet supprimé avec succes", topic });
        }catch(err){
        // TODO :implements error handling
        console.log(err);
        return res
        .status(400)
        .json({ message:'Une erreur est survenue', erreur: err});
    
        }
}


module.exports = { 
    getAllTopics,
    getTopicById,
    createNewTopic,
    updateTopic,
    deleteTopic,
};
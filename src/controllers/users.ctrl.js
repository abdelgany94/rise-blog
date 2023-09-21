const { UserModel } = require("../models/user.model");

async function createNewUser(req, res) {
  try {
    const data = req.body;

    const user = await UserModel.create(data);
    return res.status(200).json({ message: "Utilisateur créé", user });
  } catch (err) {
    // TODO :implements error handling
    console.log(err);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: err });
  }
}
async function getUserById(req, res) {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });

    // TODO : populate author after writing authore data
    return res.status(200).json({
      message:
        user == null
          ? "Cet utilisateur n'existe pas"
          : "Utilisateur recupere avec success",
      user,
    });
  } catch (error) {
    // TODO :implements error handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}
async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find();

    // TODO : populate author after writing authore data
    return res
      .status(200)
      .json({ message: "Liste des utilisateurs dispo", users });
  } catch (error) {
    // TODO :implements error handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}
async function updateUser(req, res) {
  try {
    const content = req.body.content;

    // TODO : Add the landing link key in the req body when using the middlewarares
    const user = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { content },
      { new: true, upset: false }
    );
    return res.status(200).json({ message: "Utilisateur modifié", user });
  } catch (error) {
    // TODO :implements error handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}
async function deleteUser(req, res) {
  try {
    const content = req.body.content;

    // TODO : Delete to the topic in concerned article
    const user = await UserModel.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message:
        user == null
          ? "Cet Utilisateur n'existe pas"
          : "l'Utlisateur a été supprimé",
      user,
    });
  } catch (err) {
    // TODO :implements error handling
    console.log(err);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: err });
  }
}

module.exports = {
  createNewUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};

## Elements de completion pour le devoir portant sur le CRUD - User
====

En gros le travail est bien et les principales toutes sont presentes.
Tu as donc bien compris le principe du copier-coller-modifier
Toutefois je constate qu'il y a certaines petites erreurs

- Tous les commentaires _TODO_ n'ont pas été ajoutés comme demandé


Nous verrons ensemble quelques petites erreurs commises par fonctions ecrites.<br>
Les remarques seront marquées avec les tags _ERROR_ et _FIXIT_
- `createUser`: la reponse retournée apres la creation d'un utilisateur
```javascript
async function createNewUser(req, res) {
  try {
    const data = req.body;

    const user = await UserModel.create(data); 
    //ERROR Quand on créé un utilisateur on ne renvoie pas son mot de passe dans la reponse
    //FIXIT retire le champ password dans les données de l'utilisateur 
    return res.status(200).json({ message: "Utilisateur créé", user });
  } catch (err) {
    // TODO :implements error handling
    console.log(err);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: err });
  }
}
```
- `getUserById`
```javascript 
async function getUserById(req, res) {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    // ERROR le _TODO_ en dessous n'a pas sa place ici, il faudrait le retirer car un utilisateut n'a pas d'auteur: c'est pas un article

    // ERROR Le statut de la reponse peut etre amelioré 404 si l'utilisateur si l'utilisateur n'existe pas et 200 si il est bien là

    // EXPLAIN: Dans les codes d'erreur 404 veut dire Not Found,  c'est à dire que la ressource demandée n'a pas eté trouvée sur le serveur voir [Ici pour la liste des codes HTTP](https://developer.mozilla.org/fr-FR/docs/Web/HTTP/Status)

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
```
- `getAllUser`: memes remarques que pour `getUserById`
- `updateUser`:  Je recommande de recommencer totalement ceci en tenant compte des modiffications que je suggere
```javascript
async function updateUser(req, res) {
  try {
    const content = req.body.content;
    // ERROR todo inaproprié

    // ERROR la clé content utilisée ici n'a pas sa place car elle n'a pas de signification dans le cas d'un utilisateur (plutot pour un commentaire)
    // Cette clé ne figure pas dans le UserModel
    // Qu'est ce que tu attends de ce controller ? Quelles sont les données que tu poposes de modifier via ce controller
    // Est ce que ton code serait à meme de mettre à jour ces champs ?

    // FIXIT arranger la reponse en tenant compte du fait qu'on puisse essayer de modifier les données d'un utilisateut qui n'existe pas, chose qui devrait etre revue.
    // Verifier si le controller a le fonctionnement attendu
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
```
- `deleteUser`: voir les suggestions faites sur `updateUser` et completer avec ce qui vient
```javascript
async function deleteUser(req, res) {
  try {
    const content = req.body.content;
    // ERROR todo non approprié les todos sont ecris en fonctionde ce qu'on aimerait faire comme action complementaire.
    //Il faudrait donc essayer de corriger cela en essayant de regarder ce que l'influence de la suppression d'un utilisateur pourrait causer dans le systeme.
    //Regarder par exemple si l'utilisateur est autheur, qu'adviendra t'il de ses articles, et que doit ont en faire, que doit on faire de ses commentaires, des articles qu'il a mis en favoris mais aussi des articles qu'il a eu à liker

    // FIXIT corriger le status en rajoutant le cas du 404
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
```

Je pense Que j'ai fait une synthese des elements qui m'ont principalement marqué dans ta realisation

Pour ce qui est de l'exercice poortant sur la realisation de la route qui renvoie les differents commentaires d'un autheur, elle en fonctionne pas parceque tu as deux fois la meme route: (j'ai mis des TODO en _HERE_ avec des numeros pour preciser les lignes importantes)
```javascript
const {
    getAllComments,
    getCommentById,
    createNewComment,
    updateComment,
    deleteComment,
    getCommentByAuthor,
} = require("../controllers/comments.ctrl");

const router = require('express').Router({ mergeParams: true });

router.get("/", getAllComments); // HERE 1
    router.get("/:id", getCommentById);

    router.post("/", createNewComment);
    router.patch("/:id", updateComment);
    router.delete("/:id", deleteComment);
    //EXO: ecrire la route pour obtenir la liste des commentaires d'un utilisateur
router.get("/:id", getCommentByAuthor); // HERE 2

module.exports = { CommentRouter: router };
```
Si tu regardes bien tu remarqueras que les deux routes ont exactement:
- la meme methode HTTP (GET)
- le meme path _"chemin d'acces"_ (`_/comments/:id_`)

Ce qui se passe c'est que le code est executé de façon sequentielle donc forcement quand la requette arrive il va commencer par la premiere route sera lue en premier (la route `getcommentById`)
pour corriger ça tu peux commencer par rendre les deux routes differentes en modifiant legerement le _path_ de ta route `getCommentById` en rajoutant pr exemple un segment ou mem en modifiant la variable que tu utilises pour cela.

Ensuite dans l'implementation de ton controller _`getCommentByAuthor`_ je dirais qu'à vu d'oeil c'est plutot bien ecrit, il  faudrait juste ameliorer tes reponses et les status en fonction des petits imprevus qui pourraient arriver lorsqu'une requette est emise, exemple est ce que l'ID pour l'auteur en question existe ou pas ?

>**NOTE** Plutard on va implementer des middleware et on aura certains avantages comme:
>- PLacer plusieurs _controllers_ sur la meme route et s'assurer qu'ils sont tous executés
>- S'assurer que les actions sont effectuées par des personnes qui sont en droit de le faire, par exemple empecher une personne de faire une publication en la signant par l'adresse d'une autre personne, s'assurer qu'on ne puisse pas modifier qui est l'auteur d'un commentaire, s'assurer qu'un utilisateur ne puisse pas avoir la listes des commentaires ecrits par un autre utilisateur
>- reduire les données demandée sur certaines routes pour les rendre un peu plus securitaires, on pourra par exemple sur la route `getCommentsByAuthor` ne pas preciser qui est l'auteur(via la variable du path), cette precision sera faite implicitement en se servant d'elements securisés qu'on pourra reccuperer via un middleware. 


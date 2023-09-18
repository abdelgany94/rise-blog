const {
    getAllComments,
    getCommentById,
    createNewComment,
    updateComment,
    deleteComment,
    getCommentByAuthor,
} = require("../controllers/comments.ctrl");

const router = require('express').Router({ mergeParams: true });

router.get("/", getAllComments);
router.get("/:id", getCommentById);

router.post("/", createNewComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);
//EXO: ecrire la route pour obtenir la liste des commentaires d'un utilisateur
router.get("/:id", getCommentByAuthor);

module.exports = { CommentRouter: router };
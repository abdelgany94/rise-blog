const {
    getAllArticles,
    getArticleById,
    createNewArticle,
    updateArticle,
    deleteArticle,
} = require("../controllers/articles.ctrl")

const router = require('express').Router({ mergeParams: true });

router.get("/", getAllArticles);
router.get("/:id", getArticleById);

router.post("/", createNewArticle);
router.patch("/:id", updateArticle);
router.delete("/:id", deleteArticle);

module.exports = { ArticleRouter: router };
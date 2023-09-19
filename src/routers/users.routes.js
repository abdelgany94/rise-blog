const {
    createNewUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
} = require("../controllers/users.ctrl");

const router = require('express').Router({mergeParams:true});

router.post('/', createNewUser)
router.get("/:id",getUserById )
router.get("/", getAllUsers)
router.patch("/:id",updateUser)
router.delete("/:id",deleteUser)

module.exports = { UserRouter: router };
import express from "express"
import { getUsers, updateUser, deleteUser } from "./../controllers/users"
import isAuth from "./../middleware/auth"
const router = express.Router()

router.get("/", isAuth, getUsers)
router.put("/:id", isAuth, updateUser)
router.delete("/:id", isAuth, deleteUser)

export default router
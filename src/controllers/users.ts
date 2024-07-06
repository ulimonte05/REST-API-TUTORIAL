import { Request, Response } from 'express';
import User from './../models/users';

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err: any) {
        res.status(500).json({message: "Internal server error"})
    }
}

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { email, username } = req.body

    try {
        const user = await User.findByIdAndUpdate(id, {email, username})
        res.status(200).json({message: "User updated successfully"})
    } catch (err: any) {
        res.status(500).json({message: "Internal server error"})
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({message: "User deleted successfully"})
    } catch (err: any) {
        res.status(500).json({message: "Internal server error"})
    }
}

export { getUsers, updateUser, deleteUser }
import User from "./../models/users"
import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const register = async (req: Request, res: Response) => {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
        return res.status(400).json({ message: "Please provide all fields" })
    }

    try {
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({email: email, password: hashedPassword, username: username})
        await newUser.save()

        const token = jwt.sign({email,username}, process.env.JWT_SECRET, {expiresIn: "1h"})
        
        res.cookie("token", token, {httpOnly: true})
        res.status(201).json({message: "User created successfully"})
    } catch (err: any) {
        res.status(500).json({message: "Internal server error"})
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all fields" })
    }

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({email,username: user.username}, process.env.JWT_SECRET, {expiresIn: "1h"})

        res.cookie("token", token, {httpOnly: true})
        res.status(200).json({message: "User logged in successfully"})
    } catch (err: any) {
        res.status(500).json({message: "Internal server error"})
    }
}

const logout = (req: Request, res: Response) => {
    res.clearCookie("token")
    res.status(200).json({message: "User logged out successfully"})
}

export { register, login, logout }
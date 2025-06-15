import { RequestHandler } from "express";
import { userServices } from "./user.services";
import { userModel } from "./user.model";
import jwt from 'jsonwebtoken';
import { TUser } from "./user.interface";
const createUser: RequestHandler = async (req, res) => {
    try {
        const userData = req.body
        const existingUser = await userModel.findOne({ email: userData.email });

        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "Email already used",
            });
        }
        else {
            const result = await userServices.createUserIntoDB(userData);
            res.status(200).json({
                success: true,
                message: "User created successfully",
                data: result,
            });
        }
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: (error as Error).message,
        });
    }
};

const loginUser: RequestHandler = async (req, res) => {
    try {
        const userData: Partial<TUser> = req.body;

        const result = await userModel.find({ email: userData.email });
        console.log(result)
        if (result.length > 0) {
            const user = result[0]
            if (user.password === userData.password) {
                const token = jwt.sign(
                    { name: user.name, image: user.image, email: user.email },
                    "abcfeakljdfkl12@",
                    { expiresIn: '7h' }
                );
                res.status(200).json({
                    message: 'Login successful',
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        image: user.image
                    }
                });
            }
            else {
                res.status(401).json({ message: 'Invalid email or password' });
            }

        } else {

            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {

        res.status(500).json({ message: 'Internal server error', error });
    }
};


const googleLogin: RequestHandler = async (req, res) => {
    try {
        const userData = req.body
        const user = await userModel.findOne({ email: userData.email })
        let id: any = user?._id
        if (!user) {
            const insetData = await userModel.create(userData)
            id = insetData._id
        }
        const token = jwt.sign(
            { name: userData.name, image: userData.image, email: userData.email },
            "abcfeakljdfkl12@",
            { expiresIn: '7h' }
        );
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: id,
                name: userData.name,
                email: userData.email,
                image: userData.image
            }
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Enternal server err', error: err });
    }
}
export const userController = {
    createUser, loginUser, googleLogin
}

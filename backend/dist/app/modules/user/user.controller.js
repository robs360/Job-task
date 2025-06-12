"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_services_1 = require("./user.services");
const user_model_1 = require("./user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const existingUser = yield user_model_1.userModel.findOne({ email: userData.email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "Email already used",
            });
        }
        else {
            const result = yield user_services_1.userServices.createUserIntoDB(userData);
            res.status(200).json({
                success: true,
                message: "User created successfully",
                data: result,
            });
        }
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message,
        });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = yield user_model_1.userModel.find({ email: userData.email });
        if (result.length > 0) {
            const user = result[0];
            if (user.password === userData.password) {
                const token = jsonwebtoken_1.default.sign({ name: user.name, image: user.image, email: user.email }, "abcfeakljdfkl12@", { expiresIn: '7h' });
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
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});
exports.userController = {
    createUser, loginUser
};

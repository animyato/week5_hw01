import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const createUser = async (req, res) => {
    try{
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
        const newUser = new userModel({
            ...req.body,
            password: hashedPassword,
            admin: false
        });
        await newUser.save();
        res.status(201).send('New user is created');
    }catch (error){
        res.status(409).send(error);
    }
}

export const loginUser = async (req, res) => {
    try{
        const user = await userModel.findOne({ email: req.body.email });
        if(!user) {
            return res.status(404).send('User not found');
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.status(400).send('Invalid password');
        }
        const token = jwt.sign({ _id: user._id, admin: user.admin }, process.env.JWT_SECRET);
        return res
            .cookie('session_token', token, {
                httpOnly: true,
                secure: false
            })
            .status(201)
            .send('User is logged in');
    }catch (error){
        res.status(409).send(error);
    }
}

export const logoutUser = async (req, res) => {
    try{
        res.clearCookie('session_token');
        res.status(200).send('Admin rights changed and logged out');
    }catch (error){
        res.status(409).send(error);
    }
}
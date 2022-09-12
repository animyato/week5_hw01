import userModel from "../models/userModel.js";

export const getUsers = async (req, res) => {
    try{
        const userList = await userModel.find({});
        res.status(200).send(userList);
    }catch (error){
        res.status(404).send(error);
    }
}

export const updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        const updatedUser = await userModel.findByIdAndUpdate(id, 
            { 
                ...req.body,
                admin: false
            }
        , { new: true });
        res.status(200).send(updatedUser);
    }catch (error){
        res.status(409).send(error);
    }
}

export const changeAdminRights = async (req, res, next) => {
    try{
        const { id } = req.params;
        const updatedUser = await userModel.findByIdAndUpdate(id, {admin: false}, { new: true });
        next();
    }catch (error){
        res.status(409).send(error);
    }
}

export const deleteUserById = async (req, res) => {
    try{
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).send('User is deleted');
    }catch (error){
        res.status(409).send(error);
    }
}

export const deleteAllUsers = async (req, res) => {
    try{
        await userModel.deleteMany({});
        res.status(200).send('All users are deleted');
    }catch (error){
        res.status(409).send(error);
    }
}

export const getUserById = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await userModel.findById(id);
        res.status(200).send(user);
    }catch (error){
        res.status(409).send(error);
    }
}

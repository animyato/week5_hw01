import express from 'express';
import { deleteUserById, deleteAllUsers , getUserById, getUsers, updateUser, changeAdminRights} from "../controllers/userController.js";
import { verifySessionTokenAdmin, verifySessionTokenUser } from '../authCheck/authCheck.js';
import { logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/get',verifySessionTokenAdmin, getUsers);

router.get('/:id', verifySessionTokenAdmin, getUserById);

router.get('/delete', verifySessionTokenAdmin, deleteUserById);

router.get('/deleteAll', verifySessionTokenAdmin, deleteAllUsers);

router.put('/update/:id',verifySessionTokenUser, updateUser);

router.put('/changeRights/:id', verifySessionTokenAdmin, changeAdminRights, logoutUser);

export default router;
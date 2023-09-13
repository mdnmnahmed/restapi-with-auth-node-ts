import express from 'express';
import { signupUser } from '../controllers/authController';


export default (router: express.Router) => {
    router.post('/auth/signup', signupUser);
}
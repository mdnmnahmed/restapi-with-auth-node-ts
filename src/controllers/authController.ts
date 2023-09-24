import express from 'express';
import { createUser, getUserByEmail } from '../models/userModel';
import { authenticationPassword, randomString } from '../helpers/authHelper';

export const signupUser = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: "Please enter required data." });
        }

        const isExistingUser = await getUserByEmail(email);
        if (isExistingUser) {
            return res.status(400).json({ message: "User already exists, please login with credentials." });
        }

        const salt = randomString();
        const newUser = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authenticationPassword(salt, password)
            }
        });

        return res.status(201).json({ message: 'Signup success', data: newUser }).end();
    } catch (error) {
        console.log("error: ", error);
        return res.sendStatus(400);
    }
}
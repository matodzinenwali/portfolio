import * as authService from "../services/authService.js";

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.status(200).json({ message: "log in successful", token });
    } catch (err) {
        next(err);
    }
}
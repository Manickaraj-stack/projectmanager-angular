import { Request, Response } from 'express';
import { USERS } from "./data";

export function getAllUsers(req: Request, res: Response) {
    res.status(200).json(USERS.users);
}
import { Request, Response } from 'express';
import { TASKS } from "./data";

export function getAllTasks(req: Request, res: Response) {
    setTimeout(() => {
        res.status(200).json(TASKS.tasks)
    })
}
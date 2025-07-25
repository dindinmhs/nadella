import { Request, Response } from 'express';
import { S3Client } from '../utils/s3Client';
import multer from 'multer';
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

export class FileController {
    static async uploadFile(req: Request, res: Response) {
        try {
            const file = req.file;
            const description = req.body.description;

            if (!file) {
                return res.status(400).send('No file uploaded.');
            }

            const s3Client = new S3Client();
            const uploadResult = await s3Client.uploadFile(file);

            const newFile = await prisma.file.create({
                data: {
                    name: uploadResult.Key,
                    description: description,
                    url: uploadResult.Location,
                },
            });

            res.redirect('/');
        } catch (error : any) {
            res.status(500).send('Error uploading file: ' + error.message);
        }
    }

    static async getFile(req: Request, res: Response) {
        try {
            const files = await prisma.file.findMany();
            res.status(200).json(files);
        } catch (error : any) {
            res.status(500).send('Error retrieving files: ' + error.message);
        }
    }
}
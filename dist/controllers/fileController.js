"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const s3Client_1 = require("../utils/s3Client");
const multer_1 = __importDefault(require("multer"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
class FileController {
    static async uploadFile(req, res) {
        try {
            const file = req.file;
            const description = req.body.description;
            if (!file) {
                return res.status(400).send('No file uploaded.');
            }
            const s3Client = new s3Client_1.S3Client();
            const uploadResult = await s3Client.uploadFile(file);
            const newFile = await prisma.file.create({
                data: {
                    name: uploadResult.Key,
                    description: description,
                    url: uploadResult.Location,
                },
            });
            res.redirect('/');
        }
        catch (error) {
            res.status(500).send('Error uploading file: ' + error.message);
        }
    }
    static async getFile(req, res) {
        try {
            const files = await prisma.file.findMany();
            res.status(200).json(files);
        }
        catch (error) {
            res.status(500).send('Error retrieving files: ' + error.message);
        }
    }
}
exports.FileController = FileController;

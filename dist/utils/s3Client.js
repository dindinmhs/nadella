"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Client = void 0;
// s3Client.ts
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class S3Client {
    constructor() {
        this.s3 = new aws_sdk_1.default.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
        this.bucketName = process.env.AWS_BUCKET_NAME || 'nadella';
    }
    async uploadFile(file) {
        const params = {
            Bucket: this.bucketName,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        return this.s3.upload(params).promise();
    }
    async getFile(key) {
        const params = {
            Bucket: this.bucketName,
            Key: key,
        };
        return this.s3.getObject(params).promise();
    }
}
exports.S3Client = S3Client;

// s3Client.ts
import AWS from 'aws-sdk';

export class S3Client {
    private s3: AWS.S3;
    private bucketName: string;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
        this.bucketName = process.env.AWS_BUCKET_NAME || 'nadella';
    }

    async uploadFile(file: Express.Multer.File) {
        const params = {
            Bucket: this.bucketName,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        return this.s3.upload(params).promise();
    }

    async getFile(key: string) {
        const params = {
            Bucket: this.bucketName,
            Key: key,
        };

        return this.s3.getObject(params).promise();
    }
}
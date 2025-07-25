# Nadella Web App

This project is a simple web application that allows users to upload and view files. The application is built using Express.js and utilizes Amazon S3 for file storage and Amazon RDS for database management. The user interface is rendered using EJS template engine.

## Features

- File upload functionality
- View uploaded files
- Integration with Amazon S3 for file storage
- Database management using Amazon RDS
- Simple and intuitive user interface

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: Amazon RDS (PostgreSQL/MySQL)
- **File Storage**: Amazon S3
- **ORM**: Prisma
- **Template Engine**: EJS

## Getting Started

### Prerequisites

- Node.js and npm installed
- AWS account with S3 and RDS set up
- PostgreSQL or MySQL database created in RDS

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nadella-web-app.git
   cd nadella-web-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   DATABASE_URL=your_database_connection_string
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   S3_BUCKET_NAME=your_s3_bucket_name
   ```

4. Set up the database schema using Prisma:
   ```
   npx prisma migrate dev --name init
   ```

### Running the Application

To start the application, run:
```
npm start
```

The application will be available at `http://localhost:3000`.

### Usage

- Navigate to the home page to upload files.
- Uploaded files will be displayed on the same page.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
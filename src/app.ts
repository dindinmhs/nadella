import express from 'express';
import fileRoutes from './routes/fileRoutes';
import bodyParser from 'body-parser';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = 3000;

const prisma = new PrismaClient();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/files', fileRoutes);

// Home route
app.get('/', async (req, res) => {
  // Ambil data file dari database jika pakai Prisma, contoh:
  const files = await prisma.file.findMany();

  res.render('index', { files }); // <-- ini penting
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
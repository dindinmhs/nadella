"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const PORT = 3000;
const prisma = new client_1.PrismaClient();
// Middleware
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
// Routes
app.use('/files', fileRoutes_1.default);
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

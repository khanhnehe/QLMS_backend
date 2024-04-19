require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const initWebRouters = require("./router/web"); // Import router của backend

const app = express();

app.use(cors({
    origin: "http://localhost:3004",
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Khi sử dụng tiền tố '/api', chuyển các request đến router của backend
app.use('/api', initWebRouters(app));
// Trả về 404 cho các request không được hỗ trợ
app.use((req, res) => {
    res.status(404).send('404 not found');
});

const port = process.env.PORT || 8001;

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // Nếu kết nối thành công, lắng nghe các request trên cổng được chỉ định
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        // Nếu kết nối thất bại, hiển thị lỗi
        console.error('Failed to connect to MongoDB:', err);
    });

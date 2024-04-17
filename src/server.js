require("dotenv").config(); // cái này giúp we chạy dòng này process.env.PORT
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")


import initWebRouters from "./router/web";
//token


//
const app = express();

// Middleware
// app.use(cors({ origin: true }));

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// app.use(express.json());
// Thêm giới hạn dung lượng cho xử lý dữ liệu JSON
app.use(express.json({ limit: '50mb' }));

// Thêm giới hạn dung lượng cho xử lý dữ liệu urlencoded
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// xử lý dữ liệu được gửi dưới dạng x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//test jwt

// Serve static files from the 'uploads' directory
// app.use('/uploads', express.static('C:/nam4/nkPOP/backend_nkpop/src/uploads'));



//we đã khai báo cho thằng express bt 
initWebRouters(app);
// app.use(errorMiddleware);

app.use((req, res) => {
    return res.send('404 not found')
})

//bắt buộc có để app chạy, như vậy ta sẽ lấy cái tham số có tên là port ở trong file env
const port = process.env.PORT || 6969;
// Kết nối đến MongoDB
// ...
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });

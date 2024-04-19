require("dotenv").config(); // cái này giúp we chạy dòng này process.env.PORT
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")


import initWebRouters from "./router/web";
//token


//
const app = express();

app.use(
    cors({
        origin: "http://localhost:3002",
        credentials: true,
    })
);

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.urlencoded({ extended: false }));

initWebRouters(app);

app.use((req, res) => {
    return res.send('404 not found')
})

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });

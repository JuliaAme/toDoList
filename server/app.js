require('dotenv').config();
const express = require('express');
const app = express();
const removeHeaders = require('./middleware/removeHeaders');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


// const PORT = 3000;
const { PORT } = process.env;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))
app.use(removeHeaders);
app.use(cookieParser());


const indexRouter = require('./routes/index.routes');

app.use('/api', indexRouter);

// http://localhost:5173/auth/authorization




app.listen(PORT, () => {
    console.log(`Server at ${PORT} port`);
})
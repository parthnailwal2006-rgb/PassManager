const express = require('express');
const {notFound,errorHandler}=require('./middleware/errormiddleware')
const connectDB = require('./DB');
const helmet=require('helmet');
const cors=require('cors');
const app = express()
const dotenv=require('dotenv')
dotenv.config();
const port = process.env.PORT
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }));
connectDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth/register', require('./routes/RegisterRoute'));
app.use('/api/auth/login', require('./routes/LoginRoute'));
app.use('/api/create', require('./routes/CreatepassRoute'));
app.use('/api/titles',require('./routes/ViewTitleRoute') );
app.use('/api/pass',require('./routes/ViewPassroute') );
app.use('/api/update',require('./routes/updatepassRoute') );
app.use('/api/delete',require('./routes/DeletepassRoute') );
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
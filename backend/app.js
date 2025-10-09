require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const app = express();

const couriersRouter = require('./routes/couriers');
const connectDB = require('./db/connect');

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// ✅ Enable CORS
app.use(cors({
  origin: '*', // allow all origins
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

// middleware
app.use(express.json());

// routes
app.use('/api/v1/couriers', couriersRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI_COURIERS);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

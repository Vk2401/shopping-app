import express from 'express';
import cors from 'cors';
import pool from './db/dbconfig.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);


const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the MySQL database!');
        connection.release();
    } catch (err) {
        console.error('Database connection failed:', err);
    }
};

const PORT =  30001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    testConnection();
});
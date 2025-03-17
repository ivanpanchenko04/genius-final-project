import mongoose from 'mongoose';
import { DB_PASSWORD } from './secret.js';

const URI = `mongodb+srv://greenloki:${DB_PASSWORD}@cluster0.bridz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
    .connect(URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((e) => {
        console.error(e);
    });

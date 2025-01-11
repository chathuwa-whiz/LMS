import request from 'supertest';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import connectDB from '../config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app.js';

dotenv.config();

// set timeout to allow for database connection
jest.setTimeout(10000);

let token;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';  // set the environment to test
    await connectDB();  // connect to the database

    const user = new User({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@gmail.com',
        password: '11111',
        role: 'admin',
        dateOfBirth: '1990-01-01',
    });
    await user.save();

    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();  // clear the database before each test
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    // await new Promise(resolve => setTimeout(resolve, 5000));  // wait for 5 seconds
    await mongoose.connection.close();
});

describe('User CRUD Test', () => {

    describe('POST /api/auth/getAllUsers', () => {

        it('should return all users', async () => {
            const response = await request(app)
                .get('/api/users/')
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });

        it('should return authentication error', async () => {
            const response = await request(app).get('/api/users/');
            expect(response.statusCode).toBe(401);
        });

    });

    describe('POST /api/auth/getUserById', () => {

        it('should return a user by id', async () => {
            const new_user = new User({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@gmail.com',
                password: '11111',
                role: 'admin',
                dateOfBirth: '1990-01-01',
            });
            await new_user.save();

            const user = await User.findOne({ email: 'john@gmail.com' });
            const response = await request(app)
                .get(`/api/users/${user._id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });
       
    });

    // describe('POST /api/auth/updateUser', () => {});

    // describe('POST /api/auth/deleteUser', () => {});

})
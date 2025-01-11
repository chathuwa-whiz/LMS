import request from 'supertest';
import User from '../model/User.js';
import connectDB from '../config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app.js';

dotenv.config();

// set timeout to allow for database connection
jest.setTimeout(10000);

beforeAll(async () => {
    process.env.NODE_ENV = 'test';  // set the environment to test
    await connectDB();  // connect to the database
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();  // clear the database before each test
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    // await new Promise(resolve => setTimeout(resolve, 5000));  // wait for 5 seconds
    await mongoose.connection.close();
});

describe('User Auth Test', () => {

    describe('POST /api/auth/register', () => {

        it('should register a new user', async () => {
            const response = await request(app).post('/api/auth/register').send({
                firstName: 'John', 
                lastName: 'Doe', 
                email: 'john@gmail.com', 
                password: '11111', 
                role: 'admin', 
                dateOfBirth: '1990-01-01',
            });
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('token');
        });

        it('should not register a user with missing fields', async () => {
            const response = await request(app).post('/api/auth/register').send({
                firstName: 'John', 
                lastName: 'Doe', 
            });
            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty('error');
        });

        it('should not register a user with invalid email', async () => {
            const response = await request(app).post('/api/auth/register').send({
                firstName: 'John', 
                lastName: 'Doe', 
                email: 'john', 
                password: '11111', 
                role: 'admin', 
                dateOfBirth: '1990-01-01' 
            });
            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty('error');
        });

        it('should not register a user with invalid date of birth', async () => {
            const response = await request(app).post('/api/auth/register').send({
                firstName: 'John', 
                lastName: 'Doe', 
                email: 'john@gmail.com',
                password: '11111',
                role: 'admin',
                dateOfBirth: '1990/01/01',
            });
            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty('error');
        });

        it('should not register a user with a duplicate email', async () => {
            const new_user = new User({
                firstName: 'John', 
                lastName: 'Doe', 
                email: 'test@gmail.com',
                password: '11111',
                role: 'admin',
                dateOfBirth: '1990-01-01',
            });
            await new_user.save();

            const response = await request(app).post('/api/auth/register').send({
                firstName: 'Jane', 
                lastName: 'Doe', 
                email: 'test@gmail.com',
                password: '11111',
                role: 'admin',
                dateOfBirth: '1990-01-01',
            });

            expect(response.statusCode).toBe(400);
        });
            
    }),

    describe('POST /api/auth/login', () => {

        it('should login a user', async () => {
            const new_user = new User({
                firstName: 'John', 
                lastName: 'Doe', 
                email: 'john@gmail.com',
                password: '11111',
                role: 'admin',
                dateOfBirth: '1990-01-01',
            });
            await new_user.save();

            const response = await request(app).post('/api/auth/login').send({
                email: 'john@gmail.com',
                password: '11111',
            });

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('token');
        });

        it('should not login a user with invalid email', async () => {
            const new_user = new User({
                firstName: 'John', 
                lastName: 'Doe', 
                email: 'john@gmail.com',
                password: '11111',
                role: 'admin',
                dateOfBirth: '1990-01-01',
            });
            await new_user.save();

            const response = await request(app).post('/api/auth/login').send({
                email: 'wrongmail@gmail.com',
                password: '11111',
            });

            expect(response.statusCode).toBe(400);
        });

        it('should not login a user with invalid password', async () => {
            const new_user = new User({
                firstName: 'John', 
                lastName: 'Doe', 
                email: 'john@gmail.com',
                password: '11111',
                role: 'admin',
                dateOfBirth: '1990-01-01',
            });
            await new_user.save();

            const response = await request(app).post('/api/auth/login').send({
                email: 'john@gmail.com',
                password: '00000',
            });

            expect(response.statusCode).toBe(400);
        });

    })
})
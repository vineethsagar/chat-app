import request from 'supertest';
import app from '../../server';
import User from '../../Models/User.js';

describe('Auth Controller', () => {
    // Create a user for testing
    let authToken;

    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash('testpassword', 10);
        const user = new User({ username: 'testuser', password: hashedPassword, isAdmin: false });
        await user.save();

        // Login to get an authentication token
        const response = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });

        authToken = response.body.token;
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    it('should allow creating a new user', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({ username: 'newuser', password: 'newpassword', isAdmin: false });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    it('should allow getting user details', async () => {
        const response = await request(app)
            .get('/auth/user/testuser')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.user.username).toBe('testuser');
    });

    it('should allow updating an existing user', async () => {
        const response = await request(app)
            .put('/auth/user/testuser')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ password: 'newpassword', isAdmin: true });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User updated successfully');
    });

    it('should allow deleting an existing user', async () => {
        const response = await request(app)
            .delete('/auth/user/newuser')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');
    });

    it('should allow a user to login', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeTruthy();
    });

    it('should reject login with invalid credentials', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'invalidpassword' });

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Invalid password');
    });

    // Add more authentication test cases (e.g., logout) if needed
});

// controllers/userController.js
const userService = require('../services/userService');

// Helper function for sending error responses
const sendErrorResponse = (res, statusCode, message, error) => {
    // For debugging, you might want to log the full error object:
    console.error(`Error ${statusCode}: ${message}`, error);
    res.status(statusCode).json({ message });
};

// Get all users
exports.getAllUsers = async (req, res) => {
    console.log('--- Request received for getAllUsers ---');
    console.log('Raw req.query:', req.query); // Shows all query parameters received

    try {
        const { sort, limit, ...filters } = req.query;
        const options = {};
        if (sort) options.sort = sort;
        if (limit) {
            const parsedLimit = parseInt(limit, 10);
            if (!isNaN(parsedLimit) && parsedLimit > 0) { // Ensure limit is a positive number
                options.limit = parsedLimit;
            } else {
                console.warn('Invalid limit provided, ignoring:', limit);
            }
        }

        console.log('Calling userService.findAllUsers with filters:', filters, 'and options:', options);
        const users = await userService.findAllUsers(filters, options);
        res.json(users);
    } catch (err) {
        sendErrorResponse(res, 500, 'Failed to retrieve users', err);
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    console.log('--- Request received for createUser ---');
    console.log('Request Body:', req.body);

    const { name, email, age, address, phone } = req.body;

    // Basic required field validation
    if (!name || !email || !age || !address || !phone) {
        return sendErrorResponse(res, 400, 'Name, email, age, address, and phone are required.');
    }

    try {
        const newUser = await userService.createUser({ name, email, age, address, phone });
        res.status(201).json(newUser);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return sendErrorResponse(res, 409, 'Email already exists');
        }
        // Catch Mongoose validation errors or other common errors
        if (err.name === 'ValidationError') {
            return sendErrorResponse(res, 400, err.message, err);
        }
        sendErrorResponse(res, 400, 'Failed to create user', err);
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    console.log('--- Request received for getUserById ---');
    console.log('User ID:', req.params.id);

    try {
        const user = await userService.findUserById(req.params.id);
        if (!user) {
            return sendErrorResponse(res, 404, 'User not found');
        }
        res.json(user);
    } catch (err) {
        // Handle invalid ID format (e.g., not a valid MongoDB ObjectId)
        if (err.name === 'CastError') {
            return sendErrorResponse(res, 400, 'Invalid user ID format', err);
        }
        sendErrorResponse(res, 500, 'Failed to retrieve user', err);
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    console.log('--- Request received for updateUser ---');
    console.log('User ID:', req.params.id);
    console.log('Request Body:', req.body);

    const { id } = req.params;
    const updateData = req.body; // Allow partial updates

    // Basic check if any data is provided for update
    if (Object.keys(updateData).length === 0) {
        return sendErrorResponse(res, 400, 'No update data provided.');
    }

    try {
        const updatedUser = await userService.updateUserById(id, updateData);
        if (!updatedUser) {
            return sendErrorResponse(res, 404, 'User not found');
        }
        res.json(updatedUser);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return sendErrorResponse(res, 409, 'Email already exists');
        }
        if (err.name === 'ValidationError') {
            return sendErrorResponse(res, 400, err.message, err);
        }
        if (err.name === 'CastError') {
            return sendErrorResponse(res, 400, 'Invalid user ID format', err);
        }
        sendErrorResponse(res, 400, 'Failed to update user', err);
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    console.log('--- Request received for deleteUser ---');
    console.log('User ID:', req.params.id);

    try {
        const deletedUser = await userService.deleteUserById(req.params.id);
        if (!deletedUser) {
            return sendErrorResponse(res, 404, 'User not found');
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return sendErrorResponse(res, 400, 'Invalid user ID format', err);
        }
        sendErrorResponse(res, 500, 'Failed to delete user', err);
    }
};
// services/userService.js
const User = require('../models/User');

exports.findAllUsers = async (filters = {}, options = {}) => {
    const query = {};

    console.log('findAllUsers called with filters:', filters, 'options:', options);

    for (const key in filters) {
        const match = key.match(/^(.+?)\[(gte|gt|lte|lt|ne)\]$/);
        if (match) {
            const field = match[1];
            const op = match[2];
            if (!query[field]) { // Initialize the field as an object if it doesn't exist
                query[field] = {};
            }
            // Always cast to Number for known numeric fields (like age)
            // For other fields, keep them as is (string for date ranges, etc.)
            if (["age"].includes(field)) {
                query[field]['$' + op] = Number(filters[key]);
            } else {
                query[field]['$' + op] = filters[key];
            }
        } else {
            // Apply regex for string fields like name, email, address (case-insensitive)
            if (["name", "email", "address"].includes(key)) {
                query[key] = { $regex: filters[key], $options: "i" };
            } else if (key === "phone") {
                // For phone, consider an exact match unless a regex search is explicitly desired
                query[key] = filters[key];
            } else if (["age"].includes(key)) {
                // Direct equality filter for numeric fields like age
                query[key] = Number(filters[key]);
            } else {
                // For any other direct filters
                query[key] = filters[key];
            }
        }
    }

    // Debug: log the final MongoDB query object
    console.log('MongoDB Query object being built:', JSON.stringify(query, null, 2));

    let dbQuery = User.find(query);

    // Validate and apply sort
    if (options.sort) {
        // Mongoose sort expects "field:direction" like "name:asc" or "age:desc"
        // or an object like { name: 1, age: -1 }
        // Your current `options.sort` comes directly from the URL, e.g., "name:asc"
        // Mongoose handles this string format directly.
        dbQuery = dbQuery.sort(options.sort);
        console.log('Applying sort option:', options.sort);
    }

    // Apply limit
    if (options.limit && !isNaN(options.limit) && options.limit > 0) {
        dbQuery = dbQuery.limit(options.limit);
        console.log('Applying limit option:', options.limit);
    }

    console.log('Executing Mongoose query...');
    return await dbQuery;
};


exports.createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

exports.findUserById = async (id) => {
    return await User.findById(id);
};

exports.updateUserById = async (id, userData) => {
    // new: true returns the updated document
    // runValidators: true runs schema validators on the update operation
    return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
};

exports.deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};
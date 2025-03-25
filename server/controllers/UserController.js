const User = require("../models/User");
const bcrypt = require("bcrypt");
const e = require("../utils/error");

module.exports = {
    signout: (req, res, next) => {
        try {
            res
                .clearCookie('access_token')
                .status(200)
                .json('User has been signed out');
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        if (req.body.password) {
            if (req.body.password.length < 6) {
                return next(e.errorHandler(400, 'Password must be at least 6 characters'));
            }
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                {
                    $set: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        profilePicture: req.body.profilePicture,
                        password: req.body.password,
                        phoneNumber: req.body.phoneNumber,
                        role: req.body.role
                    },
                },
                { new: true }
            );
            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await User.findByIdAndDelete(req.params.userId);
            res.status(200).json('User has been deleted');
        } catch (error) {
            next(error);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const startIndex = parseInt(req.query.startIndex) || 0;
            const limit = parseInt(req.query.limit) || 9;
            const sortDirection = req.query.sort === 'asc' ? 1 : -1;

            const users = await User.find()
                .sort({ createdAt: sortDirection })
                .skip(startIndex)
                .limit(limit);

            const usersWithoutPassword = users.map((user) => {
                const { password, ...rest } = user._doc;
                return rest;
            });

            const totalUsers = await User.countDocuments();

            const now = new Date();
            const oneMonthAgo = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate()
            );
            const lastMonthUsers = await User.countDocuments({
                createdAt: { $gte: oneMonthAgo },
            });

            res.status(200).json({
                users: usersWithoutPassword,
                totalUsers,
                lastMonthUsers,
            });
        } catch (error) {
            next(error);
        }
    },

    updateAdminRole: async (req, res, next) => {
        const { userId } = req.params;
        const { isAdmin } = req.body;

        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { isAdmin },
                { new: true }
            );
            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
    },
};
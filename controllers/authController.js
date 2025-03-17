import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const register = async (req, res) => {
    try {
        const { username, email, password: pass, role, photo } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);
        const user = await User.create({
            username,
            email,
            password: hash,
            role,
        });
        const { password, ...userData } = user._doc;
        res.status(201).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password: pass } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isValid = await bcrypt.compare(pass, user.password);
        if (!isValid) {
            return res
                .status(404)
                .json({ message: 'Invalid email or password' });
        }
        const { password, ...userData } = user._doc;
        res.status(201).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// app.put('/user/:id', upload.single('demo_image'), async (req, res) => {
//     try {
//         const doc = await User.findByIdAndUpdate(req.params.id, {
//             photo: req.file.filename,
//         });
//         return res.status(200).json(doc);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: err.message });
//     }
// });

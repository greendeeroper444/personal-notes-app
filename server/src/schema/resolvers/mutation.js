const bcrypt = require('bcryptjs');
const { User, Note } = require('../../models');
const { generateToken } = require('../../utils/jwt');
const { AuthenticationError, UserInputError } = require('apollo-server-express');

const mutationResolvers = {
    //auth mutations
    register: async (_, { username, email, password }) => {
        try {
            
        //check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            throw new UserInputError('User with this email or username already exists');
        }
        
        //hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        //create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        
        await newUser.save();
        
        //generate token
        const token = generateToken(newUser);
        
        return {
            token,
            user: newUser,
        };
        } catch (error) {
            if (error.code === 11000) {
                throw new UserInputError('User with this email or username already exists');
            }
            throw error;
        }
    },
    
    login: async (_, { email, password }) => {
        //find user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new AuthenticationError('Invalid email or password');
        }
        
        //check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new AuthenticationError('Invalid email or password');
        }
        
        //generate token
        const token = generateToken(user);
        
        return {
            token,
            user,
        };
    },
    
    //note mutations
    createNote: async (_, { title, content }, { user }) => {
        if (!user) {
            throw new AuthenticationError('You must be logged in');
        }
        
        const newNote = new Note({
            title,
            content,
            author: user.id,
        });
        
        await newNote.save();
        return await Note.findById(newNote._id).populate('author');
    },
    
    updateNote: async (_, { id, title, content }, { user }) => {
        if (!user) {
            throw new AuthenticationError('You must be logged in');
        }
        
        const note = await Note.findById(id);
        if (!note) {
            throw new Error('Note not found');
        }
        
        if (note.author.toString() !== user.id) {
            throw new AuthenticationError('You can only update your own notes');
        }
        
        //update note
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('author');
        
        return updatedNote;
    },
    
    deleteNote: async (_, { id }, { user }) => {
        if (!user) {
            throw new AuthenticationError('You must be logged in');
        }
        
        const note = await Note.findById(id);
        if (!note) {
            throw new Error('Note not found');
        }
        
        if (note.author.toString() !== user.id) {
            throw new AuthenticationError('You can only delete your own notes');
        }
        
        await Note.findByIdAndDelete(id);
        return true;
    },
};

module.exports = mutationResolvers;
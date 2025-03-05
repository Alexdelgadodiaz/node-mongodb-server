const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'], // roles posibles
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  profile: {
    bio: { type: String },
    avatar: { type: String }, // URL de una imagen de perfil
    socialLinks: {
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String },
    },
  },
  isPremium: {
    type: Boolean,
    default: false, // Por defecto, un ítem no es premium
  },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
  },
}, { timestamps: true });

// Middleware que se ejecuta antes de guardar el usuario
userSchema.pre('save', async function (next) {
  const user = this;

  // Solo cifrar si la contraseña ha cambiado o es nueva
  if (!user.isModified('password')) {
    return next();
  }

  try {
    // Generar un salt y usarlo para cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
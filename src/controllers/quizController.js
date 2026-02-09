import Quiz from '../models/Quiz.js';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError.js';

// CREATE
export const createQuiz = async (req, res, next) => {
  try {
    const { title, description, questions } = req.body;

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      owner: req.user._id,
    });

    res.status(201).json(quiz);
  } catch (error) {
    return next(new ApiError(500, 'Server error'));
  }
};

// READ (all user quizzes)
export const getMyQuizzes = async (req, res, next) => {
  try {
    // return all quizzes to any authenticated user
    const quizzes = await Quiz.find().populate('owner', 'username email');
    res.json(quizzes);
  } catch (error) {
    return next(new ApiError(500, 'Server error'));
  }
};

// READ (single quiz)
export const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('owner', 'username email');

    if (!quiz) {
      return next(new ApiError(404, 'Quiz not found'));
    }

    // any authenticated user may view a quiz; owner/admin checks apply only for update/delete
    res.json(quiz);
  } catch (error) {
    return next(new ApiError(500, 'Server error'));
  }
};

// UPDATE
export const updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return next(new ApiError(404, 'Quiz not found'));
    }

    // only owner or admin can update
    if (req.user.role !== 'admin' && quiz.owner.toString() !== req.user._id.toString()) {
      return next(new ApiError(403, 'Not authorized to update this quiz'));
    }

    quiz.title = req.body.title ?? quiz.title;
    quiz.description = req.body.description ?? quiz.description;
    quiz.questions = req.body.questions ?? quiz.questions;

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (error) {
    return next(new ApiError(500, 'Server error'));
  }
};

// DELETE
export const deleteQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, 'Invalid quiz id'));
    }

    // find quiz without owner filter so admins can delete any quiz
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return next(new ApiError(404, 'Quiz not found'));
    }

    // allow admin to delete any quiz, otherwise only owner
    if (req.user.role !== 'admin' && quiz.owner.toString() !== req.user._id.toString()) {
      return next(new ApiError(403, 'Not authorized to delete this quiz'));
    }

    await Quiz.deleteOne({ _id: id });

    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, 'Server error'));
  }
};


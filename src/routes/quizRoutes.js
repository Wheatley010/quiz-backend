import express from 'express';
import { check } from 'express-validator';
import runValidations from '../middleware/validationMiddleware.js';
import {
  createQuiz,
  getMyQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from '../controllers/quizController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// CREATE
router.post(
  '/',
  authMiddleware,
  runValidations([
    check('title').notEmpty().withMessage('title is required'),
    check('questions').isArray({ min: 1 }).withMessage('questions must be a non-empty array'),
    check('questions.*.text').notEmpty().withMessage('question text is required'),
    check('questions.*.options').isArray({ min: 2 }).withMessage('each question must have at least two options'),
    check('questions.*.correctIndex').isInt({ min: 0 }).withMessage('correctIndex must be a non-negative integer'),
  ]),
  createQuiz
);

// READ
router.get('/', authMiddleware, getMyQuizzes);
router.get('/:id', authMiddleware, getQuizById);

// UPDATE
router.put(
  '/:id',
  authMiddleware,
  runValidations([
    check('title').optional().notEmpty().withMessage('title cannot be empty'),
    check('questions').optional().isArray().withMessage('questions must be an array'),
    check('questions.*.text').optional().notEmpty().withMessage('question text is required'),
    check('questions.*.options').optional().isArray({ min: 2 }).withMessage('each question must have at least two options'),
    check('questions.*.correctIndex').optional().isInt({ min: 0 }).withMessage('correctIndex must be a non-negative integer'),
  ]),
  updateQuiz
);

// DELETE
router.delete('/:id', authMiddleware, deleteQuiz);

export default router;

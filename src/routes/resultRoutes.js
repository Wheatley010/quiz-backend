import express from 'express';
import { check } from 'express-validator';
import runValidations from '../middleware/validationMiddleware.js';
import { getMyResults, createResult, deleteResult } from '../controllers/resultController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  runValidations([
    check('quizId').notEmpty().withMessage('quizId is required'),
    check('quizId').isMongoId().withMessage('quizId must be a valid id'),
    check('answers').isArray().withMessage('answers must be an array'),
    check('answers.*').isInt({ min: 0 }).withMessage('each answer must be a non-negative integer index'),
  ]),
  createResult
);
router.get('/', authMiddleware, getMyResults);
router.delete('/:id', authMiddleware, deleteResult);

export default router;

import Result from '../models/Result.js';
import ApiError from '../errors/ApiError.js';

export const createResult = async (req, res, next) => {
  try {
    const { quizId, score, total } = req.body;

    const result = await Result.create({
      user: req.user.id,
      quiz: quizId,
      score,
      total,
    });

    res.status(201).json(result);
  } catch (err) {
    return next(new ApiError(500, 'Server error'));
  }
};

export const getMyResults = async (req, res, next) => {
  try {
    let results;

    // admin: return all results with user and quiz info
    if (req.user.role === 'admin') {
      results = await Result.find()
        .populate('quiz', 'title')
        .populate('user', 'username email')
        .sort({ createdAt: -1 });
    } else {
      // regular user: only their results
      results = await Result.find({ user: req.user.id })
        .populate('quiz', 'title')
        .sort({ createdAt: -1 });
    }

    res.json(results);
  } catch (err) {
    return next(new ApiError(500, 'Server error'));
  }
};

export const deleteResult = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Result.findById(id);

    if (!result) {
      return next(new ApiError(404, 'Result not found'));
    }

    // Check if user owns the result or is admin
    if (result.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ApiError(403, 'Not authorized to delete this result'));
    }

    await Result.findByIdAndDelete(id);

    res.json({ message: 'Result deleted successfully' });
  } catch (err) {
    return next(new ApiError(500, 'Server error'));
  }
};

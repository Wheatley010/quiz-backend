import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;

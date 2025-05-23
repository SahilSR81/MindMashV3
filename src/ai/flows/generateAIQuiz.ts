import { generateQuizQuestions } from './generate-quiz-questions';

const topics = [
  'General Knowledge', 'Science', 'History', 'Geography', 'Sports', 'Technology', 'Literature', 'Art', 'Mathematics', 'Music'
];
const difficulties = ['easy', 'medium', 'hard'];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function generateAIQuiz() {
  const topic = getRandom(topics);
  const difficulty = getRandom(difficulties) as 'easy' | 'medium' | 'hard';
  try {
    const { questions } = await generateQuizQuestions({
      topic,
      difficulty,
      numberOfQuestions: 5
    });
    return {
      title: `Today's ${topic} Quiz (${difficulty})`,
      topic,
      difficulty,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options,
        answer: q.correctAnswer
      })),
      createdAt: new Date(),
      isPublic: true,
      challengeDate: new Date().toISOString().split('T')[0],
    };
  } catch (err) {
    console.error('Error generating AI quiz:', err);
    throw err;
  }
} 
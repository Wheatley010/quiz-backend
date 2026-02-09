import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Quiz from '../models/Quiz.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    // find an admin or any user to be owner
    let owner = await User.findOne({ role: 'admin' });
    if (!owner) owner = await User.findOne();
    if (!owner) {
      console.error('No users found. Create a user first.');
      process.exit(1);
    }

    // remove old quizzes
    await Quiz.deleteMany({});

    const quizzes = [];

    // Movie quiz
    quizzes.push({
      title: 'Movie Trivia: Classics & Modern',
      description: 'Ten mixed questions about films, directors and actors.',
      owner: owner._id,
      questions: [
        { question: 'Which director is known for the film "Pulp Fiction"?', options: ['Martin Scorsese', 'Quentin Tarantino', 'Steven Spielberg', 'Christopher Nolan', 'Ridley Scott'], correctAnswer: 1 },
        { question: 'In which movie does the character "Forrest Gump" appear?', options: ['The Green Mile', 'Forrest Gump', 'Cast Away', 'Saving Private Ryan', 'Philadelphia'], correctAnswer: 1 },
        { question: 'Which actress played the lead in the movie "Breakfast at Tiffany\'s"?', options: ['Audrey Hepburn', 'Marilyn Monroe', 'Elizabeth Taylor', 'Grace Kelly', 'Judy Garland'], correctAnswer: 0 },
        { question: 'Which film won Best Picture at the 1994 Academy Awards?', options: ['Pulp Fiction', 'The Shawshank Redemption', 'Forrest Gump', 'Four Weddings and a Funeral', 'The Lion King'], correctAnswer: 2 },
        { question: 'Who directed "Inception" (2010)?', options: ['Christopher Nolan', 'James Cameron', 'David Fincher', 'Denis Villeneuve', 'Guy Ritchie'], correctAnswer: 0 },
        { question: 'Which movie features the quote: "I\'ll be back"?', options: ['Terminator', 'Die Hard', 'Predator', 'Total Recall', 'Robocop'], correctAnswer: 0 },
        { question: 'Which actor portrayed the Joker in "The Dark Knight" (2008)?', options: ['Heath Ledger', 'Joaquin Phoenix', 'Jack Nicholson', 'Jared Leto', 'Cillian Murphy'], correctAnswer: 0 },
        { question: 'Which film is directed by Hayao Miyazaki?', options: ['Spirited Away', 'Your Name', 'Akira', 'Ghost in the Shell', 'Perfect Blue'], correctAnswer: 0 },
        { question: 'Which movie centers around the sinking of the RMS Titanic?', options: ['A Night to Remember', 'Titanic', 'The Perfect Storm', 'Master and Commander', 'Poseidon'], correctAnswer: 1 },
        { question: 'Which actor starred as Jack Sparrow in "Pirates of the Caribbean"?', options: ['Orlando Bloom', 'Johnny Depp', 'Geoffrey Rush', 'Brendan Fraser', 'Hugh Jackman'], correctAnswer: 1 }
      ]
    });

    // Games quiz
    quizzes.push({
      title: 'Video Games: Classics & Indies',
      description: 'Ten questions about video games and designers.',
      owner: owner._id,
      questions: [
        { question: 'Which game popularized the battle royale genre in 2017?', options: ['Fortnite', 'Overwatch', 'Dota 2', 'Minecraft', 'Skyrim'], correctAnswer: 0 },
        { question: 'Who is the creator of Super Mario?', options: ['Satoru Iwata', 'Hideo Kojima', 'Shigeru Miyamoto', 'Gabe Newell', 'Sid Meier'], correctAnswer: 2 },
        { question: 'Which game features a character named Link?', options: ['Zelda', 'Metroid', 'Halo', 'Doom', 'Fallout'], correctAnswer: 0 },
        { question: 'Which studio developed "The Witcher 3"?', options: ['CD Projekt Red', 'Rockstar', 'Ubisoft', 'EA', 'Blizzard'], correctAnswer: 0 },
        { question: 'Which game is known for its blocky building mechanics?', options: ['Roblox', 'Minecraft', 'Terraria', 'Fortnite', 'Garry\'s Mod'], correctAnswer: 1 },
        { question: 'Which series features the character Lara Croft?', options: ['Tomb Raider', 'Assassin\'s Creed', 'Uncharted', 'Prince of Persia', 'God of War'], correctAnswer: 0 },
        { question: 'Which company makes the PlayStation console?', options: ['Microsoft', 'Nintendo', 'Sony', 'Sega', 'Atari'], correctAnswer: 2 },
        { question: 'Which game introduced the Nemesis system?', options: ['Shadow of Mordor', 'God of War', 'Bloodborne', 'Skyrim', 'Dark Souls'], correctAnswer: 0 },
        { question: 'Which indie game is about a moon and emotions, developed by Thatgamecompany?', options: ['Journey', 'Hollow Knight', 'Celeste', 'Stardew Valley', 'Limbo'], correctAnswer: 0 },
        { question: 'Which franchise includes the game "Halo"?', options: ['Call of Duty', 'Halo', 'Gears of War', 'Battlefield', 'Mass Effect'], correctAnswer: 1 }
      ]
    });

    // Football quiz
    quizzes.push({
      title: 'Football (Soccer) Knowledge',
      description: 'Ten questions about football clubs, players and tournaments.',
      owner: owner._id,
      questions: [
        { question: 'Which country won the 2018 FIFA World Cup?', options: ['Brazil', 'Germany', 'France', 'Argentina', 'Spain'], correctAnswer: 2 },
        { question: 'Which player has the most Ballon d\'Or awards (as of 2024)?', options: ['Cristiano Ronaldo', 'Lionel Messi', 'Pelé', 'Diego Maradona', 'Zinedine Zidane'], correctAnswer: 1 },
        { question: 'Which club plays home matches at Old Trafford?', options: ['Chelsea', 'Liverpool', 'Manchester United', 'Arsenal', 'Tottenham'], correctAnswer: 2 },
        { question: 'How many players in a football (soccer) team on the pitch?', options: ['9', '10', '11', '12', '13'], correctAnswer: 2 },
        { question: 'Which competition is contested by European clubs yearly?', options: ['Copa Libertadores', 'UEFA Champions League', 'AFC Champions League', 'CONCACAF Gold Cup', 'Copa America'], correctAnswer: 1 },
        { question: 'Which player scored the famous "Hand of God" goal?', options: ['Pele', 'Maradona', 'Messi', 'Ronaldo', 'Ronaldinho'], correctAnswer: 1 },
        { question: 'Which country hosted the 2014 FIFA World Cup?', options: ['Russia', 'South Africa', 'Brazil', 'Qatar', 'Germany'], correctAnswer: 2 },
        { question: 'Which club is nicknamed "The Red Devils"?', options: ['Manchester United', 'AC Milan', 'Bayern Munich', 'Inter Milan', 'Real Madrid'], correctAnswer: 0 },
        { question: 'How long is a standard professional match (minutes)?', options: ['60', '75', '90', '105', '120'], correctAnswer: 2 },
        { question: 'Which country has won the most World Cups?', options: ['Germany', 'Italy', 'Argentina', 'Brazil', 'France'], correctAnswer: 3 }
      ]
    });

    // Advanced mathematics quiz
    quizzes.push({
      title: 'Higher Mathematics: Concepts & Theorems',
      description: 'Ten questions touching calculus, algebra and number theory.',
      owner: owner._id,
      questions: [
        { question: 'What is the derivative of sin(x)?', options: ['cos(x)', '-sin(x)', '-cos(x)', 'sin(x)', '1'], correctAnswer: 0 },
        { question: 'What is the integral of 1/x dx (for x>0)?', options: ['x', 'ln(x)', 'e^x', '1/x', 'x^2/2'], correctAnswer: 1 },
        { question: 'Which is a prime number?', options: ['21', '27', '31', '35', '49'], correctAnswer: 2 },
        { question: 'What is the solution to 2x = 6?', options: ['x=12', 'x=3', 'x=4', 'x=2', 'x=0'], correctAnswer: 1 },
        { question: 'Which object is a vector space over R?', options: ['Integers under +', 'Polynomials with real coefficients', 'Natural numbers', 'Boolean algebra', 'Set of primes'], correctAnswer: 1 },
        { question: 'Euler\'s identity is e^(i\pi) + 1 = ?', options: ['0', '1', '-1', 'i', 'e'], correctAnswer: 0 },
        { question: 'Which is the Golden Ratio (approx)?', options: ['1.41', '1.62', '2.71', '3.14', '1.32'], correctAnswer: 1 },
        { question: 'What is the determinant of identity matrix I_n?', options: ['0', 'n', '1', '-1', 'undefined'], correctAnswer: 2 },
        { question: 'Which theorem guarantees a fixed point for continuous maps on a disk?', options: ['Pythagoras', 'Bolzano-Weierstrass', 'Brouwer Fixed Point', 'Fermat\'s Last Theorem', 'Taylor'], correctAnswer: 2 },
        { question: 'What is the limit of (1+1/n)^n as n→∞?', options: ['0', '1', 'e', '∞', '2'], correctAnswer: 2 }
      ]
    });

    const created = await Quiz.insertMany(quizzes);
    console.log('Created quizzes:', created.map(q => q._id.toString()));
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

run();

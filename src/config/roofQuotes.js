// Original reflections written for this house, not quotations attributed to public figures.
const LINES = [
  'Your potential is a possibility. Your habits are evidence.',
  'Be ambitious about your work and humble about your importance.',
  'What are you calling “being realistic” that is actually fear?',
  'If your beliefs never cost you anything, have they ever been tested?',
  'The life you admire has ordinary days. Learn to love those too.',
  'Don’t confuse understanding yourself with excusing yourself.',
  'You can win the argument and still miss the truth.',
  'What would you keep doing if nobody could know you did it?',
  'Your calendar reveals the priorities your words can hide.',
  'Build a life that feels meaningful from the inside, not just impressive from the outside.',
  'How much of what you want was chosen for you by the people you compare yourself to?',
  'Being a beginner is the price of becoming good at something new.',
  'What evidence would change your mind? If the answer is nothing, look closer.',
  'The work you keep postponing may be the work that asks you to become someone new.',
  'Protect the part of you that can be impressed by ordinary things.',
  'Learn to recognize when preparation has become a comfortable way to avoid starting.',
  'A mistake becomes more expensive when your pride makes you defend it.',
  'Choose a direction worth the days it will take, not just the moment of arrival.',
  'Who gets the best of you, and who only gets what is left?',
  'Confidence is more useful when it leaves room for correction.',
  'Pay attention to what you admire. You may be rehearsing who you will become.',
  'What are you willing to do badly long enough to learn to do well?',
  'Success can give you more choices. Decide what you want those choices to protect.',
  'A full schedule can hide an unanswered question: what is all this for?',
  'You don’t need to diminish someone else to take your own ambitions seriously.',
  'The way you treat people when you are disappointed says more than your intentions when you are calm.',
  'What would you attempt if being seen trying mattered less than finding out?',
  'Notice when loyalty to your past decisions is costing you your future.',
  'Let the people closest to you benefit from the person you are trying to become.',
  'When you reach the life you are chasing, will you know how to be present in it?',
  // Creating, discovering, and opening possibilities for others.
  "Making something is a way of finding out what you actually understand.",
  "The first version gives reality a chance to answer you.",
  "You don’t have to know everything your idea will become to give it a beginning.",
  "Build the thing that would have helped you when you were starting.",
  "Some questions can only be answered by making something.",
  "What you make can become the starting point for someone you will never meet.",
  "An imperfect thing in the world can teach you more than a perfect thing in your head.",
  "Pay attention to what you keep wishing existed.",
  "You may discover what you wanted to create only after you begin creating it.",
  "The world you take for granted is full of things someone once had to imagine.",
  "Make something that gives another person a possibility they didn’t have before.",
  "A small creation can change your relationship with the world: you begin to see what else could be different.",
  "Once an idea takes shape, you can have a conversation with it that thinking alone could never offer.",
  "Something you build for one purpose may help someone else discover another.",
  "Each thing you finish gives your next idea somewhere firmer to begin.",
  "A working example can make a possibility easier to believe in than a thousand explanations.",
  "The things you create may travel further than your reasons for creating them.",
  "When someone uses what you made in a way you never imagined, the idea has begun a life beyond you.",
  "Building something small can reveal an opportunity too specific for anyone to have predicted.",
  "Leave something in the world that someone else can build upon.",
  // Questions for curiosity, perspective, and honest self-reflection.
  "Which of your opinions have you earned through experience, and which have you inherited?",
  "What would you create if it only needed to matter to a few people?",
  "What have you become good at that you no longer want to keep doing?",
  "If you achieved everything on your list, what would still be missing?",
  "What are you optimizing that you should be questioning?",
  "Which part of your life would surprise the person you were ten years ago?",
  "What do you understand differently because you tried and failed?",
  "What have you accepted as permanent simply because it has been that way for a long time?",
  "When did you last let curiosity take you somewhere without asking whether it would be useful?",
  "What would you notice if you stopped measuring yourself for a while?",
  "Which problem keeps returning because you keep solving only its most visible part?",
  "What is easy for you now that once felt impossible—and what might that suggest about your next challenge?",
  "Whose invisible effort makes your ordinary day possible?",
  "What would you teach differently if you remembered how it felt not to understand?",
  "What could you begin today that your future self would be glad you didn’t postpone?",
  "Which of your ambitions would survive a change in who you wanted to impress?",
  "What have you stopped questioning because the answer is convenient?",
  "If someone learned your values only by watching you, what would they think you believe?",
  "What would you lose by being wrong—and is that why you are so certain?",
  "Which ordinary moment would you miss most if your life changed tomorrow?",
  "What are you asking your future self to repair that you could take care of now?",
  "Who sees a side of the problem that your experience has taught you to overlook?",
  "Which opportunity would you recognize only if you were willing to change your plans?",
  "When has having fewer options helped you make something better?",
  "What do you know how to explain but have not yet learned how to practice?",
  "What might someone else be protecting in a disagreement you are trying to win?",
  "What would enough look like, and would you recognize it if you reached it?",
  "Which part of your routine is still serving a life you no longer live?",
  "What do you dismiss as simple because someone else did the difficult work?",
  "What would you explore if you allowed yourself to stay uncertain a little longer?",
];

// Original wording adapted from established mental models; labels are not author credits.
const MENTAL_MODELS = [
  {
    "label": "First principles",
    "text": "What remains true when you remove the assumptions?",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Inversion",
    "text": "Imagine how this fails. What could you prevent now?",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Second-order thinking",
    "text": "After the immediate benefit, what happens next?",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Opportunity cost",
    "text": "What worthwhile alternative does this choice leave behind?",
    "source": "https://www.openstax.org/books/principles-economics-2e/pages/2-1-how-individuals-make-choices-based-on-their-budget-constraint"
  },
  {
    "label": "Circle of competence",
    "text": "Know where your understanding ends and your guessing begins.",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Map versus territory",
    "text": "Your explanation of reality is still only an explanation.",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Probabilistic thinking",
    "text": "How likely is it—not merely, is it possible?",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Bayesian updating",
    "text": "Let new evidence change the strength of your beliefs.",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Margin of safety",
    "text": "Leave room for your estimates to be wrong.",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Sunk costs",
    "text": "Decide from what lies ahead, not what you cannot recover.",
    "source": "https://www.openstax.org/books/principles-economics-2e/pages/2-1-how-individuals-make-choices-based-on-their-budget-constraint"
  },
  {
    "label": "Compounding",
    "text": "Repeated gains can grow from what earlier gains made possible.",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Feedback loops",
    "text": "Does the result weaken the cause—or strengthen it?",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Bottlenecks",
    "text": "Improve what limits the whole, not what is easiest.",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Incentives",
    "text": "Look at what gets rewarded, not just what gets requested.",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Emergence",
    "text": "Understand the interactions, not only the individual parts.",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Diminishing returns",
    "text": "Is the next increment still worth the extra effort?",
    "source": "https://www.openstax.org/books/principles-economics-2e/pages/2-1-how-individuals-make-choices-based-on-their-budget-constraint"
  },
  {
    "label": "Trade-offs",
    "text": "What are you giving up to make this better?",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Occam’s razor",
    "text": "Prefer explanations that need fewer unsupported assumptions.",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Hanlon’s razor",
    "text": "Consider error or misunderstanding before assuming harmful intent.",
    "source": "https://fs.blog/mental-models/"
  },
  {
    "label": "Thought experiments",
    "text": "Change one assumption. What else must change with it?",
    "source": "https://fs.blog/mental-models/"
  }
];

export const ROOF_QUOTES = [
  ...LINES.map(text => ({ text, font: 'Georgia', original: true })),
  ...MENTAL_MODELS.map(model => ({ ...model, font: 'Georgia', original: true })),
];

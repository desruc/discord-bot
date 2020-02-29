const movieQuotes = [
  "I'll be back!",
  "Consider that a divorce!",
  "If it bleeds, we can kill it.",
  "Hasta la vista baby!",
  "What a hothead!",
  "What a pain in the neck!",
  "Here's your Sub-Zero... now plain zero.",
  "Let off some steam",
  "Stick around",
  "Knock-knock",
  "Come with me if you want to live",
  "I'm not into politics, I'm into survival",
  "What is best in life? To crush your enemies, see them driven before you, and to hear the lamentation of their women!",
  "I eat Green Berets for breakfast. And right now, I’m very hungry!",
  "You've just been erased.",
  "You're a funny guy Sully, I like you. That's why I'm going to kill you last.",
  "I lied.",
  "You should have cloned yourself!",
  "Who is your daddy, and what does he do?",
  "Your foster parents are dead.",
  "He'll live",
  "You want to be a farmer?... Here's a couple of acres!",
  "GET TO THE CHOPPER!",
  "See you at the party, Richter",
  "Stick around!",
  "Do it. Do it now!",
  "I don't do requests",
  "Ah, he had to split",
  "Iced that guy",
  "Well that hit the spot",
  "Chill out, dick wad",
  "I'm a cop, you idiot!",
  "You killed my father... big mistake",
  "Fuck you, asshole!",
  "No problemo",
  "Talk to the hand",
  "Allow me to break the ice",
  "Get your ass to mars",
  "You are terminated",
  "It's showtime",
  "Unlikely. I’m an obsolete design. T-X is faster, more powerful and more intelligent. It’s a far more effective killing machine"
];

const inspirationalQuotes = [
  "Failure is not an option. Everyone has to succeed.",
  "The worst thing I can be is the same as everybody else. I hate that.",
  "The mind is the limit. As long as the mind can envision the fact that you can do something, you can do it, as long as you really believe 100 percent.",
  "I like the color red because it’s a fire. And I see myself as always being on fire.",
  "For me life is continuously being hungry. The meaning of life is not simply to exist, to survive, but to move ahead, to go up, to achieve, to conquer.",
  "Start wide, expand further, and never look back.",
  "Strength does not come from winning. Your struggles develop your strengths. When you go through hardships and decide not to surrender, that is strength.",
  "It’s simple, if it jiggles, it’s fat.",
  "Bodybuilding is much like any other sport. To be successful, you must dedicate yourself 100% to your training, diet and mental approach.",
  "The last three or four reps is what makes the muscle grow.",
  "Positive thinking can be contagious. Being surrounded by winners helps you develop into a winner.",
  "The more knowledge you have, the more you’re free to rely on your instincts."
];

const memeMessages = [
  "Morning ladies!",
  "Spicy or nah?",
  `Top o' the mornin’ to ya!`,
  "This ones on me",
  "Dank/10",
  "Thank me later",
  `You're gonna love this`,
  "Ahoy there mateys!",
  "This will put some lead in your pencil",
  ";)",
  "Me Gusta",
  "Whaddaya think?"
];

function generateGreetings(member) {
  return [
    `${member}, you son of a bitch! Welcome to the server!`,
    `${member}, I need your clothes, your boots, and your motorcycle... `,
    `${member}, you're one ugly motherfucker...`,
    `${member}, GET TO THE CHOPPA!`,
    `Hasta La Vista, ${member}`,
    `You're a funny guy ${member}, I like you. That's why I'm going to kill you last.`,
    `${member}, get your ass to mars!`,
    `${member}, more energy!`,
    `${member}, who is your daddy, and what does he do?`,
    `LET OFF SOME STEAM, ${member}`
  ];
}

module.exports = {
  movieQuotes,
  inspirationalQuotes,
  memeMessages,
  generateGreetings
};

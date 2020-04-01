const memeMessages = [
  'Morning ladies!',
  'Spicy or nah?',
  `Top o' the mornin’ to ya!`,
  'This ones on me',
  'Dank/10',
  'Thank me later',
  `You're gonna love this`,
  'Ahoy there mateys!',
  'This will put some lead in your pencil',
  ';)',
  'Me Gusta',
  'Whaddaya think?'
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
  memeMessages,
  generateGreetings
};

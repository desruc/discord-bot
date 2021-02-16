export interface NewRoleMeta {
  name: string;
  level?: number;
  position?: number;
  color?: string;
  hoist?: boolean;
  image?: string;
  description?: string;
}

export const basicRoles: NewRoleMeta[] = [
  {
    name: '>conscious',
    level: 0,
    color: '#F8F32B',
    hoist: true,
    description: 'welcome to the real world',
    image: 'https://cdn.mos.cms.futurecdn.net/MJ6QbXmHQBhVuXMcEAZ3jK.jpg'
  },
  {
    name: '>sentient',
    level: 10,
    color: '#3185FC',
    hoist: true,
    description: 'your effort to contribute has not gone unnoticed',
    image: ''
  }
];

export const fantasyRoles: NewRoleMeta[] = [
  {
    name: 'Human',
    level: 0,
    color: '#878472',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/6/258/420/618/636271801914013762.png'
  },
  {
    name: 'Locathah',
    level: 5,
    color: '#666A86',
    description:
      'Locathah are typically tall and lanky, with features strongly resembling a fish. their 4 fingered hands and three toed feet are heavily webbed, as well as fins on their upper and lower arms, calves, and a large crowning fin on their head.',
    image:
      'https://i.pinimg.com/originals/73/90/e2/7390e2b24f8ec5db7678fca2f28b92ae.jpg'
  },
  {
    name: 'Goblin',
    level: 10,
    color: '#A2D729',
    description:
      'Goblins are small goblinoids that many consider little more than a nuisance. They have flat faces, broad noses, pointed ears, and small, sharp fangs. Their foreheads slope back, and their eyes vary in color from red to yellow.',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/351/1000/1000/636252777818652432.jpeg'
  },
  {
    name: 'Kobold',
    level: 15,
    color: '#63CCCA',
    description:
      'A kobold is a reptilian humanoid, standing between 60cm – 75cm tall, weighing 16 to 20 kilos, with scaled skin between reddish brown and black in color and burnt orange to red eyes.',
    image:
      'https://vignette.wikia.nocookie.net/forgottenrealms/images/f/f3/Monster_Manual_5e_-_Kobold_-_p195.jpg/revision/latest/scale-to-width-down/350?cb=20141112221803'
  },
  {
    name: 'Gnome',
    level: 20,
    color: '#3185FC',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/6/334/420/618/636272671553055253.png'
  },
  {
    name: 'Halfling',
    level: 25,
    color: '#E3DFFF',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/6/256/420/618/636271789409776659.png'
  },
  {
    name: 'Dwarf',
    level: 30,
    color: '#7BD389',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/6/371/420/618/636272706155064423.png'
  },
  {
    name: 'Centaur',
    level: 35,
    color: '#FF8552',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/227/1000/1000/636252765573266420.jpeg'
  },
  {
    name: 'Dragonborn',
    level: 40,
    color: '#38405F',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/6/340/420/618/636272677995471928.png'
  },
  {
    name: 'Bugbear',
    level: 45,
    color: '#FFA737',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/221/1000/1000/636252765234633232.jpeg'
  },
  {
    name: 'Firbolg',
    level: 50,
    color: '#B6D094',
    description: '',
    image:
      'https://vignette.wikia.nocookie.net/forgottenrealms/images/7/79/Firbolg-5e.jpg/revision/latest?cb=20180623050202'
  },
  {
    name: 'Hobgoblin',
    level: 55,
    color: '#F8F32B',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/389/1000/1000/636252781431932597.jpeg'
  },
  {
    name: 'Minotaur',
    level: 60,
    color: '#DC851F',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/217/1000/1000/636252765009181721.jpegv'
  },
  {
    name: 'Goliath',
    level: 65,
    color: '#F3C969',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/7/620/420/618/636286749289682134.png'
  },
  {
    name: 'Half-Elf',
    level: 70,
    color: '#A06CD5',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/6/481/420/618/636274618102950794.png'
  },
  {
    name: 'Elf',
    level: 75,
    color: '#6247AA',
    description: '',
    image:
      'https://i.pinimg.com/originals/c4/19/97/c41997907a855ed61b91c425151bc14e.png'
  },
  {
    name: 'Half-Orc',
    level: 80,
    color: '#CC5A71',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/6/466/420/618/636274570630462055.png'
  },
  {
    name: 'Orc',
    level: 85,
    color: '#E84855',
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/301/1000/1000/636252771691385727.jpeg'
  },
  {
    name: 'Tiefling',
    level: 90,
    color: '#8b2635',
    description: '',
    image: 'https://i.redd.it/tuejc7qsp6231.png'
  }
];

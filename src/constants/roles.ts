interface NewRoleMeta {
  name: string;
  level?: number;
  position?: number;
  color?: string;
  hoist?: boolean;
  image?: string;
  description?: string;
}

export const roles: NewRoleMeta[] = [
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
    description: '',
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/351/1000/1000/636252777818652432.jpeg'
  },
  {
    name: 'Kobold',
    level: 15,
    color: '#63CCCA'
  },
  {
    name: 'Gnome',
    level: 20,
    color: '#3185FC'
  },
  {
    name: 'Halfling',
    level: 25,
    color: '#E3DFFF'
  },
  {
    name: 'Dwarf',
    level: 30,
    color: '#7BD389'
  },
  {
    name: 'Centaur',
    level: 35,
    color: '#FF8552'
  },
  {
    name: 'Dragonborn',
    level: 40,
    color: '#38405F'
  },
  {
    name: 'Bugbear',
    level: 45,
    color: '#FFA737'
  },
  {
    name: 'Firbolg',
    level: 50,
    color: '#B6D094'
  },
  {
    name: 'Hobgoblin',
    level: 55,
    color: '#F8F32B'
  },
  {
    name: 'Minotaur',
    level: 60,
    color: '#DC851F'
  },
  {
    name: 'Goliath',
    level: 65,
    color: '#F3C969'
  },
  {
    name: 'Half-Elf',
    level: 70,
    color: '#A06CD5'
  },
  {
    name: 'Elf',
    level: 75,
    color: '#6247AA'
  },
  {
    name: 'Half-Orc',
    level: 80,
    color: '#CC5A71'
  },
  {
    name: 'Orc',
    level: 85,
    color: '#E84855'
  },
  {
    name: 'Tiefling',
    level: 90,
    color: '#8b2635'
  }
];

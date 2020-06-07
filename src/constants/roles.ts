interface NewRoleMeta {
  name: string;
  level?: number;
  position?: number;
  color?: string;
  hoist?: boolean;
}

export const roles: NewRoleMeta[] = [
  {
    name: 'Human',
    level: 0,
    color: '#878472'
  },
  {
    name: 'Locathah',
    level: 5,
    color: '#666A86'
  },
  {
    name: 'Goblin',
    level: 10,
    color: '#A2D729'
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

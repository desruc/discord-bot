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
    position: 100,
    color: '#878472'
  },
  {
    name: 'Locathah',
    level: 5,
    position: 99,
    color: '#666A86'
  },
  {
    name: 'Goblin',
    level: 10,
    position: 98,
    color: '#A2D729'
  },
  {
    name: 'Kobold',
    level: 15,
    position: 97,
    color: '#63CCCA'
  },
  {
    name: 'Gnome',
    level: 20,
    position: 96,
    color: '#3185FC'
  },
  {
    name: 'Halfling',
    level: 25,
    position: 95,
    color: '#E3DFFF'
  },
  {
    name: 'Dwarf',
    level: 30,
    position: 94,
    color: '#7BD389'
  },
  {
    name: 'Centaur',
    level: 35,
    position: 93,
    color: '#FF8552'
  },
  {
    name: 'Dragonborn',
    position: 92,
    level: 40,
    color: '#38405F'
  },
  {
    name: 'Bugbear',
    level: 45,
    position: 91,
    color: '#FFA737'
  },
  {
    name: 'Firbolg',
    level: 50,
    position: 90,
    color: '#B6D094'
  },
  {
    name: 'Hobgoblin',
    level: 55,
    position: 89,
    color: '#F8F32B'
  },
  {
    name: 'Minotaur',
    level: 60,
    position: 88,
    color: '#DC851F'
  },
  {
    name: 'Goliath',
    level: 65,
    position: 87,
    color: '#F3C969'
  },
  {
    name: 'Half-Elf',
    level: 70,
    position: 86,
    color: '#A06CD5'
  },
  {
    name: 'Elf',
    level: 75,
    position: 85,
    color: '#6247AA'
  },
  {
    name: 'Half-Orc',
    level: 80,
    position: 84,
    color: '#CC5A71'
  },
  {
    name: 'Orc',
    level: 85,
    position: 83,
    color: '#E84855'
  },
  {
    name: 'Tiefling',
    level: 90,
    position: 82,
    color: '#8b2635'
  }
];

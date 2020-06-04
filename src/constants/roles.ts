interface NewRoleMeta {
  name: string;
  level?: number;
  position?: number;
  color?: string;
  hoist?: boolean;
}

export const roles: NewRoleMeta[] = [
  {
    name: 'Villager',
    level: 0,
    position: 100,
    color: '#07a3d7'
  },
  {
    name: 'Dragonborn',
    level: 5,
    position: 95
  }
];

/*
Dungeon Master
Dragonborn
Dwarf
Elf
Gnome
Half-Elf
Halfling
Half-Orc
Human
Tiefling
Goliath
Goblin
Hobgoblin
Kobold
Orc
Minotaur
Centaur
Locathah
Firbolg
Bugbear
*/

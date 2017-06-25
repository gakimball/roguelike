module.exports = {
  player: {
    character: '@',
    flags: ['player', 'living', 'friendly'],
    health: 10,
    mana: 5,
    attack: 1,
    level: 1,
  },
  wolf: {
    name: 'wolf',
    character: 'W',
    flags: ['living'],
    health: 2,
    mana: 0,
    attack: 1,
    level: 1,
    ai: ['chase', 4],
  },
  deer: {
    name: 'deer',
    character: 'D',
    flags: ['living', 'friendly'],
    health: 2,
    mana: 0,
    attack: 1,
    level: 1,
  }
}

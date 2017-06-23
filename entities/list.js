module.exports = {
  player: {
    character: '@',
    flags: ['player', 'living', 'friendly'],
    health: 10,
    mana: 5,
    attack: 1,
  },
  gremlin: {
    character: '#',
    flags: ['living'],
    health: 2,
    mana: 0,
    attack: 1,
    ai: 'wander',
  }
}

import React, { Component } from 'react';
import DocumentEvents from 'react-document-events';
import rot from 'rot-js';
import { createIsland, tiles, presets } from '../util/create-island';
import Game from '../util/island-game';

export default class Island extends Component {
  state = {
    game: null
  }

  componentDidMount() {
    const game = new Game();
    game.start();
    this.container.appendChild(game.getCanvas());

    this.setState({ game });
    game.onTick(() => {
      this.setState({ game });
    });
  }

  render() {
    const { game } = this.state;

    return (
      <div>
        {game && <DocumentEvents onKeyDown={game.handleKey} />}
        <div ref={e => { this.container = e; }}></div>
        {game && <div>
          <p><strong>Level:</strong> {game.world.player.level}</p>
          <p><strong>HP:</strong> {game.world.player.health}</p>
          <p><strong>MP:</strong> {game.world.player.mana}</p>
        </div>}
      </div>
    )
  }
}

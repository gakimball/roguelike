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
  }

  render() {
    const { game } = this.state;

    return (
      <div ref={e => { this.container = e; }}>
        {game && <DocumentEvents onKeyDown={game.handleKey} />}
        <button onClick={this.generate}>Generate</button>
      </div>
    )
  }
}

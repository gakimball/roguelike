import React, { Component } from 'react';
import DocumentEvents from 'react-document-events';
import Game from '../util/game';

export default class GameViewer extends Component {
  state = {
    game: null
  }

  componentDidMount() {
    const game = new Game();
    this.container.appendChild(game.getCanvas());
    game.start();

    this.setState({ game });
  }

  render() {
    const { game } = this.state;

    return (
      <div className="container" ref={e => { this.container = e; }}>
        {game && <DocumentEvents onKeyDown={game.handleKey} />}
        <style jsx>{`
          .container {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }
}

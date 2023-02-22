import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  if (!props.highlight) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  } else {
    return (
      <button style={{ background: '#50a1ff' }} className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }
}

class Board extends React.Component {
  renderSquare(i) {
    let highlight;
    if (this.props.highlightLines &&
      this.props.highlightLines.some(x => (x === i))) {
      highlight = true;
    } else {
      highlight = false;
    }
    return (
      <Square
        highlight={highlight}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let table = []
    for (let i = 0; i < 3; i++) {
      let children = []
      for (let j = 0; j < 3; j++) {
        children.push(this.renderSquare(i * 3 + j))
      }
      table.push(<div key={i} className="board-row">{children}</div>)
    }
    return (<div>{table}</div>);
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        selectedSquare: -1,
      }],
      selectedMove: -1,
      stepNumber: 0,
      xIsNext: true,
      isToggled: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinnerLines(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        selectedSquare: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  handleToggle() {
    this.setState({
      isToggled: !this.state.isToggled
    })
  }

  jumpTo(step) {
    this.setState({
      selectedMove: step,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinnerLines(current.squares);

    const moveList = history.map((step, move) => {
      const col = step.selectedSquare % 3;
      const row = Math.floor(step.selectedSquare / 3);
      const desc = move ?
        'Go to move #' + move +
        " (" + col + ", " + row + ")" :
        'Go to game start';
      if (this.state.selectedMove === move) {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
          </li>
        );
      } else {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      }
    });

    const moves = this.state.isToggled ?
      moveList.reverse() : moveList;

    let status;
    if (winner) {
      status = 'Winner: ' + current.squares[winner[0]];
    } else {
      if (checkDraw(current.squares)) {
        status = 'Game Draw';
      }
      else {
        status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            highlightLines={winner}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            Sort moves descending &nbsp;
            <label>
              <input
                type="checkbox"
                onClick={() => this.handleToggle()}
              />
              <span />
            </label>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinnerLines(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

function checkDraw(squares) {
  for (let i = 0; i < 9; i++) {
    if (!squares[i]) {
      return false;
    }
  }
  return true;
}
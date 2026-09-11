/**
 * CHECKMATE – Interactive Chess Board Engine & AI Digital Demonstration
 */

// Luxury SVG Chess Pieces (Clean, scalable vectors)
const CHESS_PIECES = {
  // White / Gold Pieces
  'wK': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#f5df97" stroke="#aa820a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V23.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7z"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/></g></svg>`,
  'wQ': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#f5df97" stroke="#aa820a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11 2 12z"/><path d="M9 26c0 2 1.5 2 2.5 4 2.5 4 1 5.5 1 5.5h20s-1.5-1.5 1-5.5c1-2 2.5-2 2.5-4"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="8" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/><path d="M11 38.5h23"/></g></svg>`,
  'wR': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#f5df97" stroke="#aa820a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zm3-3v-11.5l2-1.5h17l2 1.5V36H12zm0-15l-1.5-6h23l-1.5 6H12zm2-6V9h4v3h5V9h4v3h5V9h4v5H14z"/><path d="M14 29.5v-13h17v13H14z" fill="#aa820a" fill-opacity="0.15"/></g></svg>`,
  'wB': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#f5df97" stroke="#aa820a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.94 3-2 3-2zM15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/><path d="M17.5 26h10M15 30h15m-7.5-14.5v5m-3-2.5h6"/></g></svg>`,
  'wN': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#f5df97" stroke="#aa820a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0-.97 1.44-1.97 1-1-1.5 1-3 0-4-.5 0-.53.5-.97 1-.6.7-1 1-1 0-.1-1.03.88-2.6 1.97-4 1.5-2 3-4 6-5 2.5-1 3.5-2 4-4 .5-1 .5-2 2-2z"/><circle cx="9.5" cy="25.5" r="1" fill="#aa820a"/></g></svg>`,
  'wP': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#f5df97" stroke="#aa820a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.95 1.12-3.28 3.21-3.28 5.62 0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h24c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/></g></svg>`,

  // Black / Obsidian Pieces
  'bK': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#171d2b" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V23.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7z"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" stroke="#a0aec0"/></g></svg>`,
  'bQ': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#171d2b" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11 2 12z"/><path d="M9 26c0 2 1.5 2 2.5 4 2.5 4 1 5.5 1 5.5h20s-1.5-1.5 1-5.5c1-2 2.5-2 2.5-4"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="8" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/><path d="M11 38.5h23" stroke="#a0aec0"/></g></svg>`,
  'bR': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#171d2b" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zm3-3v-11.5l2-1.5h17l2 1.5V36H12zm0-15l-1.5-6h23l-1.5 6H12zm2-6V9h4v3h5V9h4v3h5V9h4v5H14z"/><path d="M14 29.5v-13h17v13H14z" stroke="#a0aec0"/></g></svg>`,
  'bB': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#171d2b" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.94 3-2 3-2zM15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/><path d="M17.5 26h10M15 30h15m-7.5-14.5v5m-3-2.5h6" stroke="#a0aec0"/></g></svg>`,
  'bN': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#171d2b" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0-.97 1.44-1.97 1-1-1.5 1-3 0-4-.5 0-.53.5-.97 1-.6.7-1 1-1 0-.1-1.03.88-2.6 1.97-4 1.5-2 3-4 6-5 2.5-1 3.5-2 4-4 .5-1 .5-2 2-2z"/><circle cx="9.5" cy="25.5" r="1" fill="#a0aec0"/></g></svg>`,
  'bP': `<svg viewBox="0 0 45 45" width="36" height="36"><g fill="#171d2b" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.95 1.12-3.28 3.21-3.28 5.62 0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h24c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/></g></svg>`
};

// Initial Standard Board Setup
const INITIAL_BOARD = [
  ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
  ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
  ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
];

// Tactical Position Setup (Home 1 Demo)
const TACTICAL_POSITION = [
  [null, null, null, null, null, 'bR', 'bK', null],
  ['bP', 'bP', null, null, 'bQ', 'bP', 'bP', 'bP'],
  [null, null, 'bP', null, null, 'bN', null, null],
  [null, null, null, 'bP', 'wP', null, null, null],
  [null, null, 'wB', null, null, null, null, null],
  [null, null, 'wN', null, null, null, null, null],
  ['wP', 'wP', 'wP', null, null, 'wP', 'wP', 'wP'],
  ['wR', null, 'wB', 'wQ', null, 'wR', 'wK', null]
];

document.addEventListener('DOMContentLoaded', () => {
  initInteractiveBoards();
  initDigitalAiBoard();
  initPuzzleWidget();
});

/* ------------------------------------------------------------
   Interactive Chess Board Generator
   ------------------------------------------------------------ */
function initInteractiveBoards() {
  const containers = document.querySelectorAll('.interactive-chess-board');
  containers.forEach(container => {
    let boardState = JSON.parse(JSON.stringify(TACTICAL_POSITION));
    let selectedSquare = null;
    let turn = 'w';

    const render = () => {
      container.innerHTML = '';
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const sq = document.createElement('div');
          const isLight = (r + c) % 2 === 0;
          sq.className = `chess-square ${isLight ? 'light' : 'dark'}`;
          sq.dataset.row = r;
          sq.dataset.col = c;

          // Square coordinate labels
          if (c === 7) {
            const rankLabel = document.createElement('span');
            rankLabel.className = 'coord-label rank';
            rankLabel.textContent = 8 - r;
            sq.appendChild(rankLabel);
          }
          if (r === 7) {
            const fileLabel = document.createElement('span');
            fileLabel.className = 'coord-label file';
            fileLabel.textContent = String.fromCharCode(97 + c);
            sq.appendChild(fileLabel);
          }

          // Piece
          const piece = boardState[r][c];
          if (piece && CHESS_PIECES[piece]) {
            const pieceDiv = document.createElement('div');
            pieceDiv.className = 'chess-piece';
            pieceDiv.innerHTML = CHESS_PIECES[piece];
            sq.appendChild(pieceDiv);
          }

          // Square click interaction
          sq.addEventListener('click', () => {
            handleSquareClick(r, c);
          });

          container.appendChild(sq);
        }
      }
    };

    const handleSquareClick = (r, c) => {
      const clickedPiece = boardState[r][c];

      if (selectedSquare) {
        const [prevR, prevC] = selectedSquare;

        // Move to target square
        if (prevR !== r || prevC !== c) {
          const pieceToMove = boardState[prevR][prevC];
          boardState[r][c] = pieceToMove;
          boardState[prevR][prevC] = null;
          selectedSquare = null;
          render();
          
          if (window.showCheckmateToast) {
            const files = ['a','b','c','d','e','f','g','h'];
            window.showCheckmateToast(`Moved to ${files[c]}${8 - r}`, 'success');
          }
          return;
        } else {
          // Deselect
          selectedSquare = null;
          clearHighlights();
          return;
        }
      }

      if (clickedPiece) {
        selectedSquare = [r, c];
        highlightSquare(r, c);
      }
    };

    const highlightSquare = (r, c) => {
      clearHighlights();
      const sq = container.querySelector(`[data-row="${r}"][data-col="${c}"]`);
      if (sq) sq.classList.add('selected');

      // Highlight pseudo-legal moves for visual delight
      const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, 1], [-1, 1], [1, -1], [-2, 1], [-2, -1]];
      deltas.forEach(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const targetSq = container.querySelector(`[data-row="${nr}"][data-col="${nc}"]`);
          if (targetSq) targetSq.classList.add('highlight-target');
        }
      });
    };

    const clearHighlights = () => {
      container.querySelectorAll('.chess-square').forEach(s => {
        s.classList.remove('selected');
        s.classList.remove('highlight-target');
      });
    };

    // Reset button hook
    const resetBtn = document.querySelector('[data-board-reset]');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        boardState = JSON.parse(JSON.stringify(INITIAL_BOARD));
        selectedSquare = null;
        render();
      });
    }

    render();
  });
}

/* ------------------------------------------------------------
   Home 2 Digital EdTech AI Board Engine
   ------------------------------------------------------------ */
function initDigitalAiBoard() {
  const digitalBoard = document.getElementById('digital-ai-board');
  const evalFill = document.querySelector('.eval-fill-white');
  const evalScoreTag = document.querySelector('.eval-score-tag');
  const clockWhite = document.getElementById('clock-white');
  const clockBlack = document.getElementById('clock-black');

  if (!digitalBoard) return;

  // Digital Chess Clock Countdown
  let wSeconds = 300; // 5 mins blitz
  let bSeconds = 294;
  let activeSide = 'w';

  setInterval(() => {
    if (activeSide === 'w') {
      if (wSeconds > 0) wSeconds--;
    } else {
      if (bSeconds > 0) bSeconds--;
    }

    const formatClock = (sec) => {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    if (clockWhite) clockWhite.textContent = formatClock(wSeconds);
    if (clockBlack) clockBlack.textContent = formatClock(bSeconds);
  }, 1000);

  // Subtle dynamic evaluation bar pulse
  if (evalFill && evalScoreTag) {
    let evalScores = ['+1.8', '+2.1', '+1.9', '+2.4', '+2.0'];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % evalScores.length;
      evalScoreTag.textContent = evalScores[idx];
      evalFill.style.height = `${60 + (idx * 2)}%`;
    }, 4000);
  }
}

/* ------------------------------------------------------------
   Interactive Chess Tactics Puzzle Widget
   ------------------------------------------------------------ */
function initPuzzleWidget() {
  const puzzleBoard = document.getElementById('tactics-puzzle-board');
  if (!puzzleBoard) return;

  // Puzzle: White to move & Mate in 1 (Queen checkmate Qh7#)
  const puzzleSetup = [
    [null, null, null, null, null, 'bR', 'bK', null],
    ['bP', 'bP', 'bP', null, null, 'bP', 'bP', 'bP'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, 'wN', null, null],
    ['wP', 'wP', 'wP', null, null, 'wP', 'wP', 'wP'],
    ['wR', null, 'wB', 'wQ', null, 'wR', 'wK', null]
  ];

  let solved = false;

  const renderPuzzle = () => {
    puzzleBoard.innerHTML = '';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const sq = document.createElement('div');
        const isLight = (r + c) % 2 === 0;
        sq.className = `chess-square ${isLight ? 'light' : 'dark'}`;
        sq.dataset.row = r;
        sq.dataset.col = c;

        const piece = puzzleSetup[r][c];
        if (piece && CHESS_PIECES[piece]) {
          const p = document.createElement('div');
          p.className = 'chess-piece';
          p.innerHTML = CHESS_PIECES[piece];
          sq.appendChild(p);
        }

        sq.addEventListener('click', () => {
          if (solved) return;
          // Click on Queen (7, 3) or target
          if (r === 1 && c === 7) { // h7 square
            puzzleSetup[1][7] = 'wQ';
            puzzleSetup[7][3] = null;
            solved = true;
            renderPuzzle();
            if (window.showCheckmateToast) {
              window.showCheckmateToast('♟️ Checkmate! Outstanding tactical vision!', 'success');
            }
          }
        });

        puzzleBoard.appendChild(sq);
      }
    }
  };

  renderPuzzle();
}

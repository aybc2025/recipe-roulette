import React from 'react';

export default function SpinButton({ onSpin, isSpinning, count }) {
  return (
    <div className="spin-section">
      <button
        className={`spin-btn ${isSpinning ? 'spinning' : ''}`}
        onClick={onSpin}
        disabled={isSpinning || count === 0}
        aria-label="הגרל מתכון"
      >
        <span className="spin-dice">{isSpinning ? '🎲' : '🎲'}</span>
        <span className="spin-text">
          {isSpinning ? 'מגריל...' : 'הגרל מתכון!'}
        </span>
      </button>
      {count > 0 && (
        <p className="spin-hint">{count} מתכונים זמינים</p>
      )}
      {count === 0 && (
        <p className="spin-hint empty">אין מתכונים תואמים</p>
      )}
    </div>
  );
}

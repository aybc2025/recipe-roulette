import React, { useEffect } from 'react';

export default function RecipeModal({ recipe, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!recipe) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="סגור">✕</button>
        <div className="modal-emoji">{recipe.emoji}</div>
        <h2 className="modal-title">{recipe.name}</h2>
        <div className="modal-details">
          <div className="modal-stat">
            <span className="stat-icon">⏱</span>
            <span>{recipe.time} דקות</span>
          </div>
          <div className="modal-stat">
            <span className="stat-icon">🗂</span>
            <span>{recipe.category}</span>
          </div>
        </div>
        <div className="modal-tags">
          {recipe.tags.map(tag => (
            <span key={tag} className="tag tag-large">{tag}</span>
          ))}
        </div>
        <p className="modal-note">מצאת את המתכון שלך! 🎉</p>
      </div>
    </div>
  );
}

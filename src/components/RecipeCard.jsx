import React from 'react';

export default function RecipeCard({ recipe, onClick, highlight }) {
  return (
    <button
      className={`recipe-card ${highlight ? 'highlighted' : ''}`}
      onClick={() => onClick(recipe)}
      aria-label={`בחר ${recipe.name}`}
    >
      <span className="recipe-emoji">{recipe.emoji}</span>
      <div className="recipe-info">
        <h3 className="recipe-name">{recipe.name}</h3>
        <div className="recipe-meta">
          <span className="recipe-time">⏱ {recipe.time} דקות</span>
          <span className="recipe-category">{recipe.category}</span>
        </div>
        <div className="recipe-tags">
          {recipe.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

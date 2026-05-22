import React from 'react';
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes, categories, category, setCategory, search, setSearch, onSelect }) {
  return (
    <section className="list-section">
      <div className="filters">
        <input
          className="search-input"
          type="text"
          placeholder="חפש מתכון..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="חיפוש מתכון"
        />
        <div className="category-pills" role="group" aria-label="קטגוריות">
          {categories.map(cat => (
            <button
              key={cat}
              className={`pill ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="recipes-grid" role="list">
        {recipes.length === 0 ? (
          <div className="empty-state">
            <span>😶</span>
            <p>לא נמצאו מתכונים</p>
          </div>
        ) : (
          recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={onSelect}
            />
          ))
        )}
      </div>
    </section>
  );
}

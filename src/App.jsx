import React, { useState } from 'react';
import { useRecipes } from './hooks/useRecipes';
import RecipeList from './components/RecipeList';
import SpinButton from './components/SpinButton';
import RecipeModal from './components/RecipeModal';

export default function App() {
  const {
    recipes, categories,
    search, setSearch,
    category, setCategory,
    winner, isSpinning,
    spin, clearWinner,
  } = useRecipes();

  const [selected, setSelected] = useState(null);

  const handleSelect = (recipe) => setSelected(recipe);
  const handleClose = () => { setSelected(null); clearWinner(); };
  const shownModal = selected || winner;

  return (
    <div className="app" dir="rtl" lang="he">
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">🍽️ מה לבשל היום?</h1>
          <p className="tagline">סיום המחשבה הבלתי פוסקת</p>
        </div>
      </header>

      <main className="main">
        <SpinButton
          onSpin={spin}
          isSpinning={isSpinning}
          count={recipes.length}
        />

        <RecipeList
          recipes={recipes}
          categories={categories}
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          onSelect={handleSelect}
        />
      </main>

      {shownModal && (
        <RecipeModal recipe={shownModal} onClose={handleClose} />
      )}
    </div>
  );
}

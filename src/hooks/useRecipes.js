import { useState, useMemo } from 'react';
import data from '../data/recipes.json';

export function useRecipes() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('הכל');
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const filtered = useMemo(() => {
    return data.recipes.filter((r) => {
      const matchSearch = r.name.includes(search) || r.tags.some(t => t.includes(search));
      const matchCat = category === 'הכל' || r.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  const spin = () => {
    if (isSpinning || filtered.length === 0) return;
    setIsSpinning(true);
    setWinner(null);

    const duration = 2000;
    setTimeout(() => {
      const picked = filtered[Math.floor(Math.random() * filtered.length)];
      setWinner(picked);
      setIsSpinning(false);
    }, duration);
  };

  const clearWinner = () => setWinner(null);

  return {
    recipes: filtered,
    allRecipes: data.recipes,
    categories: data.categories,
    search,
    setSearch,
    category,
    setCategory,
    winner,
    isSpinning,
    spin,
    clearWinner,
  };
}

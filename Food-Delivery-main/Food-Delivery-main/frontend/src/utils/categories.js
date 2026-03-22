export function getCategoriesFromFoods(foods) {
  const set = new Set();

  foods.forEach((food) => {
    if (food.category) {
      set.add(food.category.trim());
    }
  });

  return ["All", ...Array.from(set)];
}
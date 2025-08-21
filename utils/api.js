const BASE = "https://www.themealdb.com/api/json/v1/1";

export async function searchMealsByName(q) {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(q)}`);
  const json = await res.json();
  return json?.meals || [];
}

export async function lookupMealById(id) {
  const res = await fetch(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`);
  const json = await res.json();
  return json?.meals?.[0] || null;
}

export async function listCategories() {
  const res = await fetch(`${BASE}/list.php?c=list`);
  const json = await res.json();
  return (json?.meals || []).map((m) => m.strCategory);
}

export async function filterByCategory(cat) {
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(cat)}`);
  const json = await res.json();
  // filter endpoint returns fewer fields; map to minimal shape
  return (json?.meals || []).map((m) => ({
    idMeal: m.idMeal,
    strMeal: m.strMeal,
    strMealThumb: m.strMealThumb,
    strCategory: cat,
    strArea: "",
  }));
}


export async function filterByArea(area) {
  const res = await fetch(`${BASE}/filter.php?a=${encodeURIComponent(area)}`);
  const json = await res.json();
  // filter endpoint returns fewer fields; map to minimal shape
  return (json?.meals || []).map((m) => ({
    idMeal: m.idMeal,
    strMeal: m.strMeal,
    strMealThumb: m.strMealThumb,
    strCategory: "", // category yahan nahi aata
    strArea: area,   // area ko set kar do
  }));
}

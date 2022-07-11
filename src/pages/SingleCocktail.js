import React, { useState } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useCallback } from 'react';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const [loading, setLoading] = useState(true);
  const [drink, setDrink] = useState(null);
  const { id } = useParams();

  const fetchDrink = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${url}${id}`);
      const data = await resp.json();
      const { drinks } = data;
      if (drinks) {
        console.log(drinks);
        const {
          strDrink: name,
          strCategory: category,
          strAlcoholic: info,
          strGlass: glass,
          strInstructions: instructions,
          strDrinkThumb: img,
        } = drinks[0];
        const {
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
          strIngredient6,
        } = drinks[0];
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
          strIngredient6,
        ];
        const newDrink = {
          name,
          category,
          info,
          glass,
          instructions,
          ingredients,
          img,
        };
        setDrink(newDrink);
      } else {
        setDrink(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDrink();
  }, [fetchDrink]);

  if (loading) {
    return <Loading />;
  }
  if (!drink) {
    return <h2 className='section-title'>no cocktail to display</h2>;
  } else {
    const { name, category, info, glass, instructions, ingredients, img } =
      drink;
    return (
      <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='drink'>
          <img src={img} alt={name}></img>
          <div className='drink-info'>
            <p>
              <span className='drink-data'>name :</span> {name}
            </p>
            <p>
              <span className='drink-data'>category :</span> {category}
            </p>
            <p>
              <span className='drink-data'>info :</span> {info}
            </p>
            <p>
              <span className='drink-data'>glass :</span> {glass}
            </p>
            <p>
              <span className='drink-data'>instructons :</span> {instructions}
            </p>
            <p>
              <span className='drink-data'>ingredients :</span>
              {ingredients}
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default SingleCocktail;

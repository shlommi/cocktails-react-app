import React, { useRef, useEffect } from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const inputEl = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='drink-name'>Search your favorite cocktail</label>
          <input
            type='text'
            ref={inputEl}
            id='drink-name'
            onChange={(e) => setSearchTerm(inputEl.current.value)}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;

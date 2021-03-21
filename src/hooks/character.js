import { useCallback, useState } from 'react';
import Quotes from '../assets/quotes/quotes.json';
const randomColor = require('randomcolor');
const generate = require('project-name-generator');

const TotalQuotes = Quotes.quotes;

let name = generate({ words: 2, alliterative: true }).spaced

const [_name, setNameIn] = useState(name)
const [_quote, setQuoteIn] = useState(null)
const [_color, setColorIn] =useState(randomColor())
const [_backgroundColor, setBackgroundIn] = useState(randomColor())

const useCharacter = () => {

  const setName = (name) => setNameIn(name);

  const setColor = (color) => setColorIn(color)

  const setBackgroundColor = (backgroundColor) => setBackgroundIn(backgroundColor)

  const setQuote = useCallback(() => {
    let randomNumber = Math.floor(Math.random() * TotalQuotes.length + 1);
    let quote = TotalQuotes[randomNumber].quote;
    setQuoteIn(quote)
  }, []);

  return {
    name: _name,
    color: _color,
    backgroundColor: _backgroundColor,
    quote: _quote,
    setName,
    setColor,
    setBackgroundColor,
    setQuote,
  };
};

export default useCharacter;

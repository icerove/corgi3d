import { useCallback, useState } from 'react';
import Quotes from '../assets/quotes/quotes.json';
const randomColor = require('randomcolor');
const generate = require('project-name-generator');

const TotalQuotes = Quotes.quotes;

let nameIn = generate({ words: 2, alliterative: true }).spaced

const useCharacter = () => {

  const [name, setName] = useState(nameIn)
  const [color, setColor] =useState(randomColor())
  const [backgroundColor, setBackgroundColor] = useState(randomColor())
  const [quote, setQuoteIn] = useState(null)


  const setQuote = useCallback(() => {
    let randomNumber = Math.floor(Math.random() * TotalQuotes.length + 1);
    let quote = TotalQuotes[randomNumber].quote;
    setQuoteIn(quote)
  }, []);

  return {
    name,
    color,
    backgroundColor,
    quote,
    setName,
    setColor,
    setBackgroundColor,
    setQuote,
  };
};

export default useCharacter;

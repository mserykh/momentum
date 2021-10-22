const quoteText = document.querySelector('.js-quote-text');
const quoteAuthor = document.querySelector('.js-quote-author');
const quoteBtn = document.querySelector('.js-quote-btn');
let quotesNumber;
let randomQuote;

async function getQuotes() {
  const quotes = 'https://type.fit/api/quotes';
  const res = await fetch(quotes);
  const data = await res.json();
  quotesNumber = data.length;
  getRandomQuote();
  
  quoteText.textContent = data[randomQuote].text;
  quoteAuthor.textContent = data[randomQuote].author;

}

function getRandomQuote() {
  randomQuote = Math.floor(Math.random() * quotesNumber + 1);
}

document.addEventListener('DOMContentLoaded', getQuotes);
quoteBtn.addEventListener('click', getQuotes);

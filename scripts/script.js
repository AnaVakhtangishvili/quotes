let quotesArr = [];
let quoteBox = document.getElementById('quote-box');
let quoteTxt = document.getElementById('quote');
let authorTxt = document.getElementById('author');
let twitterIcon = document.getElementById('twitter');
let quoteBtn = document.getElementById('next');
let loader = document.getElementById('loader');


function load() {
  loader.hidden = false;
  quoteBox.hidden = true;
}

function completeLoad() {
  loader.hidden = true;
  quoteBox.hidden = false;
}

function randomQuote() {
  load();
  const randQuote = quotesArr[Math.floor(Math.random() * quotesArr.length)];
  if (!randQuote.author) {
    authorTxt.textContent = 'Unknown';
  } else {
  authorTxt.textContent = randQuote.author;
  }
  if (randQuote.text.length > 80) {
    quoteTxt.classList.add('long');
    authorTxt.classList.add('long-author');
  } else {
    quoteTxt.classList.remove('long');
    authorTxt.classList.remove('long-author');
  }
  quoteTxt.textContent = randQuote.text;
  completeLoad();
}

function tweet() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTxt.textContent} - ${authorTxt.textContent}`
  window.open(twitterUrl, '-blank');
}

 async function quotes() {
  load();
  const quotesUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(quotesUrl);
    quotesArr = await response.json();
    randomQuote();
  } catch (error) {
    console.log(error);
    quotes();
  }
 }


 twitterIcon.addEventListener('click', tweet);
 quoteBtn.addEventListener('click', randomQuote);
 
quotes();
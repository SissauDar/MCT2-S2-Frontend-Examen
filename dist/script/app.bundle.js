const colorChanger = (function() {

  let linkHolder = null,
    svgHolder = null,
    currentColorText = '#222222',
    currentBackgroundColor = '#ffffff';


  const setup = function({
    link,
    svg,
    app
  }) {
    linkHolder = document.querySelectorAll(`.${link}`);
    svgHolder = document.querySelectorAll(`.${svg}`);
    setClickEvents();
    getSavedColors();
  };

  const getSavedColors = function() {
    if (localStorage.has('textColor')) {
      currentColorText = localStorage.get('textColor');
    }
    if (localStorage.has('backgroundColor')) {
      currentBackgroundColor = localStorage.get('backgroundColor');
    }
    changeColors();



  };

  const setClickEvents = function() {

    linkHolder.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });

    svgHolder.forEach((svg) => {
      svg.addEventListener('click', function() {

        currentColorText = this.getAttribute("fill");
        currentBackgroundColor = this.getAttribute("data-background");
        localStorage.set('textColor', currentColorText);
        localStorage.set('backgroundColor', currentBackgroundColor);
        changeColors()
      });
    });

  };

  const changeColors = function() {
    document.documentElement.style.setProperty('--main-color-text', currentColorText);
    document.documentElement.style.setProperty('--main-color-background', currentBackgroundColor);
  };

  return {
    setup: setup
  };

})();
const dataAccess = (function() {

  // API call
  const quoteAPI = ({
    url,
    method = "GET",
    body = null,
    handleError = "Error: "
  }) => {
    return fetch(url, {
        method: method,
        body: body,
        cache: 'no-cache'
      })
      .then(response => response.json())
      .then(data => data)
      .catch(err => handleError(err));

  };



  return {
    quoteAPI: quoteAPI,
  }
})();
class Quote {
  constructor({
    content,
    author
  }) {
    Object.assign(this, {
      content,
      author
    });
  }


  generateDOMNode() {
    let quote = document.createElement('div');

    let content = document.createElement('h1');
    content.setAttribute('class', 'c-quote__content');
    content.innerHTML += `
    ${this.content}
    `;

    let author = document.createElement('p');
    author.setAttribute('class', 'c-quote__author');
    author.innerHTML += `
    ${this.author}
    `;

    quote.appendChild(content);
    quote.appendChild(author);

    return quote;
  }
}
const quoteModule = (function() {

  let quoteHolder = null;
  let quoteButton = null;

  const setUp = function(quoteHolderClass, quoteButtonClass) {
    quoteHolder = document.querySelector(`.${quoteHolderClass}`);
    quoteButton = document.querySelector(`.${quoteButtonClass}`);
    addEventListener()
    generateQuote();
  };

  const addEventListener = function() {
    quoteButton.addEventListener('click', () => {
      console.log('Punched me 🥊');
      generateQuote();

    });
  };

  const getQuote = function() {
    return dataAccess.quoteAPI({
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      handleError: (error) => console.log('Something went wrong: ', error),
    });
  };

  const generateQuote = async function() {
    const data = await getQuote();
    data.forEach(function(item) {
      const newQuote = new Quote({
        content: item.content,
        author: item.title
      });
      addQuoteToPage(newQuote)
    });
  };

  const addQuoteToPage = function(quote) {
    quoteHolder.innerHTML = '';
    quoteHolder.appendChild(quote.generateDOMNode());


  };

  return {
    setUp: setUp,
  };

})();
const localStorage = (function() {

  const get = (name) => {
    return this.localStorage.getItem(name);
  };

  const set = (key, name) => {
    this.localStorage.setItem(key, name);
  };

  const del = (key) => {
    this.localStorage.removeItem(key);
  };

  const has = (key) => {
    if (this.localStorage.getItem(key)) {
      return true
    } else {
      return false
    }
  };

  return {
    get: get,
    set: set,
    del: del,
    has: has
  };

})();
// URL http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1

(function() {



  document.addEventListener('DOMContentLoaded', async () => {
    console.log('Script loaded ✔');

    colorChanger.setup({
      link: 'js-colorlink',
      svg: 'js-colorsvg',
      app: 'js-background'
    });

    quoteModule.setUp('js-quote', 'js-newQuote')


  });

  return {

  };

})();
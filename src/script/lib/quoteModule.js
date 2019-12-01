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
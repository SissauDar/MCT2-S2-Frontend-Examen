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
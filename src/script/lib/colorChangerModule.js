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
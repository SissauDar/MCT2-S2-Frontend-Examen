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
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  createForm();
  const submitNewBook = document.querySelector('#submit');
  function pushBook() {
    const bookName = document.querySelector('#bookName');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    if (bookName.value == '') {
      bookName.value = 'No Name';
    }
    if (author.value == '') {
      author.value = 'No Author';
    }
    if (pages.value == '') {
      pages.value = 'No';
    }
    const addBook = new Book(bookName.value, author.value, pages.value, false);
    myLibrary.push(addBook);
    const newBook = document.querySelector('#newBook');
    newBook.removeEventListener('click', addBookToLibrary);
    const addToLib = document.querySelector('#add');
    addToLib.outerHTML = '';
    displayBooks();
  }
  submitNewBook.addEventListener('click', pushBook, {
    once: true,
  });
}

function createForm() {
  const addDiv = document.querySelector('#add');
  const div = document.createElement('div');
  addDiv.appendChild(div);
  div.id = 'newBookDetails';
  const form = document.createElement('form');
  form.id = 'bookForm';
  form.style.opacity = '0%';
  for (let i = 0; i < 3; i++) {
    let text;
    let id;
    switch (i) {
      case 0:
        text = 'Book Name: ';
        id = 'bookNameLabel';
        break;
      case 1:
        text = 'Author: ';
        id = 'authorLabel';
        break;
      case 2:
        text = 'Number of Pages: ';
        id = 'pagesLabel';
        break;
    }
    const label = document.createElement('label');
    label.textContent = text;
    label.id = id;
    form.appendChild(label);
    function insertLineBreaks() {
      for (let i = 0; i < 2; i++) {
        const lineBreak = document.createElement('br');
        form.appendChild(lineBreak);
      }
    }
    insertLineBreaks();
    const input = document.createElement('input');
    input.form = 'bookForm';
    input.placeholder = text.slice(0, -2);
    input.id = id.slice(0, -5);
    form.appendChild(input);
    insertLineBreaks();
  }
  const submit = document.createElement('input');
  submit.form = 'bookForm';
  submit.type = 'button';
  submit.value = 'Add To Library';
  submit.id = 'submit';
  form.appendChild(submit);
  div.appendChild(form);
  function fadeIn() {
    let opacity = 0;
    let id = setInterval(fade, 1);
    function fade() {
      if (opacity == 100) {
        clearInterval(id);
      } else {
        opacity++;
        form.style.opacity = opacity + '%';
      }
    }
  }
  fadeIn();
}

function displayBooks() {
  const books = document.querySelector('.books');
  function generateBookTile(index, slice) {
    const div = document.createElement('div');
    books.appendChild(div);
    div.classList.add(`bookItem`);
    div.id = `bookItem-${myLibrary.length}`;
    const h2 = document.createElement('h2');
    div.appendChild(h2);
    h2.textContent = myLibrary[index - slice].title;
    const authorText = document.createElement('p');
    div.appendChild(authorText);
    authorText.textContent = myLibrary[index - slice].author;
    authorText.classList.add('author');
    const readButton = document.createElement('button');
    div.appendChild(readButton);
    readButton.classList.add('read');
    readButton.id = `read-${myLibrary.length - 1}`;
    readButton.textContent = 'Read';
    readButton.addEventListener('click', function () {
      const index = Number(readButton.id.slice(5));
      if (myLibrary[index].read === true) {
        function fadeOut() {
          const readIndicator = document.querySelector(`#hasRead-${index + 1}`);
          console.log(readIndicator);
          let opacity = 100;
          let padding = 20;
          let pushTimer = setInterval(pushUp, 5);
          let fadeTimer = setInterval(fade, 1);
          function fade() {
            if (opacity == 0) {
              clearInterval(fadeTimer);
              readIndicator.remove();
            } else {
              opacity--;
              readIndicator.style.opacity = opacity + '%';
            }
          }
          function pushUp() {
            if (padding == 7) {
              clearInterval(pushTimer);
            } else {
              padding--;
              readIndicator.style.paddingBottom = padding + 'px';
            }
          }
        }
        readButton.textContent = 'Read';
        fadeOut();
        myLibrary[index].read = false;
        return;
      }
      myLibrary[index].read = true;
      readButton.textContent = 'Unread';
      const hasReadIndicator = document.createElement('span');
      hasReadIndicator.classList.add('hasRead');
      hasReadIndicator.id = `hasRead-${myLibrary.length}`;
      hasReadIndicator.textContent = '✓';
      hasReadIndicator.style.opacity = '0';
      div.appendChild(hasReadIndicator);
      function fadeIn() {
        let opacity = 0;
        let padding = 0;
        let pushTimer = setInterval(pushDown, 5);
        let fadeTimer = setInterval(fade, 1);
        function fade() {
          if (opacity == 100) {
            clearInterval(fadeTimer);
          } else {
            opacity++;
            hasReadIndicator.style.opacity = opacity + '%';
          }
        }
        function pushDown() {
          if (padding == 20) {
            clearInterval(pushTimer);
          } else {
            padding++;
            hasReadIndicator.style.paddingBottom = padding + 'px';
          }
        }
      }
      fadeIn();
    });
    const pagesText = document.createElement('p');
    div.appendChild(pagesText);
    pagesText.textContent = `${myLibrary[index - slice].pages} pages`;
    pagesText.classList.add('pages');
    const deleteButton = document.createElement('button');
    div.appendChild(deleteButton);
    deleteButton.classList.add('deleteBook');
    deleteButton.textContent = 'X';
    deleteButton.id = `delete-${myLibrary.length}`;
    deleteButton.addEventListener('click', function () {
      const index = deleteButton.id.slice(7);
      myLibrary.splice(myLibrary.indexOf(index), 1);
      const bookTile = document.querySelector(`#bookItem-${index}`);
      bookTile.remove();
    });
  }
  switch (myLibrary.length) {
    case 0:
      break;
    case 1:
      generateBookTile(0, 0);
      break;
    default:
      generateBookTile(myLibrary.length, 1);
      break;
  }
  const addToLibrary = document.createElement('div');
  const newBookButton = document.createElement('button');
  books.appendChild(addToLibrary);
  addToLibrary.appendChild(newBookButton);
  addToLibrary.id = 'add';
  newBookButton.id = 'newBook';
  newBookButton.textContent = '+';
  newBookButton.addEventListener('click', addBookToLibrary);
}

displayBooks();

function identifyBookRead() {}

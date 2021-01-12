let myLibrary = [];
let canUseStorage = true;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  createForm();
  const submitNewBook = document.querySelector('#submit');
  function pushCreatedBook() {
    const bookName = document.querySelector('#bookName');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    if (bookName.value == '') {
      bookName.value = `No Name ${myLibrary.length + 1}`;
    }
    if (author.value == '') {
      author.value = `No Author`;
    }
    if (pages.value == '') {
      pages.value = `No`;
    }
    const addBook = new Book(bookName.value, author.value, pages.value, false);
    myLibrary.push(addBook);
    if (canUseStorage) {
      localStorage.setItem(`Book-${myLibrary.length - 1}`, JSON.stringify(addBook));
    }
    const newBook = document.querySelector('#newBook');
    newBook.removeEventListener('click', addBookToLibrary);
    const addToLib = document.querySelector('#add');
    addToLib.outerHTML = '';
    displayBooks();
  }
  submitNewBook.addEventListener('click', pushCreatedBook, {
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
  if (canUseStorage) {
    for (let i = 0; i < myLibrary.length; i++) {
      if (document.getElementById(`bookItem-${i}`)) {
        continue;
      }
      switch (myLibrary.length) {
        case 0:
          break;
        case 1:
          generateBookTile(0, 0, i);
          break;
        default:
          generateBookTile(i + 1, 1, i);
          break;
      }
    }
    const addToLibrary = document.createElement('div');
    const newBookButton = document.createElement('button');
    books.appendChild(addToLibrary);
    addToLibrary.appendChild(newBookButton);
    addToLibrary.id = 'add';
    newBookButton.id = 'newBook';
    newBookButton.textContent = '+';
    newBookButton.addEventListener('click', addBookToLibrary);
    return;
  }
  function generateBookTile(index, slice, iteration) {
    const div = document.createElement('div');
    books.appendChild(div);
    div.classList.add(`bookItem`);
    if (canUseStorage) {
      div.id = `bookItem-${iteration}`;
    } else {
      div.id = `bookItem-${myLibrary.length}`;
    }
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
    if (canUseStorage) {
      readButton.id = `read-${iteration}`;
    } else {
      readButton.id = `read-${myLibrary.length - 1}`;
    }
    readButton.textContent = 'Read';
    readButton.addEventListener('click', function (e) {
      const index = Number(e.toElement.id.slice(5));
      const bookObject = localStorage.getItem(`Book-${index}`);
      if (myLibrary[index].read == true || JSON.parse(bookObject).read == true) {
        function fadeOut() {
          const readIndicator = document.querySelector(`#hasRead-${index}`);
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
        if (canUseStorage) {
          const bookObject = JSON.parse(localStorage.getItem(`Book-${index}`));
          bookObject.read = false;
          localStorage.setItem(`Book-${index}`, JSON.stringify(bookObject));
        }
        return;
      }
      myLibrary[index].read = true;
      if (canUseStorage) {
        const bookObject = JSON.parse(localStorage.getItem(`Book-${index}`));
        bookObject.read = true;
        localStorage.setItem(`Book-${index}`, JSON.stringify(bookObject));
      }
      readButton.textContent = 'Unread';
      const hasReadIndicator = document.createElement('span');
      hasReadIndicator.classList.add('hasRead');
      hasReadIndicator.id = `hasRead-${index}`;
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
    if (canUseStorage) {
      deleteButton.id = `delete-${iteration}`;
    } else {
      deleteButton.id = `delete-${myLibrary.length}`;
    }
    deleteButton.addEventListener('click', function () {
      const index = deleteButton.id.slice(7);
      if (canUseStorage) {
        myLibrary.splice(myLibrary.indexOf(iteration), 1);
        console.log(iteration);
        const bookTile = document.querySelector(`#bookItem-${iteration}`);
        bookTile.remove();
        if (localStorage.length > 1) {
          localStorage.removeItem(`Book-${iteration}`);
        } else {
          const bookId = localStorage.key(0);
          localStorage.removeItem(bookId);
        }
      } else {
        myLibrary.splice(myLibrary.indexOf(index), 1);
        const bookTile = document.querySelector(`#bookItem-${index}`);
        bookTile.remove();
      }
    });
  }
  switch (myLibrary.length) {
    case 0:
      break;
    case 1:
      generateBookTile(0, 0);
      break;
    default:
      generateBookTile(i + 1, 1);
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

function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      storage &&
      storage.length !== 0
    );
  }
}

(function pushBooks() {
  if (storageAvailable('localStorage')) {
    canUseStorage = true;
    if (localStorage.length) {
      if (localStorage.length > 1) {
        for (let i = 0; i < localStorage.length; i++) {
          let bookId = localStorage.key(i);
          console.log(bookId);
          const bookObject = JSON.parse(localStorage.getItem(`${bookId}`));
          console.log(bookObject);
          const addBook = new Book(
            bookObject.title,
            bookObject.author,
            bookObject.pages,
            bookObject.read
          );
          myLibrary.push(addBook);
        }
      } else {
        const bookId = localStorage.key(0);
        console.log(bookId);
        const bookObject = JSON.parse(localStorage.getItem(`Book-${bookId.slice(5)}`));
        console.log(bookObject);
        const addBook = new Book(
          bookObject.title,
          bookObject.author,
          bookObject.pages,
          bookObject.read
        );
        myLibrary.push(addBook);
      }
    }
    displayBooks();
  } else {
    canUseStorage = false;
    alert(
      'This project has local storage functionalities, however your browser does not support this. Books will be removed when the page refreshes.'
    );
    displayBooks();
  }
})();

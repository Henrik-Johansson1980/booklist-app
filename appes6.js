class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList (book) {
    // Get table body
    const list = document.getElementById("book-list");
    // Create table row
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">&times;</a></td>
    `;
    list.appendChild(row);
  }

  clearInputFields () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  showAlert (msg, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(msg));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
  
    // Timeout after three seconds
    setTimeout(()=>{
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook (target) {
    if(target.className === 'delete') {
      // Remove parent of parent (the table row)
      target.parentElement.parentElement.remove();
    }
  }
}

// Local Storage Class to persist booklist
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static displayBooks(){
    const books = Store.getBooks();
    const ui = new UI;
    books.forEach( (book) => {
      ui.addBookToList(book);
    });
  }
  static removeBook(isbn){
    const books = Store.getBooks();
    // Loop through and search for book isbn
    // and remove that element from array
    books.forEach( (book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    // Persist to storage
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//====================================================================
// Event listeners
//====================================================================

// DOm load event
document.addEventListener('DOMContentLoaded', Store.displayBooks());

// Event listener for Add Book
document.getElementById("book-form").addEventListener("submit", e => {
  e.preventDefault();
  // Get form data
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Book instance
  const book = new Book(title, author, isbn);
  // UI instance
  const ui = new UI();
  // Validate
  if (title === "" || (author === "") | (isbn === "")) {
    //Error alert
    ui.showAlert('Please fill in all the fields', 'error');

  } else {
    // UI add book to list
    ui.addBookToList(book);
    // ADD to local storage
    Store.addBook(book);
    // Clear input fields
    ui.clearInputFields();
    // Show success alert
    ui.showAlert('Book added successfully', 'success');
  }
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', e => {
  const ui = new UI();
  ui.deleteBook(e.target);
   
  // Remove from Local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Book removed', 'success');
  e.preventDefault();
})
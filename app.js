// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

//==============================================================
// UI prototype methods
//==============================================================

// Add book to list
UI.prototype.addBookToList = function(book) {
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
};

// Clear inputs
UI.prototype.clearInputFields = () => {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = (msg, className) => {
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
  setTimeout (() => {
    document.querySelector('.alert').remove();
  }, 3000);

}

UI.prototype.deleteBook = (target) => {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

//====================================================================
// Event listeners
//====================================================================

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
  ui.showAlert('Book removed', 'success');
  e.preventDefault();
})

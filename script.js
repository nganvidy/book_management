// Hardcoded credentials
const credentials = { username: "admin", password: "1234" };

// Book Data Storage
let books = JSON.parse(localStorage.getItem("books")) || [];

// DOM Elements
const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const filterInput = document.getElementById("filterInput");

// Login Functionality
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === credentials.username && password === credentials.password) {
    loginPage.classList.add("d-none");
    dashboard.classList.remove("d-none");
  } else {
    alert("Invalid credentials!");
  }
});

// Render Books
function renderBooks() {
  bookList.innerHTML = "";
  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(filterInput.value.toLowerCase())
  );

  filteredBooks.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>
            <button class="btn btn-info btn-sm" onclick="viewDetails(${book.id})">View Details</button>
        <button class="btn btn-warning btn-sm" onclick="editBook(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteBook(${index})">Delete</button>
      </td>
    `;
    bookList.appendChild(row);
  });
}

// Add/Edit Book
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookId = document.getElementById("bookId").value;
  const book = {
    name: document.getElementById("bookName").value,
    author: document.getElementById("author").value,
    genre: document.getElementById("genre").value,
  };

  if (bookId) {
    books[bookId] = book; // Edit
  } else {
    books.push(book); // Add
  }

  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
  clearForm();
  bootstrap.Modal.getInstance(document.getElementById("bookModal")).hide();
});

// Edit Book
function editBook(index) {
  const book = books[index];
  document.getElementById("bookId").value = index;
  document.getElementById("bookName").value = book.name;
  document.getElementById("author").value = book.author;
  document.getElementById("genre").value = book.genre;

  new bootstrap.Modal(document.getElementById("bookModal")).show();
}

// Delete Book
function deleteBook(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
  }
}

// Clear Form
function clearForm() {
  bookForm.reset();
  document.getElementById("bookId").value = "";
}

// Filter Books
filterInput.addEventListener("input", renderBooks);

// Initial Render
renderBooks();

  
  // Populate the book list dynamically
  function displayBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = ""; // Clear current list
    books.forEach((book) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>
          <button class="btn btn-info btn-sm" onclick="viewDetails(${book.id})">View Details</button>
          <button class="btn btn-warning btn-sm" onclick="editBook(${book.id})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">Delete</button>
        </td>
      `;
      bookList.appendChild(row);
    });
  }
  
  // View Details Function
  function viewDetails(bookId) {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      document.getElementById("detailBookName").textContent = book.name;
      document.getElementById("detailAuthor").textContent = book.author;
      document.getElementById("detailGenre").textContent = book.genre;
      document.getElementById("detailDescription").textContent = book.description || "No description available.";
      const detailModal = new bootstrap.Modal(document.getElementById("detailModal"));
      detailModal.show();
    }
  }
  
  // Call displayBooks on page load
  document.addEventListener("DOMContentLoaded", () => {
    displayBooks();
  });
  

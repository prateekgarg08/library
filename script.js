let myLibrary = [];
let index = 0;
function Book(title, author, pages, read = true) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

let tbody = displayToPage(myLibrary);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayToPage(library) {
  let where = document.querySelector("#display_table_container");
  let table = document.createElement("table");
  table.classList.add("styled-table");
  let header = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let headerRow = document.createElement("tr");
  headerRow.innerHTML = "<th>Title</th><th>Author</th><th>Pages</th><th>Delete</th><th>Read</th>";
  header.appendChild(headerRow);
  table.appendChild(header);
  table.appendChild(tbody);

  where.appendChild(table);

  for (let i = 0; i < library.length; i++) {
    let book = library[i];
    console.log(book);
    displayBookToPage(book, tbody);
  }

  return tbody;
}

function displayBookToPage(book, tbody) {
  let row = document.createElement("tr");
  row.dataset.index = myLibrary.indexOf(book);
  let titleTd = document.createElement("td");
  let authorTd = document.createElement("td");
  let pagesTd = document.createElement("td");
  let readTd = document.createElement("td");

  let delTd = document.createElement("td");
  //let readTd = document.createElement("td");

  let delButton = document.createElement("button");
  delButton.classList.add("del_button");

  delButton.setAttribute("type", "button");

  delButton.innerHTML = "Delete";

  let readButton = document.createElement("button");
  readButton.classList.add("read_button");
  readButton.setAttribute("type", "button");
  if (book.read) {
    readButton.innerHTML = "True";
  } else {
    readButton.innerHTML = "False";
  }

  titleTd.innerHTML = book.title;
  authorTd.innerHTML = book.author;
  pagesTd.innerHTML = book.pages;

  delTd.appendChild(delButton);
  readTd.appendChild(readButton);
  row.appendChild(titleTd);
  row.appendChild(authorTd);
  row.appendChild(pagesTd);
  row.appendChild(delTd);
  row.appendChild(readTd);
  tbody.appendChild(row);
  delButton.addEventListener("click", () => {
    console.log(book);
    const index = myLibrary.indexOf(book);
    if (index > -1) {
      console.log(index);
      myLibrary.splice(index, 1);
    }
    row.remove();
  });
  readButton.addEventListener("click", () => {
    book.toggleRead();
    if (book.read) {
      readButton.innerHTML = "True";
    } else {
      readButton.innerHTML = "False";
    }
  });
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function addBook(form) {
  let book = new Book(form.title.value, form.author.value, form.pages.value);
  addBookToLibrary(book);
  displayBookToPage(book, tbody);
  closeForm();
}

class Author {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

class Book {
    constructor(name, price, author) {
        this.name = name;
        this.price = price;
        this.author = author;
    }
}

let currentBookIndex = 0;
let books = [];

document.getElementById("numberOfBooksForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let numberOfBooks = parseInt(document.getElementById("numberOfBooks").value);
    displayBookForm(numberOfBooks);
    document.getElementById("numberOfBooksFormContainer").style.display = "none";
});

function displayBookForm(numberOfBooks) {
    let bookFormContainer = document.getElementById("bookFormContainer");
    bookFormContainer.style.display = "block";
    document.getElementById("bookForm").reset();
    document.getElementById("name").focus();

    document.getElementById("bookForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let name = document.getElementById("name").value;
        let price = document.getElementById("price").value;
        let authorName = document.getElementById("authorName").value;
        let authorEmail = document.getElementById("authorEmail").value;
        let author = new Author(authorName, authorEmail);
        let book = new Book(name, price, author);
        books.push(book);
        currentBookIndex++;
        if (currentBookIndex < numberOfBooks) {
            document.getElementById("bookForm").reset();
            document.getElementById("name").focus();
        } else {
            localStorage.setItem("books", JSON.stringify(books));
            displayBooks();
            document.getElementById("bookTable").style.display = "block";
            document.getElementById("bookTable").removeAttribute("display") = "block";
            document.getElementById("bookFormContainer").style.display = "none";
        }
    });
}


function displayBooks() {
    let table = document.getElementById("bookTable");
    table.innerHTML = "";
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.forEach((book, index) => {
        let row = table.insertRow();
        let nameCell = row.insertCell(0);
        nameCell.textContent = book.name;

        let priceCell = row.insertCell(1);
        priceCell.textContent = book.price;

        let authorNameCell = row.insertCell(2);
        authorNameCell.textContent = book.author.name;

        let authorEmailCell = row.insertCell(3);
        authorEmailCell.textContent = book.author.email;

        let editButtonCell = row.insertCell(4);
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            editBook(index);
        });
        editButtonCell.appendChild(editButton);

        let deleteButtonCell = row.insertCell(5);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteBook(index);
        });
        deleteButtonCell.appendChild(deleteButton);
    });

    let headerRow = table.insertRow(0);
    headerRow.insertCell(0).textContent = "Name";
    headerRow.insertCell(1).textContent = "Price";
    headerRow.insertCell(2).textContent = "Author Name";
    headerRow.insertCell(3).textContent = "Author Email";
    headerRow.insertCell(4).textContent = "Edit";
    headerRow.insertCell(5).textContent = "Delete";

    document.getElementById("bookFormContainer").style.display = "none";
}





function editBook(index) {
    let book = books[index];
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = book.name;

    let priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.value = book.price;

    let authorNameInput = document.createElement("input");
    authorNameInput.type = "text";
    authorNameInput.value = book.author.name;

    let authorEmailInput = document.createElement("input");
    authorEmailInput.type = "email";
    authorEmailInput.value = book.author.email;

    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", function () {
        book.name = nameInput.value;
        book.price = priceInput.value;
        book.author.name = authorNameInput.value;
        book.author.email = authorEmailInput.value;
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
    });

    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", function () {
        displayBooks();
    });

    let table = document.getElementById("bookTable");
    let row = table.rows[index + 1]; // Add 1 to account for the header row
    row.cells[0].innerHTML = "";
    row.cells[0].appendChild(nameInput);
    row.cells[1].innerHTML = "";
    row.cells[1].appendChild(priceInput);
    row.cells[2].innerHTML = "";
    row.cells[2].appendChild(authorNameInput);
    row.cells[3].innerHTML = "";
    row.cells[3].appendChild(authorEmailInput);
    row.cells[4].innerHTML = "";
    row.cells[4].appendChild(saveButton);
    row.cells[4].appendChild(cancelButton);
}



function deleteBook(index) {

    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();

}

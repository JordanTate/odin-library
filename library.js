let library = [];
let userLibrary = document.querySelector('#my-library')

if (localStorage.getItem('library') !== null){
    library = JSON.parse(localStorage.getItem('library'))
}

function setStorage(){
    localStorage.setItem('library', JSON.stringify(library));
}

function Book(title, author, status){
    this.title  = title;
    this.author = author;
    this.status = status;
}

// Populate Library
function librarian(){
    userLibrary.innerHTML = "";

    for (let i = 0; i < library.length; i++){
        let bookCard = document.createElement('div')
            bookCard.classList.add('col-md-4');
            bookCard.dataset.index = i;

        let statusClass;

        if (library[i].status === "Read"){
            statusClass = "btn-success"
        } else if (library[i].status === "In Progress"){
            statusClass = 'btn-warning'
        } else {
            statusClass = "btn-secondary"
        }

        bookCard.innerHTML = `
            <div class="p-3 rounded shadow overflow-hidden text-center">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <p class="lead text-start m-0">${library[i].title}</p>
                    <button type="button" onClick="removeEntry(this)" class="btn-close" aria-label="Remove"></button>
                </div>
                <p class="text-muted">by ${library[i].author}</p>
                <button type="button" onClick="updateEntry(this)" class="btn ${statusClass}">${library[i].status}</button>
            </div>
        `;
        userLibrary.append(bookCard);

        setStorage();
    }
}

function bookIndex(book){
    return book.closest('.col-md-4').dataset.index;

    setStorage();
}

function addEntry(book){
    library.push(book);
    librarian();
}

function removeEntry(book){
    library.splice(bookIndex(book), 1);

    book.closest('.col-md-4').remove();

    setStorage();
}

function updateEntry(book){
    if (library[bookIndex(book)].status === "Read"){
        library[bookIndex(book)].status = "Unread"
    } else if (library[bookIndex(book)].status === "Unread"){
        library[bookIndex(book)].status = "In Progress"
    } else {
        library[bookIndex(book)].status = "Read"
    }

    librarian();
}

document.querySelector('#addBook').addEventListener('click', () => {
    let validation = true;

    document.querySelectorAll('#bookModal input').forEach((input) => {
        if (input.value === ""){
            input.parentNode.querySelector('.text-danger').classList.remove('d-none');
            validation = false;
        } else {
            input.parentNode.querySelector('.text-danger').classList.add('d-none');
        }
    });

    if(validation){
        let book = new Book(
            document.querySelector('#book-title').value,
            document.querySelector('#book-author').value,
            document.querySelector('#book-status').value,
        )
        addEntry(book);

        document.querySelector('#dismissModal').click();
    }
});

librarian();

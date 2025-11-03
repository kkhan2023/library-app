// Library array to store new Books() //
const library = []

// Object constructor to reuse parameters //
function Book(title, author, pages, read, id) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.id = id
}

// Book prototype function to change read status

Book.prototype.toggleReadStatus = function () {
  this.read = this.read === "Yes" ? "No" : "Yes"
}

// Push new Books() to library array then display books via DOM
function addBooksToLibrary(book) {
  library.push(book)
  displayBooks()
}

// DOM elements to show objects on front end

function displayBooks() {
  const bookGrid = document.querySelector(".book-grid")
  bookGrid.innerHTML = ""
  const bookCount = library.length
  const currentBooks = document.querySelector(".current-books")

  // Loop over library to create elements for each book

  library.forEach((book) => {
    // Create each element needed to display on card

    const card = document.createElement("div")
    const ul = document.createElement("ul")
    const titleItem = document.createElement("li")
    const authorItem = document.createElement("li")
    const pagesItem = document.createElement("li")
    const readItem = document.createElement("li")
    const changeReadStatus = document.createElement("button")
    const readStatusDiv = document.createElement("div")
    const uniqueID = document.createElement("li")
    const removeBook = document.createElement("div")
    const removeBookBtn = document.createElement("button")

    // Assign classess for styles

    card.classList.add("card", "active")
    readStatusDiv.classList.add("read-status-container")
    readItem.classList.add("status")
    removeBook.classList.add("remove-book-container")
    removeBookBtn.classList.add("remove-card")
    changeReadStatus.classList.add("change-status")

    // Event Listener to remove card from library array & front end

    removeBookBtn.addEventListener("click", () => {
      const bookID = book.id
      const index = library.findIndex((item) => item.id === bookID)
      library.splice(index, 1)
      if (library.length === 0) {
        currentBooks.innerHTML = `Current Library Books: 0`
      }

      displayBooks()
    })

    // Content inside each element in card

    titleItem.innerHTML = `Title: ${book.title}`
    authorItem.innerHTML = `Author: ${book.author}`
    pagesItem.innerHTML = `Pages: ${book.pages}`
    readItem.innerHTML = `Completed: ${book.read}`
    uniqueID.innerHTML = `ID: ${book.id}`
    currentBooks.innerHTML = `Current Library Books: ${bookCount}`

    removeBookBtn.innerHTML = `<i class="fa fa-times"></i>`

    // add elements to parents to show on front end

    card.appendChild(removeBook)
    removeBook.appendChild(removeBookBtn)
    card.appendChild(ul)
    ul.appendChild(titleItem)
    ul.appendChild(authorItem)
    ul.appendChild(pagesItem)
    readStatusDiv.appendChild(readItem)
    ul.appendChild(readStatusDiv)
    ul.insertBefore(readStatusDiv, pagesItem.nextSibling)
    ul.appendChild(uniqueID)
    bookGrid.appendChild(card)
    readItem.appendChild(changeReadStatus)

    // Change the read status of the books event listener

    changeReadStatus.addEventListener("click", () => {
      book.toggleReadStatus()
      displayBooks()
    })

    // Toggle styles for book read status

    if (book.read === "Yes") {
      readItem.classList.toggle("status-color-change")
      readItem.classList.toggle("yes")
      changeReadStatus.innerHTML = "Not Read"
    } else {
      readItem.classList.toggle("status-color-change")
      changeReadStatus.innerHTML = "Completed"
    }
  })
}

// Form submission to add book to library //

const bookForm = document.querySelector("#book-form")

bookForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const title = document.querySelector('[data-value="1"]').value
  const author = document.querySelector('[data-value="2"]').value
  const pages = document.querySelector('[data-value="3"]').value
  const readInput = document.querySelector('[data-value="4"]')
  const read = readInput.checked ? "Yes" : "No"

  const id = crypto.randomUUID()

  const newBook = new Book(title, author, pages, read, id)

  addBooksToLibrary(newBook)
  bookForm.reset()
})

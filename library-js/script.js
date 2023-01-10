const title = document.querySelector('.header');
title.style.color = 'blue';

//To Do
/*
Think about how this is going to work

End goal is to be able to add / remove books from the library that is displayed
on the webpage.


*/

let myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.identifier = `${this.title}-${this.pages}`;
    myLibrary.push(this);
}

Book.prototype.readStatus = function () {
    return this.read === "1" ? 'completed reading' : 'not read yet';
}

Book.prototype.info = function () {
    return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus()}`);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const theTheFellowshipOfTheRing = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 500, true);
const bloodOfElves = new Book('Blood of Elves', 'Andrzej Sapkowski', 398, true);

//console.log(theHobbit.info());
console.log(myLibrary);
//console.log(Object.getPrototypeOf(theHobbit));

//work on this, maybe addNodeElement shennanigans??




//goes through the bookArray and creates a div on the web page to hold / display
//each book object in the bookArray
function displayLibrary (bookArray) {

    const bookContainer = document.querySelector('.book-container');

    bookArray.forEach(item => {

        //if the item does not exist on the page then you create / display it
        if (document.querySelector(`div[data-id='${item.title}-${item.pages}']`) === null) {

        let bookDiv = document.createElement('div');
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'X';
        removeBtn.classList.add('remove-button');
        removeBtn.setAttribute('data-id', `${item.title}-${item.pages}`);
        removeBtn.addEventListener('click', removeFromLibrary);
        //temp.classList.add(`cl-${item.pages}`);
        bookDiv.setAttribute('data-id', `${item.title}-${item.pages}`);
        bookDiv.textContent = `${item.info()}`;
        bookDiv.classList.add('book');
        bookContainer.appendChild(bookDiv);
        bookDiv.appendChild(removeBtn);
        //console.log(item.info());
        }
    });
} 

//need to figure out how to get information from when the button to remove a book
//is clicked to get the info for which book the button is tied to and then to
//remove said book
function removeFromLibrary (event) {

    const bookContainer = document.querySelector('.book-container');

    //console.log(event.target); //event.target returns the element that triggered the event (the button)
    bookToRemove = event.target.getAttribute('data-id');
    console.log(bookToRemove); //returns the data-id of the button


    
    myLibrary = myLibrary.filter(item => item.identifier !== bookToRemove);  //removes the book from myLibrary

    const bookDomEle = document.querySelector(`div[data-id='${bookToRemove}']`); //find the div that the book
    //is in so that we can remove it
    //console.log(bookDomEle);

    bookContainer.removeChild(bookDomEle);
    displayLibrary(myLibrary);
    
    
    //need to remove book from array and then remove node and then call display library function?
}

//need a function to insert hyphens - when given a book title
//so I can use it when doing temp.classList.add(book-title-with-hyphens)
//instead of that look into using data-attributes??

displayLibrary(myLibrary);

//const t1 = document.querySelector(`div[data-id=nothin`);
//console.log(t1);
//t1.style.color = 'red';
//console.log(t1 === false);

//** thing to work on, adding a book via button via forms */
//display information from  the add book form fields

//put the below into a function and call it with addeventListener on a button
//work on getting it to console.log the correct read status on the radio button

//need to validate inputs in getFormBookInfo and then call the Book constructor
//which is function Book (title, author, pages, read) to create a new Book and
//add it to the library array
//look into creating an object with all the info received from the form, afterwards
//call the Book constructor to add it to the library

//need to come back to book validation maybe change the button to a submit button
//and add the required fields??

//problem - when clicking button displayLibrary is called and when it is called it
//duplicates what is already in the library and displays multiple copies of itself
//on the page, need to fix displayLibrary(myLibrary) -> fixed by using document.querySelector
//to check if the data-attribute type exists (by checking if it returns null)

//start on adding a button to each book to remove it from the library

function getFormBookInfo () {
    const formBookInfo = document.querySelectorAll('.form-div input');
    const formBookInfoArray = (Array.from(formBookInfo));
    let formBookObj = {};

    formBookInfoArray.forEach((bookInput) => {
        
        if(bookInput.type != 'radio') {
            //console.log(`id: ${bookInput.id}, val: ${bookInput.value}`);
            formBookObj[bookInput.id] = bookInput.value; 

        } else {
            if(bookInput.checked) {
                //console.log(`id: ${bookInput.id}, val: ${bookInput.value}, check: ${bookInput.checked}`);
                formBookObj[bookInput.name] = bookInput.value; 
            }
        }

        //console.log(bookInput.id, bookInput.value, bookInput.checked);
        //console.log(`id: ${bookInput.id}, val: ${bookInput.value}, check: ${bookInput.checked}`)
    })

    //console.log(formBookObj); //validate this info and call the book constructor
    for (key in formBookObj) {
        console.log(`${key}: ${formBookObj[key]}`);
    }

    const booktoAdd = new Book(formBookObj.book_title, formBookObj.book_author, formBookObj.book_pages, formBookObj.book_read_status); 
    
    //problem with how I am storing whether or not the book has been read, need to change that to a true or false and have the key be consistent regardless of the read status - this has been fixed, now it returns 1 or 0 in the status and the key name for it is consisten with book_read_status
    

    displayLibrary(myLibrary);
}

const addBookBtn = document.querySelector('.addBookButton');
//console.log(addBookBtn);
addBookBtn.addEventListener('click', getFormBookInfo);





/* 
//this works

const testBox = document.querySelector('.testBox');
testBox.style.border = '1px solid red';
//testBox.style.width = '200px';
testBox.textContent = `${theHobbit.info()}`;

*/



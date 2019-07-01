// Create global variables

const page = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const completeStudentList = document.querySelectorAll('.student-item');

const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const noResultsDiv = document.createElement('div');
const pageButtonsUl = document.createElement('ul');
const pageButtonsDiv = document.createElement('div');

let searchString = '';
let filterStudentList = [];
const maxStudentsPage = 10;

// Append elements for search

searchDiv.className = 'student-search';
searchInput.placeholder = 'Search for students...';
searchDiv.appendChild(searchInput);
pageHeader.appendChild(searchDiv);

//Append elements for pagination

pageButtonsDiv.className = 'pagination';
pageButtonsDiv.appendChild(pageButtonsUl);
page.appendChild(pageButtonsDiv);

// Append element to display if no students match search

noResultsDiv.textContent = 'Sorry, no students match your search.';
noResultsDiv.style.fontSize = '35px';
noResultsDiv.style.margin = '70px';
noResultsDiv.style.textAlign = 'center';
noResultsDiv.style.display = 'none';
page.appendChild(noResultsDiv);

// Create the `showPage` function to hide all of the items in the list
// except for the ten you want to show.

const showPage = (list, button) => {
  // Set all students to display none
  for (let i = 0; i < completeStudentList.length; i++) {
    completeStudentList[i].style.display = 'none';
  }
  // If no results, display message
  if (list.length === 0) {
    noResultsDiv.style.display = 'block';
  }
  // Else display students based on button clicked
  else {
    let startIndex = (button - 1) * maxStudentsPage;
    let endIndex = startIndex + maxStudentsPage;
    for (let i = startIndex; i < endIndex && i < list.length; i++) {
      list[i].style.display = 'block';
    }
    noResultsDiv.style.display = 'none';
  }
};
// Create the `appendPageLinks function` to generate, append, and add
// functionality to the pagination buttons.

const appendPageLinks = studentList => {
  let numStudents = studentList.length;
  let numPages = Math.ceil(numStudents / maxStudentsPage);
  let selectedButton = 1;
  pageButtonsUl.innerHTML = '';

  showPage(studentList, selectedButton);

  // Create new button for each page
  for (let i = 0; i < numPages; i++) {
    let button = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.href = '#';
    // Make first button active
    if (i === 0) {
      anchor.className = 'active';
    }
    // Button text starts at 1 instead of 0
    anchor.textContent = i + 1;
    button.appendChild(anchor);
    pageButtonsUl.appendChild(button);
  }
  // Update page when new page button is clicked
  pageButtonsUl.addEventListener('click', e => {
    let previousButton = document.querySelector('.active');
    previousButton.className = '';
    selectedButton = e.target.textContent;
    e.target.className = 'active';
    showPage(studentList, selectedButton);
  });
};

// Update filterStudent list using search, and refresh

const newSearch = () => {
  filterStudentList = [];
  if (searchString.length === 0) {
    // Use completeStudentList if searchString is empty
    appendPageLinks(completeStudentList);
  } else {
    // For each item in completeStudentList
    for (let i = 0; i < completeStudentList.length; i++) {
      // Select student name as a string
      let name = completeStudentList[i].querySelector('h3').textContent;
      // If student name contains search substring
      if (name.includes(searchString)) {
        // Add student item HTML to filterStudentList
        filterStudentList.push(completeStudentList[i]);
      }
    }
    appendPageLinks(filterStudentList);
  }
};

// Call search() function when input value is changed

searchInput.addEventListener('input', () => {
  searchString = searchInput.value;
  newSearch();
});

// Call when file is initially loaded
appendPageLinks(completeStudentList);

// Level 1: Automatic Table and Date Search
// Create a basic HTML web page.
// Using the ufo dataset provided in the form of a JavaScript object, write code that appends a table to your web page and then adds new rows of data for each UFO sighting.
// Make sure you have a column for date/time, city, state, country, shape, and comment at the very least.
// Add an input tag to your HTML document and write JavaScript code that will search through the date/time column to find rows that match user input.



// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $userInput = document.querySelector("#userinput");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Utility function to validate user input is a valid date
function validatedate(inputText)
  {
  var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  // Match the date format through regular expression
  if(inputText.value.match(dateformat))
  {
    var parsedate = inputText.value.split('/');
    var dd  = parseInt(parsedate[0]);
    var mm = parseInt(parsedate[1]);
    var yyyy = parseInt(parsedate[2]);
    // Create list of days of a month
    var DaysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (mm==1 || mm>2)
    {
      if (dd>DaysInMonth[mm-1])
      {
        alert('Invalid date format!');
        return false;
      }
    }
    if (mm==2)
    {
      // Check for leap year
      var leapyear = false;
      if ( (!(yyyy % 4) && yyyy % 100) || !(yyyy % 400)) 
      {
        leapyear = true;
      }
      if ((leapyear==false) && (dd>=29))
      {
        alert('Invalid date format!');
        return false;
      }
      if ((leapyear==true) && (dd>29))
      {
        alert('Invalid date format!');
        return false;
      }
    }
  }
  else
  {
    alert("Invalid date format!");
    return false;
  }

  return true;
}



// Set filteredAddresses to addressData initially
var filteredUFOdata = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredUFOdata.length; i++) {
    // Get get the current address object and its fields
    var ufodata = filteredUFOdata[i];
    var fields = Object.keys(ufodata);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = ufodata[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string

  isadate = validatedate($userInput);
  console.log(isadate);
   
  if (isadate)
  {  
    var inputdata = $userInput.value;
    console.log(inputdata);
  
    // Set an array of all records whose datetime matches the filter
    filteredUFOdata = dataSet.filter(function(datetimeinput) {
      var ufosighting = datetimeinput.datetime
  
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return ufosighting === inputdata; 
    });
    renderTable();
  }
  $dtInput.focus();
}


// Render the table for the first time on page load
renderTable();

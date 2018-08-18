// Level 1: Automatic Table and Date Search
// Create a basic HTML web page.
// Using the ufo dataset provided in the form of a JavaScript object, write code that appends a table to your web page and then adds new rows of data for each UFO sighting.
// Make sure you have a column for date/time, city, state, country, shape, and comment at the very least.
// Add an input tag to your HTML document and write JavaScript code that will search through the date/time column to find rows that match user input.

// Set filteredAddresses to addressData initially
var filteredUFOdata = dataSet;

// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $userInput = document.querySelector("#userinput");
var $searchBtn = document.querySelector("#search");
var $searchTypeDropDwn = document.querySelector("#dropdownMenu1");
var selection = document.querySelector("#selection");
var selectType = "dd/mm/yyyy" //initial default is datetime

// get list of valide inputs
var validCities = dataSet.map(x=>x.city);
var validCountries = dataSet.map(x=>x.country)
var validStates = dataSet.map(x=>x.state)
var validShapes = dataSet.map(x=>x.shape)


// Add an event listener to the searchButton, searchType call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);


d3.selectAll(".dropdown-item").on("click", function handleSearchTypeSelect() {

    //console.log(this)
    var mylinkAnchor = d3.select(this);

    // ReSet filteredAddresses to addressData
    var filteredUFOdata = dataSet;
    // // Capture the child element's href attribute

    console.log("set the selection");
    selectType = mylinkAnchor.attr("id");
    if (selectType == "dd/mm/yyyy"){
      selection.text = "Date/Time";
    } else if (selectType == "Enter City name"){
      selection.text ="City";
    } else if (selectType == "Enter State name") {
      selection.text = "State";
    } else if (selectType == "Enter Shape"){
      selection.text = "Shape";
    }

    console.log("mylinkAnchorAttribute: " + selectType);
    var inputtext = d3.select($userInput)

    console.log("set the placeholder");
    inputtext.attr("placeholder",selectType)
    inputtext.value='';
    
});

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

// Utility function to validate user input
function validate(inputText)
{
  if (selectType == "dd/mm/yyyy"){
    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    // Match the date format through regular expression
    if(inputText.value.match(dateformat))
    {
      console.log("valid date "+inputText.value);
      var parsedate = inputText.value.split('/');
      var dd  = parseInt(parsedate[0]);
      var mm = parseInt(parsedate[1]);
      var yyyy = parseInt(parsedate[2]);
      
      // Create list of days of a month
      var DaysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
      if (mm==1 || mm>2){
        if (dd>DaysInMonth[mm-1]){
         alert('Invalid date format!');
         return false;}}
      if (mm==2){
        // Check for leap year
        var leapyear = false;
        if ( (!(yyyy % 4) && yyyy % 100) || !(yyyy % 400)) {
          leapyear = true;}
        if ((leapyear==false) && (dd>=29)){
          alert('Invalid date format!');
          return false;}
        if ((leapyear==true) && (dd>29)){
          alert('Invalid date format!');
          return false;}}}
    else{
      alert("Invalid date format!");
      return false;}}
  else { // select type is a name (country, state, city or shape)
    var inputValue = inputText.value.trim().toLowerCase();
    if (selectType == "Enter State name") {
      return(validStates.find(function(element){return element===inputValue;}))  } 
    if (selectType == "Enter Country name") {
      return(validCountries.find(function(element){return element===inputValue;})) }
    else if (selectType == "Enter City name"){
      return(validCities.find(function(element){return element===inputValue;})) } 
    else if (selectType == "Enter Shape"){
      return(validShapes.find(function(element){return element===inputValue;})) } 
  }
  inputText.value = dd+"/"+mm+"/"+yyyy;
  return true;
}





function handleSearchButtonClick() {
    isvalid = validate($userInput);
    console.log(isvalid);
   
    if (isvalid){  
      console.log("user input is valid")
      // Set filteredUFOdata to an array of all matching selected criteria
      filteredUFOdata = dataSet.filter(function(ufodata) {
      console.log("apply filter");
      if (selectType == "dd/mm/yyyy"){
        console.log("on date");
        var filterName = $userInput.value;
        var nameValue = ufodata.datetime;
        console.log(filterName);
        console.log(nameValue);
      }
      else {
        var filterName = $userInput.value.trim().toLowerCase();
      
        if (selectType == "Enter City name"){
          console.log("on city");  
          var nameValue = ufodata.city.toLowerCase();
        }
        else if (selectType == "Enter State name"){
          console.log("on state");  
          var nameValue = ufodata.state.toLowerCase();
        }
        else if (selectType == "Enter Country name"){
          console.log("on country");  
          var nameValue = ufodata.country.toLowerCase();
        }
        else if (selectType == "Enter Shape") {
          console.log("on shape");  
          var nameValue = ufodata.shape.toLowerCase();
        }
      }
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return nameValue === filterName;
      });
      renderTable();
      $userInput.value='';
      $userInput.style.color="black";
    }
    else {
      $userInput.value = $userInput.value + " NOT VALID"
      $userInput.style.color="red";
      console.log("user input not valid");
    }
  
  $userInput.focus(); 
  
} 


// Render the table for the first time on page load
renderTable();

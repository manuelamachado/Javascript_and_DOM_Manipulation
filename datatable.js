// Javascript function to create table in html



function makeTable(array) {

    var main_div = document.createElement("div");
    main_div.setAttribute("id", "main_table");

    var table = document.createElement('table');
    table.setAttribute("class", "table table-striped");
    table.setAttribute("style", "table-layout: fixed");
    

    //Enter the table headers

    var row_header = document.createElement('thead');
    var header_row = document.createElement("tr");
    
    
    var table_headers = ["Date/Time", "City", "State", "Country", "Shape", "Duration Minutes", "Comments"];
    //console.log(table_headers);

    for (var a=0; a<table_headers.length; a++) {
        var $cell_data = document.createElement("th");
        $cell_data.setAttribute("scope", "col");
        $cell_data.innerText = table_headers[a];
        header_row.appendChild($cell_data);
        console.log($cell_data);
    }

    
    row_header.appendChild(header_row);
    table.appendChild(row_header);

    //add data from the data.js

    var table_body = document.createElement("tbody");

    for (var i = 0; i < array.length; i++) {
 
        var row = document.createElement('tr');
        
            
        var cell1 = document.createElement('th');
        row.setAttribute("scope", "row");
        cell1.setAttribute("style", "word-wrap: break-word")
        cell1.innerText = array[i].datetime;
        row.appendChild(cell1);

        var cell = document.createElement('td');
        cell.setAttribute("style", "word-wrap: break-word");
        cell.innerText = array[i].city;
        row.appendChild(cell);
        
        var cell = document.createElement('td');
        cell.setAttribute("style", "word-wrap: break-word");
        cell.innerText = array[i].state;
        row.appendChild(cell);

        var cell = document.createElement('td');
        cell.setAttribute("style", "word-wrap: break-word");
        cell.innerText = array[i].country;
        row.appendChild(cell);

        var cell = document.createElement('td');
        cell.setAttribute("style", "word-wrap: break-word");
        cell.innerText = array[i].shape;
        row.appendChild(cell);

        var cell = document.createElement('td');
        cell.setAttribute("style", "word-wrap: break-word");
        cell.innerText = array[i].durationMinutes;
        row.appendChild(cell);

        var cell = document.createElement('td');
        cell.setAttribute("style", "word-wrap: break-word");
        cell.innerText = array[i].comments;
        row.appendChild(cell);

        //console.log(cell);
        
        table_body.appendChild(row);
       
    }
    
    table.appendChild(table_body);
    console.log("Making New Table");
    main_div.appendChild(table);
    document.body.appendChild(main_div);
}

d3.select("#findItems").on("click", function(event) {
    // d3.event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    d3.event.preventDefault();
    
    
    // Here we grab the text from the input box with conditions.  If field is blank, enter * as value
    var dateValue = d3.select('#inputDate').property("value");
    var cityValue = d3.select('#inputCity').property("value");
    var stateValue = d3.select('#inputState').property("value");
    var countryValue = d3.select('#inputCountry').property("value");
    var shapeValue = d3.select('#inputShape').property("value");
    
    console.log(dateValue);

    var filteredData = [];
    var filteredData2 = [];
    var filteredData3 = [];
    var filteredData4 = [];
    var filteredData5 = [];
    

    for (var i = 0; i<dataSet.length; i++)  {

        finaldateValue = new Date(dateValue);
        
        newtargetDate = new Date(dataSet[i].datetime);
                
        // Filter Values and create a new list

        // List for date

        if (dateValue === "") {

            console.log("empty date field");

            filteredData.push(dataSet[i]);
            
        } else if (finaldateValue.getTime() === newtargetDate.getTime()) {

            console.log("date field is not empty: " + dateValue);
            filteredData.push(dataSet[i]);
            
                    
        }
    }
  
        // List for city
 
    for (var i = 0; i<filteredData.length; i++)  {
            
            var targetCity = filteredData[i].city;
            
            console.log(cityValue);
            
            
            // Filter Values and create a new list
    
            if (cityValue === "") {

                console.log ("empty city field");
                filteredData2.push(filteredData[i]);
                
            } else if (cityValue === targetCity) {
    
                console.log("city field is not empty: " + cityValue);
                console.log(i);
                filteredData2.push(filteredData[i]);
            }    
    }    

    // Loop for State

    for (var i = 0; i<filteredData2.length; i++)  {
            
        var targetState = filteredData2[i].state;
        
        console.log(stateValue);
        
        
        // Filter Values and create a new list

        // List for date

        if (stateValue === "") {

            console.log ("empty state field");
            filteredData3.push(filteredData2[i]);
            
        } else if (stateValue === targetState) {

            console.log("state field is not empty: " + stateValue);
            filteredData3.push(filteredData2[i]);
        }    
    }    

    // loop for country

    for (var i = 0; i<filteredData3.length; i++)  {
            
        var targetCountry = filteredData3[i].country;
        
        console.log(countryValue);
        
        
        // Filter Values and create a new list

        if (countryValue === "") {

            console.log ("empty country field");
            filteredData4.push(filteredData3[i]);
            
        } else if (countryValue === targetCountry) {

            console.log("country field is not empty: " + countryValue);
            console.log(i);
            filteredData4.push(filteredData3[i]);
        }    
    }    

    // Loop for shape

    for (var i = 0; i<filteredData4.length; i++)  {
            
        var targetShape = filteredData4[i].shape;
        
        console.log(shapeValue);
        
        
        // Filter Values and create a new list

        // List for date

        if (shapeValue === "") {

            console.log ("empty shape field");
            filteredData5.push(filteredData4[i]);
            
        } else if (shapeValue === targetShape) {

            console.log("shape field is not empty: " + shapeValue);
            console.log(i);
            filteredData5.push(filteredData4[i]);
        }    
    }

    // add a function that deletes the existing table

    deleteTable();

    // create the new table
    //console.log(filteredData5);
    makeTable(filteredData5);

    
  });

// Level 1 - filter by date

// d3.select("#findDate").on("click", function(event) {
//     // d3.event.preventDefault() can be used to prevent an event's default behavior.
//     // Here, it prevents the submit button from trying to submit a form when clicked
//     d3.event.preventDefault();
//     // Here we grab the text from the input box
//     var dateValue = d3.select('#inputDate').property("value");
    
//     console.log(dateValue);

//     var filteredData = [];

//     for (var i = 0; i<dataSet.length; i++)  {

//         finaldateValue = new Date(dateValue);
        
//         newtargetDate = new Date(dataSet[i].datetime)
        
//         console.log(finaldateValue);
        
//         console.log(newtargetDate);
        
//         if (finaldateValue.getTime() === newtargetDate.getTime()) {
            
//             filteredData.push(dataSet[i]);
//             console.log("inside if statement1: " + newtargetDate);
//             console.log("inside if statement2: " + finaldateValue);
//         }
    
//     }    
    
//     // add a function that deletes the existing table

//     deleteTable();

//     // create the new table
    
//     makeTable(filteredData);

    
// });  

// function filterDate() {

//     document.getElementById("demo").addEventListener("click", myFunction);

//     var date_value = document.getElementById("inputDate").value;
//     var filteredData = [];

//     console.log(date_value);

//     for (var i = 0; i<dataSet.length; i++)  {

//         if (date_value === dataSet[i].datetime) {
            
//             filteredData.append(dataSet[i]);
//             console.log(dataSet[i]);
//         }

//     }

    

// }

function deleteTable() {

    var tbl = document.getElementsByTagName("table")[0];
    console.log(tbl);

    if (tbl) {
    tbl.parentNode.removeChild(tbl);
    }
    
    console.log("Deleting current table");
}

makeTable(dataSet);

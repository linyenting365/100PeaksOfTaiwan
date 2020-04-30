/**
 * Set the initial values of each parameter*/

function initialize() {
  initial_table();
}

initialize();
initMap();


let mountain_name = [];

let park = [];


/**
 * Handle the click event on Submit (Generate) button
 */
document.getElementById("submit").onclick = function () {

  submit();
  document.body.style.cursor = "default";
  // Hide loader animation
  loader.style.display = "none";
};


//Rest the table
document.getElementById("Reset").onclick = function () {
  location.reload();
  document.body.style.cursor = "default";
  // Hide loader animation
  loader.style.display = "none";
};

//searching mountain information on google
async function searching(value) {
  console.log("In searching for google about mountain information !");
  let text_name = document.getElementById(value).textContent;

 console.log(text_name);
  window.open('http://google.com/search?hl=en&q=' + escape(text_name) + " taiwan");
}


// searching national park on google
 function searching_park(value) {
  console.log("In searching for park info!");
  console.log(value);
  let text_name = document.getElementById(value).textContent;
  // console.log(text_name);
  window.open('http://google.com/search?hl=en&q=' + escape(text_name) + " national park ");
}



/**
 * An async function to sumit filter requirement
 */
async function submit() {
  console.log("In submit!");
  // Set the mouse cursor to hourglass
  document.body.style.cursor = "wait";

  // Accessing the div mountain parameter
  let mountain_height = document.getElementById("height_range").value;
  let mountain_Difficulty = document.getElementById("Difficulty").value;
  let loading = document.getElementById("loading");
  loading.innerHTML = "The Result is loading...";
  let loader = document.getElementById("loader");
  loader.style.display = "inline-block";

  try {
    // Get the min/max values from the user 
    let request;
    if (mountain_height === "" || mountain_Difficulty === "") {
      console.log("Please select some item... ", request);
      loading.innerHTML = "Please select some item...";
    }
    else {
      request = `http://127.0.0.1:5000/?mountain_height=${mountain_height}&mountain_Difficulty=${mountain_Difficulty}`;
      removetable();
    }

    console.log("request: ", request);

    // Send an HTTP GET request to the backend
    const data = await axios.get(request);

    // console.log("data.data: ", JSON.stringify(data.data, null, 2));

    let table = document.querySelector("table.table.table-bordered.table-striped");
    // table.setAttribute("data-toggle","table")
    console.log("data", data.data[0]);
    loadTableData(data.data);
    // TableReload();
    // searchingTable();


  } catch (error) {
    console.log("error: ", error);
  }

  // Set the cursor back to default
  document.body.style.cursor = "default";
  loading.style.display = "none";
  // Hide loader animation
  loader.style.display = "none";

}




function removetable() {
  let div = document.getElementById("mountain-tbody");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
/**
 * An async function to send the request to the backend when the page started.
 */
async function initial_table() {
  console.log("Initialize the table!!");


  // Set the mouse cursor to hourglass
  document.body.style.cursor = "wait";

  // Accessing the div mountain parameter
  let mountain_height = document.getElementById("height_range").value;
  let mountain_Difficulty = document.getElementById("Difficulty").value;
  let loading = document.getElementById("loading");
  loading.innerHTML = "The Result is loading...";
  // Show the loader element (spinning wheels)
  let loader = document.getElementById("loader");
  loader.style.display = "inline-block";

  try {
    // Get the min/max values from the user 

    request = `http://127.0.0.1:5000/?mountain_height=${mountain_height}&mountain_Difficulty=${mountain_Difficulty}`;


    console.log("request: ", request);

    // Send an HTTP GET request to the backend
    const data = await axios.get(request);


    loadTableData(data.data);

  } catch (error) {
    console.log("error: ", error);
  }
  document.body.style.cursor = "default";
  loading.style.display = "none";
  loader.style.display = "none";

}


/**
 * Loading Table on the frontend based on backend data
 */
function loadTableData(tableData) {
  const tableBoady = document.getElementById("mountain-tbody");
  let dataHtml = ' ';

  for (let data of tableData) {
    dataHtml += `<tr><td>${data.Rank}</td><td><button onclick="searching(this.id)" id="${data.Mountain_Name}" class="bt btn-link">${data.Mountain_Name}</button></td><td>${data.Height}</td><td>
                 <button id="${data.Difficluty}" class="bt btn-link" data-toggle="modal" data-target="#Diff">${data.Difficluty}</button></td><td>${data.City}</td><td><button onclick="searching_park(this.id)" id="${data.Park}" class="bt btn-link">${data.Park}</button></td><td>${data.Category}</td><td><img width="200" height="150" src=${data.Image}></td></tr>`
  }

  tableBoady.innerHTML = dataHtml;
  searchingTable()
}



async function searchingTable() {
  $(document).ready(function () {

    var table = $('#mountain-table').dataTable();

  });
}

function initMap(){
  // Map options
  var options = {
    zoom:8,
    center:{lat:42.3601,lng:-71.0589}
  }

  // New map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // Listen for click on map
  google.maps.event.addListener(map, 'click', function(event){
    // Add marker
    addMarker({coords:event.latLng});
  });

  /*
  // Add marker
  var marker = new google.maps.Marker({
    position:{lat:42.4668,lng:-70.9495},
    map:map,
    icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  });

  var infoWindow = new google.maps.InfoWindow({
    content:'<h1>Lynn MA</h1>'
  });

  marker.addListener('click', function(){
    infoWindow.open(map, marker);
  });
  */

  // Array of markers
  var markers = [
    {
      coords:{lat:42.4668,lng:-70.9495},
      content:'<h1>Lynn MA</h1>'
    },
    {
      coords:{lat:42.8584,lng:-70.9300},
      content:'<h1>Amesbury MA</h1>'
    },
    {
      coords:{lat:42.7762,lng:-71.0773}
    }
  ];

  // Loop through markers
  for(var i = 0;i < markers.length;i++){
    // Add marker
    addMarker(markers[i]);
  }

  // Add Marker Function
  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      map:map,
      //icon:props.iconImage
    });

    // Check for customicon
    if(props.iconImage){
      // Set icon image
      marker.setIcon(props.iconImage);
    }

    // Check content
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content:props.content
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  }
}
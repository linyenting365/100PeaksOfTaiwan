"use strict";

const express = require("express");
const app = express();
const data=require('./data/result_2.json');
const cors = require("cors");

app.use(express.static("static"));
app.use(cors());

let port = 5000;


/**
 * A promise that resolves after t ms.
 * @param {Number} t 
 */
const delay = function(t) {
    return new Promise(resolve => setTimeout(resolve, t));
  };
  


app.get("/", async function(req, res) {
  if (req.query && Object.keys(req.query).length > 0) {
    console.log("I got a query!");
    handleGet(res, res, req.query);
  }
});


app.listen(port, err => {
    console.log(`Listening on port: ${port}`);
  });

    

// // //-----------------------------------------------------------------------------
/**
 * Handles a Get request
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} query 
 */
async function handleGet(req, res, query) {
    let error = "NO_ERROR";
    let Height_data;

    let searching_Data= [];
    console.log("query: ", JSON.stringify(query));
    // console.log("query.mountain_height", query.mountain_height);
    // If there was a query (a query string was sent)
    if (
      query!== undefined &&
      query.mountain_height!==undefined &&
      query.mountain_Difficulty!==undefined
    ) {
      
      // Convert Height_data from String to integer
      Height_data= parseInt(query.mountain_height);
      console.log(Height_data);
      console.log(query.mountain_Difficulty);
      if(Number.isInteger(Height_data)){
        searching_Data=searching_height(Height_data,data);
        if(query.mountain_Difficulty!=="All"){
          searching_Data=searching_diff(query.mountain_Difficulty,searching_Data);

        }
      }
      else if(!Number.isInteger(Height_data)&&query.mountain_Difficulty!=="All"){
        searching_Data=searching_diff(query.mountain_Difficulty,data);
      }
      else{
        searching_Data=data;
      }

      if(query.mountain_height==="none"&&query.mountain_Difficulty==="none"){
        searching_Data=data;
      }

    } else {
      error = "ERROR: There are some error";
    }
  
    // Generate the output
    // Convert output to JSON
    let outputString = JSON.stringify(searching_Data, null, 2);
     console.log("outputString: ", outputString);
    // Send it back to the frontend.
    res.send(outputString);
  }

function searching_diff(nameKey,_data){
    let searching_Data = [];
    for(let i=0; i< _data.length;i++){
        if (_data[i].Difficluty===nameKey){
          Object_store(_data[i],searching_Data);
        }
    }
    return searching_Data;
  }

function searching_height(nameKey,_data){
  let searching_Data = [];
  let Height;
  for(let i=0; i< _data.length;i++){
      Height= parseInt(_data[i].Height);
      // console.log("Height:", _data[i].height_data);
      if (Height<nameKey&&Height>nameKey-300){
        Object_store(_data[i],searching_Data);
      }
  }
  return searching_Data;
}


function Object_store(_data,store_data){
  store_data.push(_data);
}






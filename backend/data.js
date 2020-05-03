const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const earthquake = function () {
  request({
    url: "https://en.wikipedia.org/wiki/100_Peaks_of_Taiwan", 
    method: "GET"
  }, function (error, response, body) {
    if (error || !body) {
      return;
    }
    const $ = cheerio.load(body); // loading body
    // console.log(body);
    const result = []; // built a container
    const $table_tr = $(".sortable tr"); 
    for (let i = 0; i < $table_tr.length; i++) {
      console.log($table_tr.length);
      const table_td = $table_tr.eq(i).find('td'); // capture all the td
      const Rank=table_td.eq(0).text();
      table_td.eq(1).find('sup').remove(); 
      const Mountain_Name= table_td.eq(1).text();// mountain name
      table_td.eq(2).find ('br').replaceWith('\n');
      const height = table_td.eq(2).text().split(" "); // height 
      let Height=height[0];
      const Difficluty = table_td.eq(3).text(); // Difficluty
      const City = table_td.eq(4).text(); // city 
      const Park = table_td.eq(5).text(); // park 
      table_td.eq(6).find('sup').remove(); 
      const Category = table_td.eq(6).text(); // Category 
      const Image=table_td.eq(7).find("img").attr("src") // Image
      console.log(Image);
      result.push(Object.assign({Rank,Mountain_Name, Height,Difficluty,City,Park, Category,Image}));
    }

    // write result_2.json 檔案
    fs.writeFileSync("./data/result_2.json", JSON.stringify(result));
  });
};

earthquake();
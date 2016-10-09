window.onload = function(){
            var data_file = "http://localhost:3000/db";
            var http_request = new XMLHttpRequest();
            try{
               // Opera 8.0+, Firefox, Chrome, Safari
               http_request = new XMLHttpRequest();
            }catch (e){
               // Internet Explorer Browsers
               try{
                  http_request = new ActiveXObject("Msxml2.XMLHTTP");

               }catch (e) {

                  try{
                     http_request = new ActiveXObject("Microsoft.XMLHTTP");
                  }catch (e){
                     // Something went wrong
                     alert("Your browser broke!");
                     return false;
                  }

               }
            }

            http_request.onreadystatechange = function(){

               if (http_request.readyState == 4  ){
                  // Javascript function JSON.parse to parse JSON data
                  var jsonObj = JSON.parse(http_request.responseText);
                  var savingsHeading = ["Products", "Interest rate", "Minimum Deposit", "Interest type"];

                  var savingsTable = document.getElementById("Table");
                  var tbl  = document.createElement('table');
                  var header = tbl.createTHead();
                  var tb = tbl.createTBody();
                  tbl.setAttribute("id", "myTable");
                  tbl.style.width  = '100%';

                    for (var i = 0; i <= jsonObj.length; i++) {
                      var tr = tbl.insertRow();

                      if (i === 0){
                        for(var th = 0; th < savingsHeading.length; th++){
                          var x = document.createElement("TH");
                          var t = document.createTextNode(savingsHeading[th]);
                          x.appendChild(t);
                          tr.appendChild(x);
                          header.appendChild(tr);
                        }
                      }
                      else {
                        tr.setAttribute('row-index', i);
                        tr.setAttribute('product-name', jsonObj[i-1][savingsHeading[0]]);
                        tr.setAttribute('id', i);
                        tb.appendChild(tr);
                        for (var y = 0; y < savingsHeading.length; y++) {
                          if(i === 1) {
                            tr.setAttribute('class', 'currentRecord');
                          } else {
                            tr.setAttribute('class', 'collapsed');
                          }
                          var td = tr.insertCell();
                          td.appendChild(document.createTextNode(jsonObj[i-1][savingsHeading[y]]));
                        }
                      }
                    }
                    savingsTable.appendChild(tbl);
                    setLinkCaptions("", jsonObj[1][savingsHeading[0]]);

               }
            };
            http_request.open("GET", data_file, true);
            http_request.send();
         };

function onPrevClick(e){
  var prevLinkCaption = "";
var nextLinkCaption = "";
var productTable = document.getElementById('myTable');
var items = document.getElementsByClassName('currentRecord');
var currentRow = items[0];
var currentRowIndex = parseInt(currentRow.rowIndex);
var prevRowInex = productTable.rows.length - 1;
if(currentRowIndex > 1) {
  prevRowInex = currentRowIndex - 1;
}
//set captions
if(prevRowInex > 1) {
  // console.log(document.getElementById(prevRowInex - 1).getAttribute("product-name"));
  prevLinkCaption = document.getElementById(prevRowInex - 1).getAttribute("product-name");
  nextLinkCaption = document.getElementById(currentRowIndex).getAttribute("product-name");
} else{
  nextLinkCaption = document.getElementById("2").getAttribute("product-name");
}


productTable.rows[prevRowInex].setAttribute('class', 'currentRecord');
setLinkCaptions(prevLinkCaption, nextLinkCaption);
currentRow.setAttribute('class', 'collapsed');
}

function onNextClick(e){
  var prevLinkCaption = "";
  var nextLinkCaption = "";
  var productTable = document.getElementById('myTable');
  var items = document.getElementsByClassName('currentRecord');
  var currentRow = items[0];
  var currentRowIndex = parseInt(currentRow.rowIndex) ;
  var nextRowInex = 1;
  if(currentRowIndex != productTable.rows.length - 1) {
    nextRowInex = parseInt(currentRowIndex) + 1;
  }

  if(nextRowInex < productTable.rows.length - 1) {
    nextLinkCaption = document.getElementById(nextRowInex + 1).getAttribute("product-name");
    prevLinkCaption = document.getElementById(currentRowIndex).getAttribute("product-name");
  } else if(nextRowInex == productTable.rows.length - 1) {
    prevLinkCaption = document.getElementById(currentRowIndex).getAttribute("product-name");
  }

  productTable.rows[nextRowInex].setAttribute('class', 'currentRecord');

  setLinkCaptions(prevLinkCaption, nextLinkCaption);
  currentRow.setAttribute('class', 'collapsed');
}

function setLinkCaptions(prevButton, nextButton) {
  var prevLink = document.getElementById('prevLink');
  var nextLink = document.getElementById('nextLink');

  //If cantion is blank then button has to be hidden
  if(prevButton === "")
    prevLink.style.display = 'none';
  else {
    prevLink.innerHTML = prevButton;
    prevLink.style.display = "block";
  }

  if(nextButton === "")
    nextLink.style.display = 'none';
  else {
    nextLink.innerHTML = nextButton;
    nextLink.style.display = "block";
  }

}

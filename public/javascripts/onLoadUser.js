window.onload = function(){
            var data_file = "http://localhost:3001/db";
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
                 var userObj = JSON.parse(http_request.responseText);
                 var savingsHeading = ["Name", "Age", "Shoe Size", "Title"];
                 var savingsTable = document.getElementById('userTable');
                 var tbl  = document.createElement('table');
                 var header = tbl.createTHead();
                 var tb = tbl.createTBody();
                 tbl.setAttribute("id", "uTable");
                 tbl.style.width  = '100%';

                 for (var i = 0; i <= userObj.length; i++) {
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
                   else{
                     tr.setAttribute('row-index', i);
                     tr.setAttribute('product-name', userObj[i-1][savingsHeading[0]]);
                     tb.appendChild(tr);
                     for(var y = 0; y < savingsHeading.length; y++) {
                       var td = tr.insertCell();
                       td.appendChild(document.createTextNode(userObj[i-1][savingsHeading[y]]));
                     }
                   }
                 }
                 savingsTable.appendChild(tbl);

               }
            };
            http_request.open("GET", data_file, true);
            http_request.send();
         };

         function mySearch() {
           // Declare variables
           var input, filter, table, tr, td, i;
           input = document.getElementById("myInput");
           filter = input.value.toUpperCase();
           table = document.getElementById("uTable");
           tr = table.getElementsByTagName("tr");

           // Loop through all table rows, and hide those who don't match the search query
           for (i = 0; i < tr.length; i++) {
             td = tr[i].getElementsByTagName("td")[0];
             if (td) {
               if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                 tr[i].style.display = "";
               } else {
                 tr[i].style.display = "none";
               }
             }
           }
         }

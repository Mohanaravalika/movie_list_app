
var movieJsonArr = [];

function loadMovies() {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
       
    if (this.readyState === 4 && this.status === 200) {
	const divelement=document.getElementById('load-id');
	divelement.setAttribute("class", "loader");
	var data = this.responseText;
        var jsonResponse = JSON.parse(data)["results"];
		movieJsonArr = jsonResponse;
        console.log(jsonResponse["results"]);
        var table = document.createElement('table');
        table.setAttribute('original_title', 'original_language', 'vote_average');
        var properties = ['original_title', 'original_language', 'vote_average'];
        var capitalize = function(s) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        }
        var tr = document.createElement('tr');
        for (var i = 0; i < properties.length; i++) {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(capitalize(properties[i])));
            tr.appendChild(th);
        }
        table.appendChild(tr);                                                                
        var tr, row;
        for (var r = 0; r < jsonResponse.length; r++) {
            tr = document.createElement('tr');
            row = jsonResponse[r];
			var org_lang=row['original_language'];
			var optiondata=document.getElementById("languages");
			optiondata.options[optiondata.options.length]=new Option(org_lang, org_lang);
			
            for (var i = 0; i < properties.length; i++) {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(row[properties[i]]));
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        document.getElementById('table-id').appendChild(table);
				document.getElementById('load-id').remove();

    }
};
xhttp.open("GET", "https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=1", true);
xhttp.send();
}
window.onload = loadMovies();
function search() {
var inputelement=document.getElementById("title");
for(i=0;i<movieJsonArr.length;i++){
  if(inputelement.value == movieJsonArr[i]['original_title']) {
   var title = inputelement.value;
   var lang =  movieJsonArr[i]['original_language'];
   
	var tr = document.createElement('tr');
	var td1 = document.createElement('td');
	td1.appendChild(document.createTextNode(1));
	            tr.appendChild(td1);
					var td2 = document.createElement('td');
		td2.appendChild(document.createTextNode(title));
		            tr.appendChild(td2);
						var td3 = document.createElement('td');
					var btn = document.createElement('button');
					btn.innerHTML = "DELETE";
			td3.appendChild(btn);
            tr.appendChild(td3);
			btn.onclick = function(r){ 
			                        document.getElementById('historyTable').deleteRow(i);
									  };  		
	document.getElementById("historyTable").appendChild(tr)
   break;
   
  } else {
  console.log("no data found");
  }
}

}

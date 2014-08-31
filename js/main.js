"use strict";

(function(window, document, undefined){
// https://www.googleapis.com/fusiontables/v1/query?sql=SELECT*%20FROM%201uPQIxXfKAdTZuhBMu-jSkdyJs45o7VC2TGqm17Eg&key=AIzaSyD0ojLPNCk0yzMoMqSJ94hivxVQI64yAAw
// var table = $(document).ready(function() {


// begin map



var layer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap',
    maxZoom: 18,
    minZoom: 1,
	
    // layers: "marker"
});
var vbIcon = L.divIcon({
	className: 'map-marker',
    iconAnchor:   [14, 10],
	  html:  '<div style="width:20px; height:20px; background-color:#1977CA; border:4px solid #00438A; border-radius:25px;"></div>'
	});

var map = L.map('map').setView([ 38.8951, -77.0367], 2).addLayer(layer);


// function removeAllMarkers(){
//     map.removeLayer(markers);
// }

// end map

$.ajax({ 
    type: 'GET', 
    url: 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT*%20FROM%201uPQIxXfKAdTZuhBMu-jSkdyJs45o7VC2TGqm17Eg&key=AIzaSyD0ojLPNCk0yzMoMqSJ94hivxVQI64yAAw', 
    // url: 'js/query.json', 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) {
    	console.log(data)
		var index,
			array = [];
    	for (index = 0; index < data["rows"].length; index++) {
				var item = {
			    	"Timestamp" : data["rows"][index][0],
				    "Name": data["rows"][index][1],
				    "Age": data["rows"][index][2],
				    "Email Address": data["rows"][index][3],
					"Gender": data["rows"][index][4],
					"Project Title": data["rows"][index][5],
					"Project Location": data["rows"][index][6],
					"Project Description": data["rows"][index][7],
					"Project Website": data["rows"][index][8],
					"latlng": data["rows"][index][9],
					"Country": data["rows"][index][10]
					}
					array.push(item);

        }  
	var marker;
 	var list_array = [];
    var table = $('#data_table').dataTable( {
		"aLengthMenu": [5],
        "data": array,
        
         "columns": [
			// { "data": "Timestamp" },
			{ "data": "Name" },
			{ "data": "Age" },
			// { "data": "Email Address"},
			{ "data":"Gender"},
			{ "data":"Project Title"},
			// { "data":"Project Location"},
			// { "data":"Project Description"},
			{ "data":"Project Website"},
			// { "data":"latlng"},   
			{ "data":"Country"} 
        ],

		        "aoColumnDefs":[{
		        "sTitle":"Site name"
		      , "aTargets": [ "site_name" ]
		  },{
		        "aTargets": [ 4 ]
		      , "bSortable": false
		      , "mRender": function ( url, type, full )  {
		          return  '<a target="_blank" href="http://'+url+'">' + url + '</a>';
		      }
		  } 
		  ],


	    "fnDrawCallback": function( oSettings ) {

	    	if(list_array.length == 0){
				for (var i = 0; i < oSettings["aoData"].length; i++) {
				 	var marker_location = oSettings["aoData"][i]["_aData"]["Project Location"].split(',').map(function(item) {
					    return parseFloat(item, 10);
						});

				    marker = L.marker(marker_location, {icon: vbIcon}).addTo(map);
				    list_array.push(marker);

				}
			}
			 // $('td').html('<a href="#">' + oSettings["aoData"] + '</a>');
	    }
    } ); 
    	$('#myInputTextField').keyup(function(e){
			
			if (e.keyCode == 13) {
				$(".map-marker").remove();
				item = table.fnFilter('"' + $(this).val() +'"');
				var data = table._('tr', {"filter": "applied"});
				for (var i = 0; i < data.length; i++) { 
				    // console.log( data[i]);
				    var marker_location = data[i]["Project Location"].split(',').map(function(item) {
					    return parseFloat(item, 10);
						});
				    marker = L.marker(marker_location, {icon: vbIcon}).addTo(map);
				    console.log(marker_location)

				}
				

			
			}
	       
		}) 



    }
});
})(this, document);
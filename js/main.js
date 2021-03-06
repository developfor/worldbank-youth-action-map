"use strict";
var map;

		 function format (d) {

			   return '<div class="inner-content">' 
			   +'<p><span>Full Name: </span>' +d["Name"]+ '</p>'
			   // +'<p><span>Email: </span>'+d["Email Address"]+ '</p>'
			   // +'<p><span>Age: </span>'+d["Age"]+ '</p>'
			   +'<p><span>Gender: </span>'+d["Gender"]+ '</p>'
			   +'<p><span>Project Website: </span><a href="http://'+d["Project Website"]+'">'+d["Project Website"]+ '</a></p>'
			   +'<p><span>Project Title: </span>'+d["Project Title"]+ '</p>'
			   +'<p><span>Project Start Date: </span>'+d["Project Start Date"]+ '</p>'
			   +'<p><span>Project End Date: </span>'+d["Project End Date"]+ '</p>'
			   +'<p><span>Is the project ongoing?: </span>'+d["Is the project ongoing?"]+ '</p>'
			   +'<p ><span>Project LatLong: </span>'+d["Project Location"]+ '<br /><a id="zoom_map"> View Location On Map.</a></p>'
   			   +'<p><span>Project Country: </span>'+d["Country"]+ '</p>'
			   +'<p><span>Project Description: </span>'+d["Project Description"]+ '</p>'
			   +'<p><span>Impact Description: </span>'+d["Impact Description"]+ '</p>'
			   +'</div>';
			}


(function(window, document, undefined){

// begin map

	var layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: 'OpenStreetMap',
	    maxZoom: 18,
	    minZoom: 1,
		
	    // layers: "marker"
	});
	var vbIcon = L.divIcon({
		className: 'map-marker',
		iconAnchor:   [8, 6],
		html:  '<div style="width:15px; height:15px; background-color:#1977CA; border:4px solid #00438A; border-radius:25px;"></div>'
	});

	map = L.map('map',{maxBounds: [[90,189.0],[-79, -190]]
}).setView([ 30, 0], 1).addLayer(layer);

	var markers = new L.MarkerClusterGroup({
			showCoverageOnHover: false,
	        animateAddingMarkers:true,
	        // maxClusterRadius: 40,
	        chunkedLoading: true,

	        iconCreateFunction: function(cluster) {
	        return new L.DivIcon({ 
	        	iconAnchor:   [18, 18],
	        	html: '<div class="marker_cluster">' + cluster.getChildCount() + '</div>' });
		    }

	    }

	    );

	// end map



	$.ajax({ 
	    type: 'GET', 

	    url: 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT*%20FROM%201kWGRT8isIwfwo0xZyh_g48D71Dgn_cKS51FC1rLu&key=AIzaSyC_NLU85fZGzJJVSX2vt5JZcMHbxhfNXH0', 
	    // url: 'js/query.json',
	    // url: 'api.php',
	    data: { get_param: 'value' }, 
	    dataType: 'json',
		cache: false,
		contentType: 'application/json',
	    success: function (data) {
	    	

			var index,
				array = [];
		    	for (index = 0; index < data["rows"].length; index++) {
					var item = {
				    	"Timestamp" : data["rows"][index][0],
					    "Name": data["rows"][index][1],
						"Gender": data["rows"][index][2],
						"Project Title": data["rows"][index][3],
						"Project Location": data["rows"][index][4],
						"Country": data["rows"][index][5],
						"Project Description": data["rows"][index][6],
						"Impact Description": data["rows"][index][7],
						"Project Website": data["rows"][index][8],
						"Project Start Date": data["rows"][index][9],
						"Is the project ongoing?": data["rows"][index][10],
						"Project End Date": data["rows"][index][11],
						"LatLng": data["rows"][index][12]
						}
					array.push(item);
		        }  
		var marker;
	 	var list_array = [];
	    var table = $('#data_table').dataTable( {
			"aLengthMenu": [5],
	        "data": array,
	         "order": [[ 1, "desc" ]],
	         "columns": [
		          {
	                "class":          'details-control',
	                "orderable":      false,
	                "data":           null,
	                "defaultContent": ''
	            },
				{ 
					"class": 'time-row',
					"data": "Timestamp" },
				{ "data": "Name" },
				// { "data": "Age" },
				// { "data": "Email Address"},
				// { "data":"Gender"},
				{ "data":"Project Title"},
				// { "data":"Project Location"},
				// { "data":"Project Description"},
				// { "data":"Project Website"},
				// { "data":"latlng"},   
				{ "data":"Country"} 
	        ],

			        "aoColumnDefs":[{
			        "sTitle":"Site name"
			      , "aTargets": [ "site_name" ]
			  }
			  // ,{
			  //       "aTargets": [ 4 ]
			  //     , "bSortable": false
			  //     , "mRender": function ( url, type, full )  {
			  //         return  '<a target="_blank" href="http://'+url+'">' + url + '</a>';
			  //     }
			  // } 

			 ,{
			        "aTargets": [1]
			      , "bSortable": true
			      , "mRender": function ( url )  {  
				      	return '<div class="time-small">' + moment(url).format('l') + '</div>';
			      }
			  } 
		



			  ],


		    "fnDrawCallback": function( oSettings ) {
				
		    	if(list_array.length == 0){
		    		
					for (var i = 0; i < oSettings["aoData"].length; i++) {

					 	var marker_location = oSettings["aoData"][i]["_aData"]["Project Location"].split(',').map(function(item) {
						    return parseFloat(item, 10);
							});
						var popupContent = "<div class='bubble_text'><p><b>Project Title:</b> "+ oSettings["aoData"][i]["_aData"]["Project Title"]+"</p>"+"<p><b>Project Website:</b><a target='_blank' href="+ oSettings["aoData"][i]["_aData"]["Project Website"]+"> "+oSettings["aoData"][i]["_aData"]["Project Website"]+"</a></p>"+ "<p><b>Submitted By:</b> "+oSettings["aoData"][i]["_aData"]["Name"]+" on "+moment(oSettings["aoData"][i]["_aData"]["Timestamp"]).format('l') +"</p></div>";
					    // marker = L.marker(marker_location, {icon: vbIcon}).addTo(map);MarkerClusterGroup()

					    // marker = L.marker(marker_location, {icon: vbIcon}).addTo(map).bindPopup(popupContent);
					 	markers.addLayer(L.marker(marker_location, {icon: vbIcon}).bindPopup(popupContent));
					 	map.addLayer(markers);

					    list_array.push(marker);


					}
				}
				 // $('td').html('<a href="#">' + oSettings["aoData"] + '</a>');
		    }
	    } ); 





	    	$('#data_table_input_textfield').keyup(function(e){

					if (e.keyCode == 13) {
						map.removeLayer(markers);
						markers = new L.MarkerClusterGroup({
							showCoverageOnHover: false,
					        animateAddingMarkers:true,
					        // maxClusterRadius: 40,
					        chunkedLoading: true,

					        iconCreateFunction: function(cluster) {
					        return new L.DivIcon({ 
					        	iconAnchor:   [18, 18],
					        	html: '<div class="marker_cluster">' + cluster.getChildCount() + '</div>' });
						    }

					    });

					 // try {
								// console.log(table)
						// $(".map-marker").remove();
						

						// $(".leaflet-popup").hide();
						
						item = table.fnFilter('' + $(this).val() +'');
						var data = table._('tr', {"filter": "applied"});
						for (var i = 0; i < data.length; i++) { 
						    // console.log( data[i]);
						    var marker_location = data[i]["Project Location"].split(',').map(function(item) {
							    return parseFloat(item, 10);
								});
						    var popupContent = "<div class='bubble_text'><p><b>Project Title:</b> "+ data[i]["Project Title"]+"</p>"+"<p><b>Project Website:</b><a target='_blank' href="+ data[i]["Project Website"]+"> "+data[i]["Project Website"]+"</a></p>"+
 							"<p><b>Submitted By:</b> "+data[i]["Name"]+" on "+moment(data[i]["Timestamp"]).format('l') +"</p>"
						    +"</div>";

						// marker = L.marker(marker_location, {icon: vbIcon}).addTo(map).bindPopup(popupContent);
						// markers.addLayer(L.marker(marker_location, {icon: vbIcon}).bindPopup(popupContent).addTo(map));
						 
						map.removeLayer(markers);
						

						markers.addLayer(L.marker(marker_location, {icon: vbIcon}).bindPopup(popupContent));

					 	map.addLayer(markers);
						

					    // list_array.push(marker);
						    // console.log(marker_location)
						    // document.getelementsbyclassname('leaflet-popup-close-button')
						// } catch (e) {
						//    // statements to handle any exceptions
						//    console.log("yikes")
						//    // logMyErrors(e); // pass exception object to error handler
						// }
						// map.addLayer(markers);
						}
						
						
					}
				
			}) 
			$("#go_button").on("click", function(){
				map.removeLayer(markers);
						markers = new L.MarkerClusterGroup({
							showCoverageOnHover: false,
					        animateAddingMarkers:true,
					        // maxClusterRadius: 40,
					        chunkedLoading: true,

					        iconCreateFunction: function(cluster) {
					        return new L.DivIcon({ 
					        	iconAnchor:   [18, 18],
					        	html: '<div class="marker_cluster">' + cluster.getChildCount() + '</div>' });
						    }

					    });


					item = table.fnFilter('' + $('#data_table_input_textfield').val() +'');
					var data = table._('tr', {"filter": "applied"});
					for (var i = 0; i < data.length; i++) { 
					    // console.log( data[i]);
					    var marker_location = data[i]["Project Location"].split(',').map(function(item) {
						    return parseFloat(item, 10);
						});
					    var popupContent = "<div class='bubble_text'><p><b>Project Title:</b> "+ data[i]["Project Title"]+"</p>"+"<p><b>Project Website:</b><a target='_blank' href="+ data[i]["Project Website"]+"> "+data[i]["Project Website"]+"</a></p>"+
 							"<p><b>Submitted By:</b> "+data[i]["Name"]+" on "+moment(data[i]["Timestamp"]).format('l') +"</p>"
						    +"</div>";
						markers.addLayer(L.marker(marker_location, {icon: vbIcon}).bindPopup(popupContent));

					 	map.addLayer(markers);
						// marker = L.marker(marker_location, {icon: vbIcon}).addTo(map).bindPopup(popupContent);
					    // console.log(marker_location)

					}
			});

			$('#data_table tbody').on('click', 'td.details-control', function () {
					
					var table = $('#data_table').DataTable();
			        var tr = $(this).closest('tr');
			        var row = table.row(tr);
			 
			        if ( row.child.isShown() ) {
			            // This row is already open - close it
			            row.child.hide();
			            tr.removeClass('shown');
			        }
			        else {
			        	console.log()
			            row.child( format(row.data()) ).show('slow');
			            row.child().addClass('inner_tr');
			            tr.addClass('shown');

						var location =  row.data()["Project Location"].split(',').map(function(item) {
						    return parseFloat(item, 10);
							});

						$("#zoom_map").on("click", function(){
							console.log(location)
						 map.setView(location, 12);
						});
			      
			        }
		    } );


	    }
	});
})(this, document);
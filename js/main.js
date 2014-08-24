"use strict";



(function(window, document, undefined){
// https://www.googleapis.com/fusiontables/v1/query?sql=SELECT*%20FROM%201uPQIxXfKAdTZuhBMu-jSkdyJs45o7VC2TGqm17Eg&key=AIzaSyD0ojLPNCk0yzMoMqSJ94hivxVQI64yAAw
// var table = $(document).ready(function() {


$.ajax({ 
    type: 'GET', 
    url: 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT*%20FROM%201uPQIxXfKAdTZuhBMu-jSkdyJs45o7VC2TGqm17Eg&key=AIzaSyD0ojLPNCk0yzMoMqSJ94hivxVQI64yAAw', 
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
					"latlng": data["rows"][index][9]
					}
					array.push(item);

        }  

 
    var table = $('#data_table').dataTable( {

        "data": array,
         "columns": [
			{ "data": "Timestamp" },
			{ "data": "Name" },
			{ "data": "Age" },
			{ "data": "Email Address"},
			{ "data":"Gender"},
			{ "data":"Project Title"},
			{ "data":"Project Location"},
			{ "data":"Project Description"},
			{ "data":"Project Website"},
			{ "data":"latlng"},      
        ],
	    "fnDrawCallback": function( oSettings ) {
	       	 var logArrayElements =  function(element) {
	    //    	 	console.log(oSettings["aoData"][element]["_aData"]["Project Location"].split(',').map(function(item) {
				 //    return parseFloat(item, 10);
					// }))

				    console.log(oSettings["aoData"][element]["_aData"]);


	       	 	// oSettings["aiDisplay"].forEach(function() {
			       	//  		console.log("hi");
			       	//  	})
	       	 		// );
				 // console.log( oSettings["aoData"][element]["_aData"][0]);
			}
			oSettings["aiDisplay"].forEach(logArrayElements);
			
	    }
    } ); 

    $('#myInputTextField').keyup(function(){
		      table.fnFilter($(this).val());
		})  


    }
});
})(this, document);
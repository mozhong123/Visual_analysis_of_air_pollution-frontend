function pcp_whole(wholelist, match_list, wholename_list, prov){

	const yearlist = ['2013','2014','2015','2016','2017','2018'];

    var data_list = [];
    for (var i=0; i<wholelist.length; i++) {
    	var yeardata = wholelist[i];

    	for (var k=0; k<wholename_list.length; k++) {

    		var cityvalue = yeardata.filter(function(event){ return event.province==wholename_list[k]});

    		var small_list = [];
    		const province = match_list[k];
    		const year = yearlist[i];

    		var count_aqi = 0;
    		var count_pm10 = 0;
    		var count_pm25 = 0;
    		var count_so2 = 0;
    		var count_no2 = 0;
    		var count_co = 0;
    		var count_o3 = 0;
    		var count_temp = 0;
    		var count_velo = 0;

    		for (var j=0; j<cityvalue.length; j++) {
    			count_aqi = count_aqi + cityvalue[j]['AQI'];
    			count_pm10 = count_pm10 + cityvalue[j]['PM10(微克每立方米)'];
    			count_pm25 = count_pm25 + cityvalue[j]['PM2.5(微克每立方米)'];
    			count_so2 = count_so2 + cityvalue[j]['SO2(微克每立方米)'];
    			count_no2 = count_no2 + cityvalue[j]['NO2(微克每立方米)'];
    			count_co = count_co + cityvalue[j]['CO(毫克每立方米)'];
    			count_o3 = count_o3 + cityvalue[j]['O3(微克每立方米)'];
    			count_temp = count_temp + (cityvalue[j]['TEMP(K)']-273.15);
    			var velo = Math.sqrt(Math.pow(cityvalue[j]['U(m/s)'],2) + Math.pow(cityvalue[j]['V(m/s)'],2))
    			count_velo = count_velo + velo;
    		}

    		if (count_aqi/12 <= 50) {
    			var level = 'Good';
    		}else if (count_aqi/12 <= 100){
    			var level = 'Moderate';
    		}else if (count_aqi/12 <= 150) {
    			var level = 'Lightly\nPolluted';
    		}else if (count_aqi/12 <= 200) {
    			var level = 'Moderately\nPolluted';
    		}else if (count_aqi/12 <= 300) {
    			var level = 'Heavily\nPolluted';
    		}else{
    			var level = 'Serverly\nPolluted';
    		}

    		small_list.push(province);
	    	small_list.push(year);
	    	small_list.push(count_aqi/12);
	    	small_list.push(count_pm10/12);
	    	small_list.push(count_pm25/12);
	    	small_list.push(count_so2/12);
	    	small_list.push(count_no2/12);
	    	small_list.push(count_co/12);
	    	small_list.push(count_o3/12);
	    	small_list.push(count_temp/12);
	    	small_list.push(count_velo/12);
	    	small_list.push(level);
	    	data_list.push(small_list);
    	}

    }

    const axislab = {
    			show:true,               
		        interval:"auto",
		        inside:true,             
		        color: 'white',
		        rotate:0, 
		        fontWeight: 'normal'
    }

	var mytextStyle={
	    color:"white",       
	    fontStyle:"normal",        
	    fontWeight:'normal',        
	    fontFamily:"Times New Roman",    
	    fontSize:12,               
	};

	if (prov=='whole'){
		var provlist = match_list;
	}else{
		var provlist = [];
		for (var i=0; i<match_list.length; i++) {
			if (match_list[i]==prov){
				var change = {value:prov, textStyle:{color:'white'}};
				provlist.push(change);
			}else{
				provlist.push(match_list[i]);
			}
		}
	}


	var pcp_gene = {
		parallel:[{width:500, layout: "vertical"}],

	    parallelAxis: [
	        {
	        	dim: 0, 
	        	areaSelectStyle:{       
		            borderWidth:1,        
		            borderColor:'rgba(160,197,232)',  
		            color: 'rgba(160,197,232)',       
		            opacity:0.4,             
		        },

	        	name: 'Prov',
	        	type: 'category',
	        	nameLocation:"start",
	        	nameRotate:0,
	        	
	        	//inverse:true, 
	        	nameTextStyle:mytextStyle,
	        	axisLabel:{ 
		            show:true,              
		            interval:"auto",
		            inside:true,            
		            color: 'rgba(0,0,0,0)',
		            fontWeight: 'normal',
		            fontSize:10, 
		            rotate:90,     
		        },

		        axisTick :{           
		            show:true,              
		            alignWithLabel:false,    
		            inside:true          
		        },
	        	data: provlist
	        },
	        {
	        	dim: 1, 
	        	name: 'Year',
	        	type: 'category',
	        	nameRotate:0,
	        	nameLocation:"start",
	        	nameTextStyle:mytextStyle,
	        	axisLabel:axislab,
	        	data: yearlist
	        },
	        {dim: 2, name: 'AQI', nameRotate:0, nameLocation:"start",nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 3, name: 'PM10\n(μg/m³)', nameRotate:0, nameLocation:"start",nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 4, name: 'PM2.5\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 5, name: 'SO2\n(μg/m³)', nameRotate:0, nameLocation:"start",nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 6, name: 'NO2\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 7, name: 'CO\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 8, name: 'O3\n(mg/m³)', nameRotate:0, nameLocation:"start",nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 9, name: 'Temp\n(°C)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 10, name: 'Wind\nSpeed', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {
	            dim: 11,
	            name: 'Level',
	            type: 'category',
	            nameRotate:0,
	            nameLocation:"start",
	            nameTextStyle:mytextStyle,
	            axisLabel:{ 
		            show:true, 
		            interval:0,       
		            inside:true,    
		            color: 'white',
		            fontWeight: 'normal',
		            fontSize:12, 
		            rotate:0,     
		        },
	            data: ['Good', 'Moderate', 'Lightly\nPolluted', 'Moderately\nPolluted','Heavily\nPolluted','Serverly\nPolluted']
	        }
	    ],

	    series: {
	        type: 'parallel',
	        lineStyle: {
	            width: 2
	        },
	        data: data_list
	    	}
	};
	return pcp_gene;
}


function pcp_make(data, match_list, wholename_list,prov){

	var cal_list = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	const calendar = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];

    console.log(data);

    var data_list = [];
    for (var i=0; i<data.length; i++) {
    	var small_list = [];
    	const month = cal_list[calendar.indexOf(data[i]['month'])];
    	const province = match_list[wholename_list.indexOf(data[i]['province'])];
    	const AQI = data[i]['AQI'];
    	const pm25 = data[i]['PM2.5(微克每立方米)'];
    	const pm10 = data[i]['PM10(微克每立方米)'];
    	const so2 = data[i]['SO2(微克每立方米)'];
    	const no2 = data[i]['NO2(微克每立方米)'];
    	const co = data[i]['CO(毫克每立方米)'];
    	const o3 = data[i]['O3(微克每立方米)'];
    	const temp = data[i]['TEMP(K)']-273.15;
    	var velo = Math.sqrt(Math.pow(data[i]['U(m/s)'],2) + Math.pow(data[i]['V(m/s)'],2))

	    if (AQI <= 50) {
			var level = 'Good';
		}else if (AQI <= 100){
			var level = 'Moderate';
		}else if (AQI <= 150) {
			var level = 'Lightly\nPolluted';
		}else if (AQI <= 200) {
			var level = 'Moderately\nPolluted';
		}else if (AQI <= 300) {
			var level = 'Heavily\nPolluted';
		}else{
			var level = 'Serverly\nPolluted';
		}

    	small_list.push(province);
    	small_list.push(month);
    	small_list.push(AQI);
    	small_list.push(pm10);
    	small_list.push(pm25);
    	small_list.push(so2);
    	small_list.push(no2);
    	small_list.push(co);
    	small_list.push(o3);
    	small_list.push(temp);
    	small_list.push(velo);
    	small_list.push(level);

    	data_list.push(small_list);
    }

    const axislab = {
    			show:true,        
		        interval:"auto",
		        inside:true,           
		        color: 'white',
		        rotate:0, 
		        fontWeight: 'normal'
    }

	var mytextStyle={
	    color:"white",       
	    fontStyle:"normal",        
	    fontWeight:'normal',        
	    fontFamily:"Times New Roman",    
	    fontSize:12,               
	};


	if (prov=='whole'){
		var provlist = match_list;
	}else{
		var provlist = [];
		for (var i=0; i<match_list.length; i++) {
			if (match_list[i]==prov){
				var change = {value:prov, textStyle:{color:'white'}};
				provlist.push(change);
			}else{
				provlist.push(match_list[i]);
			}
		}
	}


	var pcp = {
		parallel:[{width:500, layout: "vertical"}],

	    parallelAxis: [
	        {
	        	dim: 0, 

	        	areaSelectStyle:{       
		            borderWidth:1,        
		            borderColor:'rgba(160,197,232)',  
		            color: 'rgba(160,197,232)',       
		            opacity:0.4,             
		        },

	        	name: 'Prov',
	        	type: 'category',
	        	nameRotate:0,
	        	nameLocation:"start", 
	        	nameTextStyle:mytextStyle,
	        	axisLabel:{ 
		            show:true,   
		            interval:"auto",        
		            inside:true,          
		            color: 'rgb(0,49,79)',
		            fontWeight: 'normal',
		            fontSize:10, 
		            rotate:90   
		        },
	        	data: provlist
	        },
	        {
	        	dim: 1, 
	        	name: 'Month',
	        	type: 'category',
	        	nameRotate:0,
	        	nameLocation:"start",
	        	nameTextStyle:mytextStyle,
	            axisLabel:{ 
		            show:true, 
		            interval:"auto",        
		            inside:true,   
		            color: 'white',
		            fontWeight: 'normal',
		            rotate:0,     
		        },
	        	data: cal_list
	        },
	        {dim: 2, name: 'AQI',nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 3, name: 'PM10\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 4, name: 'PM2.5\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 5, name: 'SO2\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 6, name: 'NO2\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 7, name: 'CO\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 8, name: 'O3\n(mg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 9, name: 'Temp\n(°C)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 10, name: 'Wind\nSpeed', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {
	            dim: 11,
	            name: 'Level',
	            type: 'category',
	            nameRotate:0,
	            nameLocation:"start",
	            nameTextStyle:mytextStyle,
	            axisLabel:{ 
		            show:true, 
		            interval:0,        
		            inside:true,            
		            color: 'white',
		            fontWeight: 'normal',
		            fontSize:12,
		            rotate:0,     
		        },
	            data: ['Good', 'Moderate', 'Lightly\nPolluted', 'Moderately\nPolluted','Heavily\nPolluted','Serverly\nPolluted']
	        }
	    ],

	    series: {
	        type: 'parallel',
	        lineStyle: {
	            width: 2
	        },
	        data: data_list
	    	}
	};
	return pcp;
}



function time_whole_AQI(datalist, yearlist){
  const calendar = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var avg_list = []
  var label_list = []
  for (var k=0; k<datalist.length; k++){
    const year = yearlist[k];
    var yeardata = datalist[k];

    for (var i=0; i<calendar.length; i++) {
      var monthvalue = yeardata.filter(function(event){ return event.month==calendar[i] });
      var count = 0
      for (var j=0; j<monthvalue.length; j++) {
        count = count + monthvalue[i]['AQI'];
      }

      var value = count/monthvalue.length;
      avg_list.push(value);
      label_list.push(year);
    }
  }
  //console.log(label_list);

  const data = {
    labels: label_list,
    datasets: [{
        label: 'Avg',
        data: avg_list,
        pointStyle: 'line',
        borderColor: 'rgba(255, 205, 86, 0.5)',
        backgroundColor: 'rgba(255, 205, 86, 0.4)',
        tension: 0.5
      }
    ]
  };

  const ts = {
    type: 'line',
    markerType: "none",
    data: data,
    
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'none',
          //color: 'white'
        },title: {
          display: true,
          text: 'Annual Average AQI Volatility',
          color: 'white'
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          ticks: { color:'white' },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'AQI Value',
            color: 'white'
          },
          
          suggestedMin: 50,
          suggestedMax: 200
        }
      }
    }
  };

  return ts;
}

function time_year_AQI(data_eachyear, year){
  const calendar = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var countlist = [];
  for (var i=0; i<calendar.length; i++) {
    var filter = data_eachyear.filter(function(event){ return event.month==calendar[i]});
    var count = 0;
    for (var k=0; k<filter.length; k++) {
      count = count + filter[k]['AQI']
    }
    countlist.push(count/filter.length);
  }

  const data = {
    labels: calendar,
    datasets: [
      {
        data: countlist,
        borderColor: 'rgba(255, 232, 130, 0.5)',
        backgroundColor: 'rgba(255, 205, 86, 0.4)',
      }
    ]
  };

  const ts_year = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'none',
          //color: 'white'
        },
        title: {
          display: true,
          text: 'Monthly Average AQI Volatility in '+year,
          color: 'white'
        }
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: 'AQI Value',
              color: 'white'
            }
          },
          x: { ticks: { color:'white' } }
        }
    },
  };

  return ts_year;
}


function time_AQI(data2018, city, year){
  const calendar = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var city_list = [];
  for (var i=0; i<data2018.length; i++) {
    if (data2018[i].province==city){
      city_list.push(data2018[i])
    }
  }
  var AQI_data = [];
  //console.log(city_list);
  for (var i = 0; i<calendar.length; i++) {
    var filter = city_list.filter(function(event){ return event.month==calendar[i]});
    console.log(filter);
    AQI_data.push(filter[0]['AQI']);
  }
  console.log(AQI_data);

  const data = {
    labels: calendar,
    datasets: [
      {
        label: city,
        data: AQI_data,
        borderColor: 'rgba(255, 232, 130, 0.5)',
        backgroundColor: 'rgba(255, 205, 86, 0.4)',
      }
    ]
  };

  const timeseries = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'none',
          //color: 'white'
        },
        title: {
          display: true,
          text: city + ' Monthly AQI in '+year,
          color: 'white'
        }
      },
      scales: {
        y: {
              display: true,
              title: {
                display: true,
                text: 'AQI Value',
                color: 'white'
              },
              ticks: { color:'white' }
            },
        x: { ticks: { color:'white' } }
      }
    },
  };

  return timeseries;
}

// variable for the map
var map = L.map('map', {
	center: [58.5, 25.5],
	zoom: 8
});

//adding two base maps 
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});
CartoDB_Positron.addTo(map);

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});


// for using the base maps in the layer control, I defined a baseMaps variable
// the text on the left is the label shown in the layer control; the text right is the variable name
var baseMaps = {
	"Positron": CartoDB_Positron,
	"Dark Matter": CartoDB_DarkMatter,
	}

// adding a scale to the map
L.control.scale({imperial: false, position: 'bottomleft'}).addTo(map)

// adding a layer selection
L.control.layers(baseMaps).addTo(map);


var oneToManyFlowmapLayer = L.canvasFlowmapLayer(geoJsonFeatureCollection, {
    originAndDestinationFieldIds: {
        originUniqueIdField: 'start_kant_id',
        originGeometry: {
          x: 'start_lon',
          y: 'start_lat'
        },
        destinationUniqueIdField: 'end_kant_id',
        destinationGeometry: {
          x: 'end_lon',
          y: 'end_lat'
        }
    },
    canvasBezierStyle: {
      type: 'classBreaks',
      field: 'regularmovers',
      classBreakInfos: [{
        classMinValue: 0,
        classMaxValue: 24,
        symbol: {
          strokeStyle: '#fee8c8',
          lineWidth: 0.5,
          lineCap: 'round',
          shadowColor: '#fee8c8',
          shadowBlur: 2.0
        }
      }, {
        classMinValue: 25,
        classMaxValue: 100,
        symbol: {
          strokeStyle: '#fdbb84',
          lineWidth: 1.5,
          lineCap: 'round',
          shadowColor: '#fdbb84',
          shadowBlur: 2.0
        }
      }, {
        classMinValue: 101,
        classMaxValue: 10000000,
        symbol: {
          strokeStyle: '#e34a33',
          lineWidth: 3,
          lineCap: 'round',
          shadowColor: '#e34a33',
          shadowBlur: 2.0
        }
      }],
      defaultSymbol: {
        strokeStyle: '#e7e1ef',
        lineWidth: 0.5,
        lineCap: 'round',
        shadowColor: '#e7e1ef',
        shadowBlur: 1.5
      },
    },
    pathDisplayMode: 'selection',
    animationStarted: true
}).addTo(map);
  // Selection for dispaly
  oneToManyFlowmapLayer.on('click', function(e) {
    if (e.sharedOriginFeatures.length) {
      oneToManyFlowmapLayer.selectFeaturesForPathDisplay(e.sharedOriginFeatures, 'SELECTION_NEW');
    }
    if (e.sharedDestinationFeatures.length) {
      oneToManyFlowmapLayer.selectFeaturesForPathDisplay(e.sharedDestinationFeatures, 'SELECTION_NEW');
    }
  });

  oneToManyFlowmapLayer.selectFeaturesForPathDisplayById('start_kant_id', 673, true, 'SELECTION_NEW');

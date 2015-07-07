//"iffy" - IIFE
(function() {

	angular.module("PulseMap", [])
			.controller("MainController", ["$scope", "$http", MainController]);

		function MainController($scope, $http) {



			var map;
			// var icon = 'images/beachflag.png';



			function error(){
				console.log("Error: Could not load locations.");
			}


			var promise = $http.get('data.json');




			var gatherDataComplete = function(response){

				$scope.retrievedData = response.data.locations;

				for(var x = 0; x < $scope.retrievedData.length; x++){
					if($scope.retrievedData[x].type!="center"){
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng($scope.retrievedData[x].lat,$scope.retrievedData[x].lng),
							map: map,
							title: $scope.retrievedData[x].firstName,
							draggable:false,
							animation: google.maps.Animation.DROP,
							// icon:icon
						});
					}
				}

			}; //end gatherDataComplete



			function initializeMap() {

				var mapOptions = {
					zoom: 11,
					center: new google.maps.LatLng(41.9369,-87.6847)
				};
				map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			} // end InitializeMap


			google.maps.event.addDomListener(window, 'load', initializeMap);
			promise.then(gatherDataComplete, error);


		}  // end MainController



		window.onload = function(){


		};

}());

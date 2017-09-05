/* global angular */


(function(){
    
    var WeatherController = function($scope, $http){

        $scope.location = '';
        $scope.getLocation = function(){
            var locationApiAddress = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
            var localAddressEncoded = encodeURIComponent($scope.location);
            var testingAddress = '77642';
            var locationApiFullAddress = locationApiAddress + testingAddress;
            var weatherApiAddress = 'https://api.darksky.net/forecast';
            var apiKey = '9f6325a874ba4e46242d3e5e3c349a27';
            var latitude = null;
            var longitude = null;
            var weatherApiFullAddress = '';
            
            $http({
                method: 'GET',
                url: locationApiFullAddress, 
            }).then(function successCallback(response){
                $scope.location = response.data.results[0].formatted_address;
                latitude = response.data.results[0].geometry.location.lat;
                longitude = response.data.results[0].geometry.location.lng;
                weatherApiFullAddress = weatherApiAddress + '/' + apiKey + '/' + latitude + ',' + longitude;
                $scope.getWeather(weatherApiFullAddress);
            }, function errorCallback(response){
                console.log(response); 
            });
        };
        
        $scope.getWeather = function(urlAddress){
            $http({
                method: 'GET',
                url: urlAddress
            }).then(function successCallback(response){
                console.log(response);
            }, function errorCallback(response){
                console.log(response);
            });
        };
    };
    
    
    angular.module('weatherApp')
        .controller('WeatherController', WeatherController);
}());
Parties = new Mongo.Collection("parties");
if (Meteor.isClient) {
    
    angular.module('socially', ['angular-meteor', 'ui.router']);
    
      angular.module('socially').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider){
            
            $locationProvider.html5Mode(true);
            
            $stateProvider.state('parties', {
                    url:'/parties',
                    templateUrl: 'client/parties-list.ng.html',
                    controller: 'PartiesListCtrl'
            }).state('partyDetails', {
                url: '/parties/:partyId',
                templateUrl: 'client/party-details.ng.html',
                controller: 'PartyDetailsCtrl'
            });
            $urlRouterProvider.otherwise("/parties");
        }]);
    
    
 
angular.module('socially').controller('PartiesListCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
    $scope.parties = $meteor.collection(Parties);
          
    $scope.remove= function(party){
        $scope.parties.remove(party);
    };

    $scope.removeAll = function(){
        $scope.parties.remove();
    };
  }]);
    
 angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams',
            function($scope, $stateParams){
                
                $scope.partyId = $stateParams.partyId;
                
            }]);


}



if(Meteor.isServer){
    Meteor.startup(function(){
        if(Parties.find().count() == 0){
            var parties = [
                {'name':'Dubstep-Free Zone', 'Description':'Fast just got faster wit Nexus S.'},
                {'name':'All dubstep all the time', 'Description':'Get it on!'},
                {'name':'Savage loungin', 'Description':'Leisure suit required. And only the fiercest manners.'}
            ];
            
        for(var i = 0; i<parties.length; i++)
            Parties.insert(parties[i]);
        }
    });
}
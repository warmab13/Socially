Parties = new Mongo.Collection("parties");
if (Meteor.isClient) {
  
  angular.module('socially', ['angular-meteor']);
      angular.module('socially').controller('PartiesListCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
    $scope.parties = $meteor.collection(Parties);
          
    $scope.remove= function(party){
        $scope.parties.remove(party);
    };

    $scope.removeAll = function(){
        $scope.parties.remove();
    };
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
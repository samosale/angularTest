(function(angular) {

  'use strict';
  angular.module('myApp', ['ngRoute'])


.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
 })


  .factory('myService', function($rootScope) {





    var array =  (localStorage.getItem('AngularTest12345')) ? JSON.parse(localStorage.getItem('AngularTest12345')) : [{
      id: 565675773,
      name: "Edukativni",
      kanali: ["RTS 1", "FOX", "RTS 2", "PINK"]
    }, {
      id: 56575656476,
      name: "Zabavni",
      kanali: ["RTS 1", "FOX", "RTS 3", "B92"]
    }, {
      id: 2230549543,
      name: "Kulturni",
      kanali: ["RTS 1", "FOX3", "NOVA 9", "ART"]
    }, {
      id: 34546954054,
      name: "Sportski",
      kanali: ["SPORTTV", "FOX", "ARENA", "SPORTNEWS"]
    }];
    var chanelList = [];
   
    var currentClickedElement = {
      name: array[0].name
    }
    var currentClickedChannel = "";



var e = {} ;
var t = [array[0].id];

var funcID = function(id){
  
  t.push(id)
  
}


var getId = function(){
  
  
  return t[t.length-1];
}


var id = array[0].id;


    var addCategory = function(item) {
      var obj = {};
      obj.name = item;
      obj.kanali = [];
      obj.id = Math.random();

      array.push(obj);


    };


    var removeCategory = function(id) {


      for (var i = 0; i < array.length; i++) {


        if (array[i].id === id) {

          array.splice(i, 1);

        }

      }


      var dataToStore = JSON.stringify(array);

      localStorage.setItem('AngularTest12345', dataToStore);

    };


    var setClicked = function(clicked) {

      currentClickedElement.name = clicked;




    }


    var getObjectItem = function(obj) {


      return currentClickedElement;

    }

    var getChanelList = function() {

      return chanelList;



    }
    
    
    
    /***************/
    


    var setChanelList = function(a, b, d) {
      
      
      var  clickedCurrent = this.getCurrentClickedElement.name;


      console.log(this.getCurrentClickedElement.name)




if(d === 3){

  clickedCurrent = this.getCachedCurrentElement().name;
clickedCurrent = this.getCurrentClickedElement.name;






      var curentElementList = this.getCategories.filter(function(val, ind) {

        return val.id === this.getID();

      }, this);




  
}









      var curentElementList = this.getCategories.filter(function(val, ind) {

        return val.id === this.getID();
     //   return val.name === clickedCurrent;

      }, this);





      var categories = this.getCategories;


      var name = this.getCurrentClickedElement;
      

      chanelList.length = 0;


      curentElementList[0].kanali.forEach(function(val, index) {
        
        

        chanelList.push(val);


      }, this);



      var dataToStore = JSON.stringify(array);

      localStorage.setItem('AngularTest12345', dataToStore);



    }


    var editCategory = function(id, name) {





      for (var i = 0; i < array.length; i++) {

        if (array[i].id === this.getID()) {
//this.getCurrentClickedElement.name
//this.getCachedCurrentElement().name
          array[i].name = this.getCachedCurrentElement().name;

        }

      }
      
      
      
      

this.setChanelList(1,23,3);

    }



    var deleteChanelFromCategory = function(chanel, category) {


      for (var t = 0; t < array.length; t++) {

        if (array[t].name === category.name) {

          var indices = array[t].kanali.indexOf(chanel);

          array[t].kanali.splice(indices, 1);

        }


      }

      // update
      this.setChanelList();

    }



    var updateKanal = function(category, chanel, updatedChanel, checkBoxes) {



      //if user uncheck
      var cachedCategoriesOfChannel = this.categoriesOfChannel(chanel);


    

      for (var t = 0; t < array.length; t++) {


        for (var g in checkBoxes) {


          if (array[t].name === g && checkBoxes[g]) {


            var find = array[t].kanali.indexOf(chanel);


            if (find !== -1) {

              array[t].kanali[find] = updatedChanel;

            } else {

              array[t].kanali.push(updatedChanel)
            }



          } else if (array[t].name === g && !checkBoxes[g]) {



            var filtered = Object.keys(checkBoxes).filter(function(value) {


              return !checkBoxes[value];


            }).forEach(function(evert) {



              var indd = array[t].kanali.indexOf(evert);

              array[t].kanali.splice(indd, 1)


            })




          }

        }


      }

      this.setChanelList();


    }



    var setCurrentClickedChannel = function(channel) {


      currentClickedChannel = channel;
    }

    var getCurrentClickedChannel = function() {

      return currentClickedChannel;



    }

    var channelInCategories = function(channel, id) {


      var arr = [];

      array.forEach(function(val) {

        var indexOf = val.kanali.indexOf(channel)

        if (indexOf !== -1) {

          arr.push(val.name)
        }
      })


      return arr;

    }
    
    
    var setID = function(id){
      
     funcID(id)
    }
    
    var getID = function(){
    
      return getId()
      
    }
    var cachedElement = {} ;
    
    var setCachedCurrentElement = function(e){
      
      
      cachedElement.name = e.name;
    }
    
    var getCachedCurrentElement = function(){
      
      
      return cachedElement;
    }
    
    return {

      getCategories: array,
      addCategory: addCategory,
      removeCategory: removeCategory,
      setCurrentClickedElement: setClicked,
      getCurrentClickedElement: currentClickedElement,
      getChanelList: getChanelList,
      setChanelList: setChanelList,
      editCategory: editCategory,
      deleteChanelFromCategory: deleteChanelFromCategory,
      updateKanal: updateKanal,
      setCurrentClickedChannel: setCurrentClickedChannel,
      getCurrentClickedChannel: getCurrentClickedChannel,
      categoriesOfChannel: channelInCategories,
      setID:setID,
      getID:getID,
      setCachedCurrentElement:setCachedCurrentElement,
      getCachedCurrentElement:getCachedCurrentElement


    };

  })


.controller('addCtrl', function($scope, $route, $routeParams, $location, myService){
  
  
  
    $scope.novaKategorija = function(value) {

      if (!value) {

        return;
      }

      myService.addCategory(value);
      
      $scope.$location.url('/');




    }
  
  
  
   $scope.redirect = function() {



      $scope.$location.url('/');
    }

  
  
  
  
  
})
.controller('addChannel', function($scope, $route, $routeParams, $location, myService){
  
  
    $scope.params = $routeParams;
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.chanelList = myService.getChanelList();
    $scope.currentParamCategory = ($scope.$routeParams.name) ? $scope.$routeParams.name : null;
    $scope.category = {};
    
    $scope.category.name = myService.getCachedCurrentElement();
    $scope.category.clickedChanel = myService.getCurrentClickedChannel();
    $scope.category.cachedChanel = "";
    $scope.categories = myService.getCategories;
    $scope.category.id = myService.getID()

      $scope.categories = myService.getCategories;
      
      
      
      $scope.category.newKanal = '';
      
          var curr = myService.categoriesOfChannel($scope.category.clickedChanel) || [];

    $scope.setCheckBoxVal = function() {

      var objt = {};
      var currToObj = curr.forEach(function(val) {

        objt[val] = true;

      });


      $scope.category.checkboxes = objt;

      return objt;

    }
      
      
        myService.setChanelList();
    $scope.chanelList = myService.getChanelList();


      
      
      
       $scope.sacuvajKanal = function(parametar) {

      myService.categoriesOfChannel()

      var url = $scope.$location.url();

      if (url === "/noviKanal") {


        if (!parametar) {
          return;
        }

      }


      var clicked = myService.getCurrentClickedElement;

      var clickedKanal = (parametar) ? parametar : $scope.category.clickedChanel;

      var cached = myService.getCurrentClickedChannel();

      var checkBoxes = $scope.category.checkboxes;

      //console.log(checkBoxes, cached, clickedKanal, clicked);



      myService.updateKanal(clicked, cached, clickedKanal, checkBoxes);


      $scope.$location.url('/');

    }

    $scope.redirect = function() {



      $scope.$location.url('/');
    }


  
  
  
})


  .controller('MainController', function($scope, $route, $routeParams, $location, myService) {




    $scope.params = $routeParams;
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.chanelList = myService.getChanelList();
    $scope.currentParamCategory = ($scope.$routeParams.name) ? $scope.$routeParams.name : null;
    $scope.category = {};
    
    $scope.category.name = myService.getCachedCurrentElement();
    
    
    $scope.category.clickedChanel = myService.getCurrentClickedChannel();
    $scope.category.cachedChanel = "";
    $scope.categories = myService.getCategories;
    $scope.category.id = myService.getID()

    var curr = myService.categoriesOfChannel($scope.category.clickedChanel) || [];









    $scope.setCheckBoxVal = function() {

      var objt = {};
      var currToObj = curr.forEach(function(val) {

        objt[val] = true;

      });


      $scope.category.checkboxes = objt;

      return objt;

    }
    
    
    
    
    
    
    
    
    
    
    
  myService.setChanelList();
    $scope.chanelList = myService.getChanelList();





    $scope.novaKategorija = function(value) {

      if (!value) {

        return;
      }

      myService.addCategory(value);
      $scope.$location.url('/');




    }



    $scope.clickCategory = function(ev, id) {

    myService.setID(id)
   
      myService.setCurrentClickedElement(ev);

      $scope.category.name = myService.getCurrentClickedElement;
      





      // find category in array

      var categoryItem = myService.getCategories.filter(function(val, ind) {

console.log(myService.getCategories);

        return val.name === myService.getCurrentClickedElement.name;

      });




      $scope.chanelList.length = 0;




      categoryItem[0].kanali.forEach(function(val, index) {

        $scope.chanelList.push(val);



      })

    }




    $scope.sacuvaj = function(id) {


      var current = $scope.category.name;
  

    //  myService.setID(id)

      myService.editCategory(myService.getID(), myService.getCurrentClickedElement);
      



      //posle zavrsi ovo

      $scope.$location.url('/');

    }




$scope.editKategorije = function(name,id){
  
  
 
 
  myService.setID(id)
   
      myService.setCurrentClickedElement(name);
      myService.setCachedCurrentElement(name);

      $scope.category.name = myService.getCurrentClickedElement;
      
console.log(myService.getCurrentClickedElement.name);


      // find category in array

      var categoryItem = myService.getCategories.filter(function(val, ind) {

console.log(myService.getCategories);

        return val.id === myService.getID();

      });




      $scope.chanelList.length = 0;




      categoryItem[0].kanali.forEach(function(val, index) {

        $scope.chanelList.push(val);



      })

 $scope.$location.url('/editKategorije');
  
}

    $scope.otkaziEditKanala = function() {

      $scope.$location.url('/');

    }

    $scope.deleteChanel = function(val) {



      myService.deleteChanelFromCategory(val);




    }

    $scope.delete = function(item) {

      myService.removeCategory(item);

      var updateList = myService.getCategories;

      $scope.chanelList.length = 0;





      //Update chanel List

      updateList[0].kanali.forEach(function(val, index) {

        $scope.chanelList.push(val);


      }, this);





      $scope.category.name.name = (updateList[0].name) ? updateList[0].name : "None";
      $scope.$location.url('/');

    }




    $scope.deleteChanelFromCategory = function(param) {
var flag;



 if(Object.keys($scope.category.name).length === 0){
  
  flag = myService.getCategories[0];


}else{
  
  flag = $scope.category.name;
  
}


      myService.deleteChanelFromCategory(param, flag);

      //update and re-render





    }

    $scope.sacuvajKanal = function(parametar) {

      myService.categoriesOfChannel()

      var url = $scope.$location.url();

      if (url === "/noviKanal") {


        if (!parametar) {
          return;
        }

      }


      var clicked = myService.getCurrentClickedElement;

      var clickedKanal = (parametar) ? parametar : $scope.category.clickedChanel;

      var cached = myService.getCurrentClickedChannel();

      var checkBoxes = $scope.category.checkboxes;

   //   console.log(checkBoxes, cached, clickedKanal, clicked);



      myService.updateKanal(clicked, cached, clickedKanal, checkBoxes);


      $scope.$location.url('/');

    }

    $scope.redirect = function() {



      $scope.$location.url('/');
    }



    $scope.stateChanged = function() {

    }


    $scope.odustani = function() {

      $scope.$location.url('/')



    }
    $scope.editKanala = function(ev) {


      myService.setCurrentClickedChannel(ev);
      console.log(myService.categoriesOfChannel(myService.getCurrentClickedChannel()))


    }



    $scope.clickedChanel = function(param) {



      myService.setCurrentClickedChannel(param);


      $scope.$location.url('/editKanala')

    }

    $scope.checkedAuto = function(d) {
      var chann = $scope.category.cachedChanel;
      var arr = myService.getCategories;
      var vreca = [];


      arr.forEach(function(element, index) {

        var tat = element.kanali.indexOf(chann);

        if (tat !== -1) {
          vreca.push(element.name);


        }



      });

      var tyy = vreca.indexOf(d);

      if (tyy !== -1) {


        return d;

      } else {
        return null;
      }



    }



  })






  .config(function($routeProvider, $locationProvider) {
    $routeProvider.

    when('/', {
        templateUrl: 'main.html',
        controller: 'MainController'

      }).when('/novaKategorija', {

        templateUrl: 'novaKategorija.html',
        controller: 'MainController'

      }).when('/noviKanal', {
        templateUrl: 'noviKanal.html',
        controller: 'addChannel'

      }).when('/editKanala', {
        templateUrl: 'main.html',
        controller: 'MainController'

      }).when('/editKategorije', {
        templateUrl: 'main.html',
        controller: 'addCtrl'

      })
      .when('/pokaziKanale', {
        templateUrl: 'main.html',
        controller: 'MainController'

      }).otherwise({
        redirectTo: '/'
      });



    $locationProvider.html5Mode(true);
  });


})(window.angular);
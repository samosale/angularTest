(function(angular) {
	
  'use strict';
angular.module('myApp', ['ngRoute'])
.factory('myService', function($rootScope){
  
  
  var array = (localStorage.getItem('AngularTest12345'))? JSON.parse(localStorage.getItem('AngularTest12345')): [{id:565675773, name:"Edukativni",kanali:["RTS 1", "FOX", "RTS 2", "PINK"]},{id:56575656476,name:"Zabavni", kanali:["RTS 1", "FOX", "RTS 3", "B92"]},{id:2230549543, name:"Kulturni", kanali:["RTS 1", "FOX3", "RTS 9", "PINK"]},{id:34546954054, name:"Sportski", kanali:["RTS 1", "FOX", "RTS 7", "PINK"]}];
  var chanelList = [];
  
  var currentClickedElement ={name:array[0].name}
  



  var addCategory = function(item) {
    var obj = {};
    obj.name = item;
    obj.kanali = [];
    obj.id = Math.random();

    array.push(obj);
    
    
  };
  
  
  
  
  var removeCategory = function(id){
    

     for(var i = 0; i<array.length; i++){
  
  
         if(array[i].id === id){
    
           array.splice(i,1);
    
      }
  
    }


    
       
    var dataToStore = JSON.stringify(array);

    localStorage.setItem('AngularTest12345', dataToStore);

  };
  
  
  var setClicked = function(clicked){
  
    currentClickedElement.name = clicked;
    
    
    
    
  }
  
  
  var getObjectItem = function(obj){
    
    
    return currentClickedElement;
    
  }
  
  var getChanelList = function(){
    
    return chanelList;
    
    
    
  }
   
  var setChanelList = function(a,b){
    
    


      var curentElementList = this.getCategories.filter(function(val,ind){
       
       return val.name === this.getCurrentClickedElement.name;
       
     },this);



 
  
     var categories = this.getCategories;
    
     
     var name = this.getCurrentClickedElement;

     chanelList.length = 0;
     

     curentElementList[0].kanali.forEach(function(val, index){
      
        chanelList.push(val);

         
       },this);


       
    var dataToStore = JSON.stringify(array);

    localStorage.setItem('AngularTest12345', dataToStore);

    
        
  }
  
  
  var editCategory = function(id, name){
    
    


    for(var i = 0; i<array.length; i++){
  
  
         if(array[i].id === id){
    
           array[i].name = name.name;
    
      }
  
    }
    
    this.setChanelList();
    
  }
  
  
  
  var deleteChanelFromCategory = function (chanel, category) {
    
    
    for(var t = 0; t<array.length; t++){
      
      if(array[t].name === category.name){
        
        var indices = array[t].kanali.indexOf(chanel);
        
        array[t].kanali.splice(indices,1);
        
       
        
      }
      
      
    }
    
    // update
    this.setChanelList();

    
    
  }
  
  
  
  
  
  var updateKanal = function (category, chanel, updatedChanel,checkBoxes) {
    
    
    console.log(checkBoxes)
      
      for(var t = 0; t<array.length; t++){
      
      
        for(var g  in checkBoxes){
            
    
        if(array[t].name === g && checkBoxes[g]){
          
          
                var find = array[t].kanali.indexOf(chanel);

          
          if(find !== -1){
          
          array[t].kanali[find] = updatedChanel;
          
          }else{
           
            array[t].kanali.push(updatedChanel)
          }
        
          
          
        }
        
      }
      
      
    }
    
    this.setChanelList();
    
    
  }
  
  return {
    
    getCategories: array,
    addCategory:addCategory,
    removeCategory:removeCategory,
    setCurrentClickedElement:setClicked,
    getCurrentClickedElement:currentClickedElement,
    getChanelList : getChanelList,
    setChanelList : setChanelList,
    editCategory:editCategory,
    deleteChanelFromCategory:deleteChanelFromCategory,
    updateKanal:updateKanal
    
    
    
  };
  
})
 .controller('MainController', function($scope, $route, $routeParams, $location, myService) {
   
   
             $scope.params = $routeParams;
             $scope.$route = $route;
             $scope.$location = $location;
             $scope.$routeParams = $routeParams;
             $scope.chanelList = myService.getChanelList();
             $scope.currentParamCategory = ($scope.$routeParams.name)?$scope.$routeParams.name:null;
              $scope.category = {};
              $scope.category.edit = false;
              $scope.category.editChanel = false;
              $scope.category.name =  myService.getCurrentClickedElement;
              $scope.category.clickedChanel = "";
              $scope.category.cachedChanel = "";
              $scope.categories = myService.getCategories;
              $scope.category.checkboxes = {};
              myService.setChanelList();
             
              $scope.chanelList = myService.getChanelList();

              
$scope.novaKategorija = function(value){

if(!value){

		return;
}
myService.addCategory(value);
$scope.$location.url('/');




}
     
      $scope.clickCategory = function(ev){
      

                    
       myService.setCurrentClickedElement(ev);

       $scope.category.name =  myService.getCurrentClickedElement;
       

       
       // find category in array
       
       var categoryItem = myService.getCategories.filter(function(val,ind){
       
       
       return val.name===myService.getCurrentClickedElement.name;
       
     });


    


        $scope.chanelList.length = 0;
    
    
       
        categoryItem[0].kanali.forEach(function(val, index){
         
         $scope.chanelList.push(val);
         
         
         
       })
       


       
     }
     

       $scope.clickedChanel = function(param){
         $scope.category.cachedChanel = param;
          $scope.category.clickedChanel = param;
         $scope.category.editChanel = true;
         
       }
       
       
      
      $scope.sacuvaj = function (id ){
       

       var current = $scope.category.name;

       myService.editCategory(id, current);
       


       
       //posle zavrsi ovo
       $scope.category.edit = false;
       $scope.category.editChanel = false;
       
       $scope.$location.url('/');

     }

    
     
      $scope.editKategorije = function(kanal,id){
      
      $scope.category.current = kanal;
      $scope.category.id = id;
      
      myService.setCurrentClickedElement(kanal);
      
     myService.setChanelList($scope.category.id, $scope.category.current);
      $scope.category.edit = true;
      
      
    }
     $scope.otkaziEditKanala = function() {
     	$scope.category.edit = false;
       $scope.category.editChanel = false;
       
$scope.$location.url('/');

     }
     
     $scope.deleteChanel = function(val){
              
       myService.deleteChanelFromCategory(val);
       
       

       
     }
     
     $scope.delete = function(item) {
       
        myService.removeCategory(item);
           
        var updateList =  myService.getCategories;
        
        $scope.chanelList.length = 0;
        
      
        
        
        
        //Update chanel List
    
        updateList[0].kanali.forEach(function(val, index){
      
        $scope.chanelList.push(val);

         
       },this);
    
    
       $scope.category.name.name = (updateList[0].name)?updateList[0].name:"None";
       $scope.$location.url('/');
       
     }
     
     $scope.deleteChanelFromCategory = function(param){
       
       
        myService.deleteChanelFromCategory(param, $scope.category.name );
       
        $scope.category.edit = false;
        
        //update and re-render
        
             
        $scope.chanelList = myService.getChanelList();




     }
     
       $scope.sacuvajKanal = function(parametar) {
         

	var url = $scope.$location.url();

	    if(url === "/noviKanal"){
	       

	         if(!parametar){
	         	return;
	         }

	    }


       var clicked =   myService.getCurrentClickedElement;
       
       var clickedKanal = (parametar)? parametar: $scope.category.clickedChanel;
       
       var cached = $scope.category.cachedChanel;
       
       var checkBoxes = $scope.category.checkboxes;
       
       console.log(checkBoxes);



       myService.updateKanal(clicked, cached, clickedKanal, checkBoxes);
       
       
       $scope.category.editChanel = false;
       
              
       $scope.$location.url('/');
       
     }
     
     $scope.redirect = function(){



       $scope.$location.url('/');
     }
     


     $scope.stateChanged = function(){
       
            }
     
     
       $scope.checkedAuto = function(d){
            var chann = $scope.category.cachedChanel;
       	var arr = myService.getCategories;
	var vreca = [];


	arr.forEach( function(element, index) {

	var tat = element.kanali.indexOf(chann);

	if(tat !== -1){
	vreca.push(element.name);


}



});

	var tyy = vreca.indexOf(d);

	return tyy !== -1;

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
    controller: 'MainController'
    
  }).otherwise({
        redirectTo: '/'
    });



  $locationProvider.html5Mode(true);
});


})(window.angular);

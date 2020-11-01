var newfilter = angular.module('myApp.filter', []);
newfilter.filter('capitalizeNoUnder', function() {
    return function(input) {
        if (input!=null)
            return input.substring(0,1).toUpperCase()+input.substring(1).replace('_', ' ');
    }
});
var menuPalt = angular.module('myApp.menuPalette', []);
menuPalt.factory('menuPalette', function() {
    return {
        menPl : 
                { 
                    ice: ['#7697ac', '#466c84', '#bdc9d3'],
                    forest: ['#8cb87e', '#5c8d4a', '#d1e3cc'],
                    desert: ['#c8a16c', '#a07235', '#e9dac4'],
                    lavender: ['#8b76ad', '#5e4685', '#c8bed4'],
                    pure_orange: ['#e49841', '#c26a00', '#f1d3b0'],
                    raspberry: ['#d17463', '#aa3d2a', '#ebc6bf'],
                    stone: ['#aaaaaa', '#828282', '#dddddd'],
                    colorChooser: function(id ) 
                    {
                        thisArray = eval("this." + id);
                        jQuery('#theme').val(id);
                        var bottomColor = thisArray[0];
                        var headerColor = thisArray[1];
                        var centerColor = thisArray[2];
                        jQuery('#iPhoneBottom, #androidBottom').css({'background-color' : bottomColor});
                        jQuery('#androidPreviewTitle, #iPhonePreviewTitle').css({'background-color' : headerColor});
                        jQuery('#iPhoneOutContent, #androidOutContent').css({'background-color' : centerColor});
                        
                    } 
                }
   };
});
var myAppModule = angular.module('myApp', ['myApp.filter', 'myApp.menuPalette']);
//the following lines of code create directive onLastRepeat, which will run as soon as the menus are added. That way more menus coming from the user can be added and repeat won't overwrite
myAppModule.directive('onLastRepeat', function($timeout) { return function(scope, element, attrs) { if (scope.$last) {  
       $timeout(function () { scope.$emit( angular.element(jQuery("#customizeApp")).scope().getLinks() ); });
        } }; })

myAppModule.factory('theMenus', function() {
    return {
    menuChoices: {
           urlAccess: function(choiceData, id)
           {
               jQuery('#urlwarning').html('');
               if (choiceData == 'extraURLs')
               {
                   webParser.extraLinks();
                   return;
               }
                   
                var expression_2 = /(twitter\.com)/gi;
                  var regex_2 = new RegExp(expression_2);
                  var urlMatches_2 = choiceData.match(regex_2);
                  if (urlMatches_2) 
                  {
                      var twitterUser = choiceData.split('/');
                     // alert(twitterUser);
                      twitterUser = twitterUser[twitterUser.length - 1];
                      var dotPos = twitterUser.lastIndexOf('.');
                      if (dotPos > 0)
                      {jQuery('#urlwarning').html('Error - not a valid twitter url (username missing)');  }
                      webParser.twitter(choiceData);
                      return;
                  }
                  //let's find out if it is a facebook url:
                  //alert(choiceData);
                  var expression_2 = /(facebook)/gi;
                  var regex_2 = new RegExp(expression_2);
                  var urlMatches_2 = choiceData.toLowerCase().match(regex_2);
                  if (urlMatches_2) { FBOptions.FBParser(choiceData); return; }
                  var unixDate = Math.round((new Date()).getTime() / 1000);
                  var userid = jQuery('#userid').val();
                  var date2snd = String(unixDate).substring(4,10);
                //use screen grabber:
                jQuery('#iPhoneOutContent').html("Loading Data. Please Wait!<br /><img style='width:50px;' src='" +mobifURL + "components/com_mobiconf/images/loading.gif'>");
                jQuery('#androidOutContent').html("Loading Data. Please Wait!<br /><img style='width:50px;' src='" +mobifURL + "components/com_mobiconf/images/loading.gif'>");
                 jQuery.ajax({
            type: "POST",
                url: "http://www.appforce.eu/components/com_mobiconf/screengrab/graburl.php",
                 data: {url: choiceData , menu_id: id, date2snd: date2snd, userid: userid, cache: false},
            success: function (data) {  var htmlvid;
                 var iPhoneHeight = 400;
                 var androidHeight = 400;
                 var androidWidth = 270;
                 var iPhoneWidth = 255;
                  data = JSON.parse(data);
                  htmlvid = "<img src='" + data.url + "' style='width: "+ iPhoneWidth +"px; height: "+ iPhoneHeight +"px;' />";
                 jQuery('#iPhoneOutContent').html(htmlvid);
                  htmlvid = "<img src='" + data.url + "' style='width: "+ androidWidth +"px; height: "+ androidHeight +"px;' />";
                 jQuery('#androidOutContent').html(htmlvid);
            },
    error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
 
    }
        });
                return;
                //********************************************************
               choiceData = "TigerDirect";
                  jQuery.ajax({
            type: "GET",
            
             url: 'https://gdata.youtube.com/feeds/api/videos?q='+ choiceData +'&max-results=10&v=2&alt=jsonc&orderby=published',
            data: { },
            success: function (data) 
            {    var htmlvid = ''; 
                 if (data.data.totalItems > 0)
                 {
                     var items = data.data.items;
                     for (item in items)
                     {
                        if (typeof items[item].thumbnail !== 'undefined' &&  typeof items[item].thumbnail.sqDefault !== 'undefined')
                        {htmlvid += "<div class='videolayer'><div class='videoTitle'>" + items[item].title + "</div>";
                        htmlvid += "<img class='videothumb' src='"+items[item].thumbnail.sqDefault +"' />" + ""+ items[item].description+"<div style='clear: both;'></div></div>";}
                     }
                 }
                 var iPhoneHeight = jQuery.data( document.body, "iPhoneHeight");
                 var androidHeight = jQuery.data( document.body, "androidHeight");
                 jQuery('#iPhoneOutContent').css({'height' : iPhoneHeight + 'px'});
                 jQuery('#androidOutContent').css({'height' : androidHeight + 'px'});
                 jQuery('#iPhoneOutContent').html(htmlvid);
                 jQuery('#androidOutContent').html(htmlvid);
            }
        });
           },
           twitter: function()
           {  alert('no, deprecated function');
               //$('head').prepend('<link rel="stylesheet" href="http://c.this/template.css" type="text/css" />');
           }
            
        }
    }
});
myAppModule.factory('theService', function(theMenus) {
    
    var $choices = [{name:'Home', id:'1', image: 'icons/Willkommen_mobil.png',  url: 'facebook-feed'}];
    var visibleLinks = 4;
    var extraLinksIcon = "Aktuell_mobil.png";
    var $menuColors = ['66a', 'a66','6a6','66a', 'aa6', 'a6a', '6aa', '66a', 'a66', '6a6', '66a', 'aa6'];
   var $toIcons = [{image:'icons/Achtung_mobil.png'},{image:'icons/CD_mobil.png'}, {image:'icons/Facebook_mobil.png'}, {image:'icons/Info_mobil.png'}, {image:'icons/Lock_mobil.png'}, {image:'icons/Podcast_mobil.png'}, {image:'icons/Schluessel_mobil.png'}, {image:'icons/Stern_mobil.png'}, {image:'icons/Twitter_mobil.png'}, {image:'icons/Wetter_mobil.png'}, {image:'icons/Aktuell_mobil.png'}, {image:'icons/Diagramm_mobil.png'}, {image:'icons/Flieger_mobil.png'}, {image:'icons/Instagram_mobil.png'}, {image:'icons/Lupe_mobil.png'}, {image:'icons/Pokal_mobil.png'}, {image:'icons/Server_mobil.png'}, {image:'icons/Stift_mobil.png'}, {image:'icons/Verkehr_mobil.png'}, {image:'icons/Willkommen_mobil.png'}, {image:'icons/Ball_mobil.png'}, {image:'icons/Events1_mobil.png'}, {image:'icons/Glocke_mobil.png'}, {image:'icons/Kader_mobil.png'}, {image:'icons/Musik_mobil-2.png'}, {image:'icons/Radio_mobil.png'}, {image:'icons/Shop_mobil.png'}, {image:'icons/Tabelle_mobil.png'}, {image:'icons/Video_mobil.png'}, {image:'icons/Wrench_mobil.png'}, {image:'icons/Bestellen_mobil.png'}, {image:'icons/Events2_mobil.png'}, {image:'icons/GooglePlus_mobil.png'}, {image:'icons/Kamera_mobil.png'}, {image:'icons/Musik_mobil.png'}, {image:'icons/Reservierung_mobil.png'}, {image:'icons/Smile_mobil.png'}, {image:'icons/Teilen_mobil.png'}, {image:'icons/Webcam_mobil.png'}, {image:'icons/YouTube_mobil.png'}, {image:'icons/Blatt_mobil.png'}, {image:'icons/Events3_mobil.png'}, {image:'icons/Haken_mobil.png'}, {image:'icons/KickTipp_mobil.png'}, {image:'icons/Pin_mobil.png'}, {image:'icons/RSS_mobil.png'}, {image:'icons/Sonne_mobil.png'}, {image:'icons/Tisch_mobil.png'}, {image:'icons/Web_mobil.png'}, {image:'icons/Bus_mobil.png'}, {image:'icons/Events_mobil.png'}, {image:'icons/Herz_mobil.png'}, {image:'icons/Kreis_mobil.png'}, {image:'icons/Plus_mobil.png'}, {image:'icons/Schere_mobil.png'}, {image:'icons/Sprechblase_mobil.png'}, {image:'icons/TV_mobil.png'}, {image:'icons/Wecker_mobil.png'}];
        
    return {
        
        theIcons: {
            addIcon: function(icon){
            $toIcons.push(icon);
             
        },
            toIcons: function() { return $toIcons; } 
        },
       menuHandler : {
             id: 1,
             getMenu : function(id) { for (i in $choices) {
            if ($choices[i].id == id) {
                return $choices[i];
            }
        } },
    
    
             addMenu: function(menu)
             {
                var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
                 var regex = new RegExp(expression);
                 //alert($choices.length + " <-----");
                 
                 
                 if (typeof menu.url == 'undefined' || menu.url.trim() === '') 
                 {
                      jQuery('#urlwarning').html('Error - not a valid url (http:// missing)');
                   return;
                 }
                // alert(menu.image);
                 if (typeof menu.image == 'undefined' || menu.image.trim() === '') 
                 { menu.image = 'icons/Willkommen_mobil.png'; }
                 //
                 var t = menu.url;
                 var urlMatches = t.match(regex);
                 
                  if (menu.url == 'facebook-albums' || menu.url == 'facebook-feed' || menu.url == 'facebook-profile') { urlMatches = 1; }
                  if ( urlMatches ) { jQuery('#urlwarning').html(''); } else {
                   jQuery('#urlwarning').html('Error - not a valid url (http:// missing)');
                   return;
                 }
                  
                 if (typeof menu.id == 'undefined' || typeof jQuery("#androidMenu" + menu.id).attr('id') == 'undefined') {
                     if ($choices.length > 10)
                     {
                         jQuery('#urlwarning').html('You have reached the maximum number of links');
                         return;
                     }
                    if ($choices.length == visibleLinks)
                    {
                         menu.id = $choices.length + 1;
                         re = {};//add the +++ signs. We already have enough icons
                         re.url = 'extraURLs';         
                         re.id = menu.id;
                         re.image ='icons/' + extraLinksIcon;
                         re.name ='Extra Links';
                         var addExtraLNK = jQuery('div.extraLinksHidden').data("foo");
                        // alert(dump(addExtraLNK));
                         addExtraLNK.push(menu);
                         var andrMenuID = '#androidMenu' + menu.id;
                         jQuery('div.extraLinksHidden').data("foo", addExtraLNK);
                         $choices.push(re);
                         var backgroundcolor = '#' + $menuColors[menu.id];
                    }
                   if ($choices.length > (visibleLinks + 1))
                    {
                         var addExtraLNK = jQuery('div.extraLinksHidden').data("foo");
                         addExtraLNK.push(menu);
                         jQuery('div.extraLinksHidden').data("foo", addExtraLNK);
                    }
                    
                     menu.id = $choices.length + 1; 
                     { $choices.push(menu); }
                 }
                 else //don't add, edit instead
                 {
                     var extrasLs = [];
                     jQuery('div.extraLinksHidden').data("foo", extrasLs);
                      for (i in $choices) 
                      { 
                          if ($choices[i].id == menu.id) { $choices[i] = menu; }
                          if ($choices[i].id >= (visibleLinks + 2)) { extrasLs.push($choices[i]) }
                      }
                      jQuery('div.extraLinksHidden').data("foo", extrasLs);
                 }
                  var backgroundcolor = '#' + $menuColors[menu.id];
                  jQuery('#bigmenu_' + menu.id).html(menu.name).css({'background-position':'10px 12px', 'background-color': backgroundcolor, 'background-repeat': 'no-repeat', 'background-image' : 'url("components/com_mobiconf/images/' + menu.image + '")'})
                  
             },
             deleteMenu: function(menu)
             {
                 var $choices_3 = $choices;
                  for (i in $choices_3) {
                    if ($choices_3[i].id == menu.id) { $choices_3.splice(i, 1); }
                 }
                 
                     for (i in $choices_3) {  
                       if ($choices_3[i].image == 'icons/' + extraLinksIcon) { $choices_3.splice(i, 1);  }
                    }
                var $choices_2 = [];
                 var ii, x;
                 for (i in $choices_3) {
                     if (isNaN($choices_3[i].id)) continue;
                     
                        if (i < visibleLinks) { x = i; ii = parseInt(i) + 1; }
                        else { x = parseInt(i) + 1; ii = parseInt(i) + 2; }
                       /*else*/ if (parseInt(i) == (visibleLinks)) {
                             re = {};
                            re.url = 'extraURLs';         
                            re.id = parseInt(i) + 1;
                            re.image ='icons/' + extraLinksIcon;
                            re.name ='Extra Links'; 
                            $choices_2[i] = re;
                            $choices_3[i].id = parseInt(i) + 2;
                            $choices_2[parseInt(i) + 1] = $choices_3[i];
                            jQuery('#bigmenu_6').html($choices_2[parseInt(i) + 1].name).css({'background-position':'10px 12px', 'background-color': backgroundcolor, 'background-repeat': 'no-repeat', 'background-image' : 'url("components/com_mobiconf/images/' + $choices_2[parseInt(i) + 1].image + '")'})
                            continue;
                        } 
                        //if (typeof $choices_3[x] === 'undefined') continue;
                        
                        $choices_3[i].id = ii;
                        $choices_2[x] = $choices_3[i];
                        var backgroundcolor = '#' + $menuColors[$choices_3[i].id];
                        jQuery('#bigmenu_' + $choices_3[i].id).html($choices_2[x].name).css({'background-position':'10px 12px', 'background-color': backgroundcolor, 'background-repeat': 'no-repeat', 'background-image' : 'url("components/com_mobiconf/images/' + $choices_2[x].image + '")'})
                    }
                       
                           
                    $choices = $choices_2;
                  angular.element(jQuery("#diviPhone")).scope().changeMenu();
                  angular.element(jQuery("#divAndroid")).scope().changeMenu();
                  
                 var extrasLs = [];
                     jQuery('div.extraLinksHidden').data("foo", extrasLs);
                      for (i in $choices) 
                      { 
                          if ($choices[i].id >= (visibleLinks + 2)) { extrasLs.push($choices[i]) }
                      }
                      jQuery('div.extraLinksHidden').data("foo", extrasLs);
                 //let's return the menu on top to a default state:
                 var countdown =   ($choices.length <= 4) ? $choices.length - 1 :  $choices.length - 1;
                  
                 for (i = (countdown); i < 11; i++)
                 {
                     jQuery('#bigmenu_' + (parseInt(i) + 2)).html('+').css({'background-position':'10px 12px', 'background-color': '#aaa', 'background-image' : 'none'});
                 }
             },
             theList: function()
             {
                return $choices;   
             }
        },
        mobiconf : { 
            urlAccess : function(id, choiceURL) 
            { theMenus.menuChoices.urlAccess(choiceURL, id); },
           
        }
        , 
        thing : {
            x : "Application Title",
            image : "icons/Willkommen_mobil.png"
        }
    };
});
//alert(mobiconfURL);
myAppModule.controller('customizeLook',
function($scope, menuPalette)
{
    var $palettes = [{name:'desert', id:'1'},
            {name:'forest', id:'2'},
        {name:'ice', id:'3'},
        {name:'pure_orange', id:'4'},
        {name:'raspberry', id:'5'},
        {name:'stone', id:'6'},
        {name:'lavender', id:'7'}];
        $scope.palettes = $palettes;
        $scope.changePalette = function(id) { menuPalette.menPl.colorChooser(id);}
});

myAppModule.controller('TextController',
function($scope) {
var someText = {};
    someText.message = 'You have started your journey.';
    $scope.someText = someText;
});
myAppModule.controller('setupApplication',
        function($scope, theService)
{
      $scope.apptitle = theService.thing;
});
myAppModule.controller('androidController',
    function($scope, theService) {
       
 
     var $choices = theService.menuHandler.theList();//[{name:'Home', id:'1',  image: 'home.png', url: 'home'}];
     $scope.menus =  $choices;
     $scope.youCheckedIt = theService.thing;
     $scope.changeMenu = function()
    {
        $scope.menus = theService.menuHandler.theList();
    }
     $scope.changeScreen = function(obj, $event) { var id = jQuery($event.target).attr('id');
         
        id = id.replace('androidMenu', '');
        var dataMyURL = jQuery($event.target).attr('data-myURL');//jQuery(andrMenuID).attr('data-myURL');
        if (typeof dataMyURL == 'undefined') return;
        theService.mobiconf.urlAccess(id, dataMyURL);
        jQuery('#iPhoneOutContent').css({'top' : '0px'});
        jQuery('#androidOutContent').css({'top' : '0px'});
        jQuery('#diviPhoneContModf').css({'background-image' : 'none'}); 
        jQuery('#divAndroidContModf').css({'background-image' : 'none'}); }
});
myAppModule.controller('iPhoneController',
    function($scope, theService) { 
    var $choices = theService.menuHandler.theList();//[{name:'Home', id:'1',  image: 'home.png', url: 'home'}];
    $scope.changeMenu = function()
    {
        $scope.menus = theService.menuHandler.theList();
    }
    $scope.changeScreen = function(obj, $event) 
    {  
        var id = jQuery($event.target).attr('id');
        id = id.replace('androidMenu', '');
        var dataMyURL = jQuery($event.target).attr('data-myURL');//jQuery(andrMenuID).attr('data-myURL');
        if (typeof dataMyURL == 'undefined') return;
        theService.mobiconf.urlAccess(id, dataMyURL);
        jQuery('#iPhoneOutContent').css({'top' : '0px'});
        jQuery('#androidOutContent').css({'top' : '0px'});
        jQuery('#diviPhoneContModf').css({'background-image' : 'none'}); 
        jQuery('#divAndroidContModf').css({'background-image' : 'none'}); 
    }
    $scope.menus = $choices;   
    $scope.youCheckedIt2 = theService.thing;
    $scope.$evalAsync(function() {
        var oldtitle = getStoredData(); 
        if (oldtitle) theService.thing.x = oldtitle;  });       
} 
);
myAppModule.controller('mobileCustomizer_1', 
    function($scope, $http){
        
        var $students = [{name:'Blog', id:'1', layer_id:'blog'},
            {name:'Business', id:'2', layer_id:'business'},
        {name:'Education', id:'3', layer_id:'education'},
        {name:'Events', id:'4', layer_id:'events'},
        {name:'Music', id:'5', layer_id:'music'},
        {name:'Photography', id:'6', layer_id:'photography'},
    {name:'Restaurants', id:'7', layer_id:'restaurants'},
        {name:'Other', id:'8', layer_id:'other'}];
        $scope.students = $students;
        $scope.chooseAppType = function(id)
        {
            var imageURL = mobiconfURL + id + '.png';
            var windowWidth = '100%';
            var windowHeight = '100%';
            jQuery('#diviPhoneContentOverlay').css({'background-image' : 'url(' + imageURL + ')', backgroundSize : windowWidth + ' ' + windowHeight});
            jQuery('#divAndroidContentOverlay').css({'background-image' : 'url(' + imageURL + ')', backgroundSize : windowWidth + ' ' + windowHeight});
        }
        $scope.submitData = function()
        {
            $http({method: 'POST', url: mobifURL+"?option=com_mobiconf&task=uploadImage", 
                data: {upload_file: $scope.fetchImg, 'option': 'com_mobiconf', 'task': 'uploadImage', 'uname': '', 'pswd': '', 'email': ''}, 
                headers: {
'Content-Type': undefined
}, transformRequest: function(data) { return data; }})
            //$http.post(mobifURL+"?option=com_mobiconf&task=uploadImage", {uploadImage: $scope.fetchImg , 'option': 'com_mobiconf', 'task': 'uploadImage', 'uname': '', 'pswd': '', 'email': ''}
                    /*)*/.success(function(data, status, headers, config) {
                       // alert(data);
                    }).error(function(data, status) { // called asynchronously if an error occurs
// or server returns response with an error status.
                        //$scope.errors.push(status);
                    });
        }
    }
);
myAppModule.controller('submitPhoneData', function ($scope, theService, $http) {
    $scope.errors = [];
    $scope.msgs = [];
    $scope.submitData_2 = function()
    {
        var $choices = theService.menuHandler.theList();
        var title = theService.thing.x;
        if (title == "" || title.toLowerCase() == 'application title') { $scope.errors.push("A proper title is needed"); return; }
         
        var theme = jQuery('#theme').val();
        var userid = jQuery('#userid').val();
        var fbuserid = jQuery('#fbuserid').val();    
        var projectid = jQuery('#projectid').val();
        
        for (ug in $choices)
        {
            console.log(ug + " is " + $choices[ug].url);
            if ($choices[ug].url == 'facebook-feed') { $choices[ug].url = jQuery('#facebook-feed').val(); }
            if ($choices[ug].url == 'facebook-albums') 
            { if (jQuery('#facebook-albums').val().trim() != '') { $choices[ug].url = jQuery('#facebook-albums').val(); }
              else $choices[ug].url = jQuery('#facebook-feed').val().replace('feed', 'albums');
            }
            console.log(ug + " is " + $choices[ug].url);
        }
        $http.post(mobifURL + "?option=com_mobiconf&task=storeUserDat_2", {theme: theme, title: title, menus: $choices, projectid: projectid, fbuserid: fbuserid, userid: userid, usertoken: jQuery('#userToken').val()}
                    ).success(function(data, status, headers, config) { //alert(data);
                        if (data.msg != '')
                        {
                            $scope.msgs.push(data.msg);
                            if (!isNaN(data.id)) window.location.href= mobifURL + "?option=com_mobiconf&task=fnl&id="+data.id; 
                            else {$scope.msgs.push("There has been an error. We are unable to get the project id");}
                        }
                        else { $scope.errors.push(data.error); }
                    }).error(function(data, status) {  
// or server returns response with an error status.
                        $scope.errors.push(status);
                    });
    }
    $scope.submitData = function()
    {
         var title = theService.thing.x;
         $scope.errors.splice(0, $scope.errors.length); // remove all error messages
         $scope.msgs.splice(0, $scope.msgs.length);
         if (title == "" || title.toLowerCase() == 'application title') { $scope.errors.push("A proper title is needed"); return; }
         var backimage = jQuery('#diviPhoneContentOverlay').css('background-image').replace('url("','').replace('")', '');
         var userid = jQuery('#userid').val();
         var fbuserid = jQuery('#fbuserid').val();
         var projectid = jQuery('#projectid').val();
         
         if (backimage == 'none' || backimage.trim() == '')
         {
             $scope.errors.push("Please select a loading image before you continue.");
             return;
         }
         
                    $http.post(mobifURL + "?option=com_mobiconf&task=storeUserData", {projectid: projectid, fbuserid: fbuserid, userid: userid, title: title, backimage : backimage, usertoken: jQuery('#userToken').val()}
                    ).success(function(data, status, headers, config) { //alert(data);
                        if (data.msg != '')
                        {
                            $scope.msgs.push(data.msg);
                            if (!isNaN(data.id)) window.location.href= mobifURL + "?option=com_mobiconf&task=setup&id="+data.id; 
                            else {$scope.msgs.push("There has been an error. We are unable to get the project id");}
                        }
                        else { $scope.errors.push(data.error); }
                    }).error(function(data, status) { // called asynchronously if an error occurs
// or server returns response with an error status.
                        $scope.errors.push(status);
                    });
    }
})   
myAppModule.controller('mobileCustomizer_2', 
    function($scope, theService) {
        var options_2 = {
    beforeSend: function() { besend(); },
    uploadProgress: function(event, position, total, percentComplete) { uploadPro(); },
    success: function() { suc(); },
    complete: function(response)
    { 
        $scope.$apply(function(){//force ng-repeat to digest this:
        var icon = {};
        data = JSON.parse(response.responseText);
       // var imageURL = mobiconfURL + data.dir + "/" + data.filename;
        icon.image = "useruploads/thumbnails/" + data.filename;
        theService.theIcons.addIcon(icon);
        $scope.icons = theService.theIcons.toIcons();
    });
    },
    error: function() { jQuery("#message").html("<font color='red'> ERROR: unable to upload files</font>");  }
 };
        jQuery("#myForm_2").ajaxForm(options_2);
        //used to create the editing Menus:
        var $toFill = [{name:'Home', id:'1', layer_id:'home', background: '#a00'},//this is the one that shows up first in the app
           {name:'+', id:'2', layer_id:'videos', background: '#0a0'},
        {name:'+', id:'3', layer_id:'feed', background: '#aaa'}, {name:'+', id:'4', layer_id:'empty', background: '#aaa'}
    ,{name:'+', id:'5', layer_id:'feed', background: '#aaa'},
{name:'+', id:'6', layer_id:'feed', background: '#aaa'},
{name:'+', id:'7', layer_id:'feed', background: '#aaa'}, {name:'+', id:'8', layer_id:'feed', background: '#aaa'}
, {name:'+', id:'9', layer_id:'feed', background: '#aaa'}, {name:'+', id:'10', layer_id:'feed', background: '#aaa'},  {name:'+', id:'11', layer_id:'feed', background: '#aaa'}];
        $scope.layers = $toFill;
        $scope.icons = theService.theIcons.toIcons();
        $scope.appName = '';
        $scope.newMenu = theService.thing;
        $scope.refreshLayers = function($toFill) { $scope.layers = $toFill; }
        $scope.changeIcon = function(icon)
        {  
           angular.element(jQuery("#customizeApp")).scope().newMenu.image = icon;
        }
        $scope.ChangefromFB = function()
        {
            var $choices = theService.menuHandler.theList();
            for (ug in $choices)
            {
                console.log(ug + " is " + $choices[ug].url);
                if ($choices[ug].url == 'facebook-feed') { $choices[ug].url = jQuery('#facebook-feed').val(); }
                if ($choices[ug].url == 'facebook-albums') 
                { if (jQuery('#facebook-albums').val().trim() != '') { $choices[ug].url = jQuery('#facebook-albums').val(); }
                  else $choices[ug].url = jQuery('#facebook-feed').val().replace('feed', 'albums');
                }
            }
        }
        $scope.saveMenu = function()
        {
             
           theService.menuHandler.addMenu($scope.newMenu);
           jQuery('h2.addanicon').html('Add an Icon:');
           $scope.newMenu = {};//prevent future submissions from being bound to a previous submission
           
        }
        $scope.deleteMenu = function()
        {
            theService.menuHandler.deleteMenu($scope.newMenu);
        }
        $scope.chooseAppType = function(id)//bear in mind that when this function activates, the screen on the application will also change
        {
            var andrMenuID = '#androidMenu' + id;
            var dataMyURL = jQuery(andrMenuID).attr('data-myURL');
            
            if (typeof dataMyURL == 'undefined') //nothing here, adding instead of editing
            { 
                 $scope.newMenu = {};
                 jQuery('h2.addanicon').html('Add an Icon:');
                 return;
            }
            jQuery('h2.addanicon').html('Edit an Icon:');
            
            theService.mobiconf.urlAccess(id, dataMyURL);
             
            $scope.newMenu = angular.copy(theService.menuHandler.getMenu(id));
            jQuery('#iPhoneOutContent').css({'top' : '0px'});
            jQuery('#androidOutContent').css({'top' : '0px'});
            jQuery('#diviPhoneContModf').css({'background-image' : 'none'}); 
            jQuery('#divAndroidContModf').css({'background-image' : 'none'}); 
            
        }
        //these are the menus added by default:
       $scope.getLinks = function()//
       { 
            var serialinks = (typeof jQuery('#serialinks').html() !='undefined' && jQuery('#serialinks').html() != 'false') ? jQuery('#serialinks').html() : '';
            if (serialinks) {serialinks = JSON.parse(serialinks);
            var re;
            for (ser in serialinks)
            {
                re = {}; 
                if (isNaN(serialinks[ser].id)) continue;
                re.image = serialinks[ser].image; 
                re.url = serialinks[ser].url;
                re.name = serialinks[ser].name;
                theService.menuHandler.addMenu(re);
            }
            } else {//default links: 
            re = {};// Object.create({}, { image: { value: '' } })
            re.image ='icons/Server_mobil.png';//*********************************************************
            re.url ='facebook-albums';
            re.name ='Albums';
            theService.menuHandler.addMenu(re);
            /*
            re = {};// Object.create({}, { image: { value: '' } })
            re.image ='icons/Radio_mobil.png';//*********************************************************
            re.url ='facebook-albums';
            re.name ='Albums';
            theService.menuHandler.addMenu(re);*/
           
             
       }}
    }
);



var ErrorFunc = {
    closeErorrs: function () {
        jQuery(".errorMsg").css("display", "none");
    },
    closeFunction: function () {
        jQuery(this).parent().css("display", "none");
    },
    openError: function (errorBox) {
        jQuery(errorBox).css("display", "block");
    }
};


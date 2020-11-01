 /*function checkLoginState() {  
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
       appId      : 692797987462997,
    status     : true,
    xfbml      : true,
    version    : 'v2.1'                               // Look for social plugins on the page
    });
       authUser();    
       promptLogin();
       checkLoginState();
       //FB.getLoginStatus(function(response) { statusChangeCallback(response); });
    // Additional initialization code such as adding Event Listeners goes here
  };
  
  
  
    
  // Load the SDK asynchronously
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_GB/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
 

 function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      authUser();
        FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
    function promptLogin() { FB.login(null, {scope: 'email, user_photos, read_stream, manage_pages'}); }
function authUser() {  FB.Event.subscribe('auth.statusChange', handleStatusChange); }
function handleStatusChange(session) {
    //console.log('Got the user\'s session: ' + JSON.stringify(session));
    
    
    if (session.authResponse) {
        
        //Fetch user's id, name, and picture
        FB.api('/me', { 
          fields: 'name, picture, locale, birthday, photos, username, gender, link, user_photos, hometown,location, accounts'
        },
        //https://graph.facebook.com/rpcarbonell/?fields=posts&access_token="+FB.getAccessToken();
        
        function(response) {
              var url = "https://graph.facebook.com/me?access_token="+FB.getAccessToken();
                localStorage.setItem("FB_AccessToken", FB.getAccessToken());
                localStorage.setItem("FB_OldToken", localStorage.getItem("FB_AccessToken") );
                
                 //url = "https://graph.facebook.com/rpcarbonell/";
                jQuery.ajax({url: url, type: "GET", data: {  }, cache: false,
                   success: function(html) 
                   { //alert(html.id);
                        if (typeof (html.id) == 'undefined') {alert ('fb id is not there'); return; }
                       localStorage.setItem("FB_ID", html.id);
                       localStorage.setItem("_oldFB_ID", html.id);
                       
                       // else if (typeof (html.data[0].from) == 'undefined') {alert ('html.data.from is undefined'); return; }
                        //else if (typeof (html.data[0].id) == 'undefined') {alert ('html.data.from id is undefined'); return; }
                        jQuery('#fbuserid').val(html.id);
                        FBOptions.FBgetFeed();
                        FBOptions.getUserPages(html.id);
                   },
                   error: function(html){   }
                   });
          
           
        });
    }
    
}
function clearAction() 
{
    
}

var FBOptions = {
    FBParser: function(option)
    {
        if (option == 'facebook-feed') { FBOptions.FBgetFeed('me');}
        else if (option == 'facebook-albums') { FBOptions.FBgetPhotos('me');}
        else FBOptions.FBgetinfo(option);
    },
    AccessToken: function()
    {
        var accessToken = localStorage.getItem("FB_AccessToken"); 
        return accessToken;
    },
    FB_ID: function()
    {
        var accessToken = localStorage.getItem("FB_ID");
        return accessToken;
    },
    FBgetFeed: function()
    {
        var id = FBOptions.FB_ID();
        var url = "https://graph.facebook.com/"+ id +"/feed?access_token="+FBOptions.AccessToken();
         
        jQuery('#facebook-feed').val("https://graph.facebook.com/"+ id +"/feed");
        //jQuery("input[name=tab_url]").val("http://www.facebook.com/"+ id+"/feed");
         jQuery.ajax({url: url, type: "GET", data: {  }, cache: false,
                       success: function(html) 
                       { data = html.data; 
                           angular.element(jQuery("#customizeApp")).scope().ChangefromFB();
                           htmlvid = '';
                           var urlphoto;
                           var timestamp, formatted, t;
                           var mmToMonth = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
                           for (i in data) 
                           { 
                               // alert(data[i].id);
                                if (i > 5) continue;
                                if (typeof data[i].message == 'undefined' && typeof data[i].story == 'undefined') continue;
                                
                                
                                 
                                
                                 timestamp = (new Date(data[i].created_time).getTime())/1000;
                                 var dt = new Date(timestamp * 1000);
                                  var mm = mmToMonth[dt.getMonth()];
                                 t = mm + ", " + dt.getDate() + ", " + dt.getFullYear();
                                 htmlvid += "<div style='font-size: 11px; margin-bottom: 5px; border: 2px solid #ddd; background: #fff; padding: 5px;'>"
                                 htmlvid += "<span style='color: #777;'>"+t+"</span><br />";
                                 data[i].story = (typeof data[i].story != 'undefined') ? data[i].story + "<br />" : '';
                                // alert(data[i].message);
                                data[i].message = (typeof data[i].message != 'undefined') ? data[i].message : '';
                               // alert(data[i].message);
                               if ((typeof data[i].picture != 'undefined'))
                                {
                                    htmlvid +=  "<img style='float: right; height: 100px;' src='" + data[i].picture + "' />";
                                } 
                               htmlvid += data[i].story + data[i].message;
                                
                                 if (typeof data[i].cover_photo != 'undefined') 
                                 {
                                     urlphoto = "https://graph.facebook.com/" + data[i].cover_photo + "/picture";
                                     htmlvid += "<img style='float: right; right: 20px; height: 70px;' src='" + urlphoto + "' /><div style='clear: both;'></div>";
                                 }
                                 htmlvid += "<div style='clear: both;'></div></div>";
                                 
                                 var iPhoneHeight = jQuery.data( document.body, "iPhoneHeight");
                                 var androidHeight = jQuery.data( document.body, "androidHeight");
                                 jQuery('#iPhoneOutContent').css({'height' : iPhoneHeight + 'px'});
                                 jQuery('#androidOutContent').css({'height' : androidHeight + 'px'});
                                 jQuery('#iPhoneOutContent').html(htmlvid);
                                 jQuery('#androidOutContent').html(htmlvid);
                                
                           } 
                           
                       },
                       error: function(html){  alert('unable to get data'); }
                       });
    },
    
    FBgetPhotos: function ()
    { 
        var id = FBOptions.FB_ID();
        var url = "https://graph.facebook.com/"+id+"/albums?access_token="+FBOptions.AccessToken();
         jQuery('#facebook-albums').val("https://graph.facebook.com/"+id+"/albums");
         jQuery("input[name=tab_url]").val("http://www.facebook.com/"+ id+"/albums");
        
                    jQuery.ajax({url: url, type: "GET", data: {  }, cache: false,
                       success: function(html) 
                       { data = html.data; 
                           angular.element(jQuery("#customizeApp")).scope().ChangefromFB();
                           htmlvid = '';
                           var urlphoto;
                           var timestamp, formatted, t;
                           var mmToMonth = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
                           for (i in data) 
                           { 
                               // alert(data[i].id);
                                if (i > 6) continue;
                                htmlvid += "<div style='margin-bottom: 5px; border: 2px solid #ddd; background: #fff; padding: 5px;'><b>"+data[i].name+"</b>";
                                
                                 
                                
                                 timestamp = (new Date(data[i].created_time).getTime())/1000;
                                 var dt = new Date(timestamp * 1000);
                                  var mm = mmToMonth[dt.getMonth()];
                                 t = mm + ", " + dt.getDate() + ", " + dt.getFullYear();
                                 htmlvid += "<br /><span style='font-size: 11px; color: #777;'>"+t+"</span>";
                                 if (typeof data[i].cover_photo != 'undefined') 
                                 {
                                     urlphoto = "https://graph.facebook.com/" + data[i].cover_photo + "/picture";
                                     htmlvid += "<img style='float: right; right: 20px; height: 70px;' src='" + urlphoto + "' /><div style='clear: both;'></div>";
                                 }
                                 htmlvid += "</div>";
                                 
                                 var iPhoneHeight = jQuery.data( document.body, "iPhoneHeight");
                                 var androidHeight = jQuery.data( document.body, "androidHeight");
                                 jQuery('#iPhoneOutContent').css({'height' : iPhoneHeight + 'px'});
                                 jQuery('#androidOutContent').css({'height' : androidHeight + 'px'});
                                 jQuery('#iPhoneOutContent').html(htmlvid);
                                 jQuery('#androidOutContent').html(htmlvid);
                                
                           }   
                       },
                       error: function(html){ alert('unable to get data'); }
                       });
                //   }});
    },
    getUserPages: function(id)
    {
        var url = "https://graph.facebook.com/"+ id +"/accounts?access_token="+FB.getAccessToken();
                    jQuery.ajax({url: url, type: "GET", data: {  }, cache: false,
                       success: function(html) 
                       {
                           dataPage = html.data;
                           var dataArray = [];
                           var dataArray_2 = [];
                           var selectOptions = "<option value='me'>Default User Website</option>";
                           for (i in dataPage) 
                           { 
                               if (typeof(dataPage[i].id) =='undefined' || dataPage[i].id == '') continue;
                               dataArray_2[i] = dataPage[i].access_token;
                               dataArray[i] = dataPage[i].id;
                               selectOptions += "<option value='"+dataPage[i].id+"'>"+dataPage[i].name+"</option>";
                           }
                           localStorage.setItem("dataArray_2", JSON.stringify(dataArray_2));
                           localStorage.setItem("dataArray", JSON.stringify(dataArray));
                           jQuery('#facebookPages').html(selectOptions);
                       },
                       error: function(html){ alert('unable to get data'); } });
    },
    selectPage: function()
    {
        var selObj = document.getElementById('facebookPages');
        var selIndex = selObj.selectedIndex;
        var selectedPageId = selObj.options[selIndex].value;
        var dataArray = localStorage.getItem("dataArray");
        dataArray = JSON.parse(dataArray);
        var indexChosen;
        for (i in dataArray) { if (selectedPageId == dataArray[i]) { indexChosen = i; } }
        if (typeof(indexChosen) == 'undefined') 
        {
            localStorage.setItem("FB_AccessToken", localStorage.getItem("FB_OldToken"));
            localStorage.setItem("FB_ID", localStorage.getItem("_oldFB_ID"));
            FBOptions.FBgetFeed(); 
            return;
        }
        dataArray = localStorage.getItem("dataArray_2");
        dataArray = JSON.parse(dataArray);
        localStorage.setItem("FB_AccessToken", dataArray[indexChosen]); 
        localStorage.setItem("FB_ID", selectedPageId);
        FBOptions.FBgetFeed();
        //FBOptions.getUserPages();
    },
    FBgetinfo: function(url)
    {
        var urlSplit = url.split('/');
        var FacebookYes = false;
        var expressionMatch = false;
        var expression_2 = /(facebook)/gi;
        var regex_2 = new RegExp(expression_2);
        var expression = /(profile.php)/gi;
        var regex = new RegExp(expression);
        var urlMatches_2;
        
        for (us in urlSplit)
        {
            urlMatches_2 = urlSplit[us].toLowerCase().match(regex_2);
            if (FacebookYes)//put it before urlMatches_2
            {
                expressionMatch = urlSplit[us].toLowerCase().match(regex);//profile.php detect
                if (expressionMatch)//yes, it is profile.php 
                {
                    //alert(urlSplit[us]);
                    //alert('it is profile.php');
                    if (urlSplit[us].indexOf('?') > 1) //it could be a url with ? instead of /
                    {
                        var expression_3 = /(album|photo)/gi;
                        var regex_3 = new RegExp(expression_3);
                        var photoAlbum = urlSplit[us].match(regex_3);
                        //if (photoAlbum) alert('it is a photo-album');
                        //get the ID now
                        var afterInfo = urlSplit[us].split('?');
                        afterInfo = afterInfo[1];
                        afterInfo = afterInfo.split('&');
                        var afterVar;
                        for (xi in afterInfo)
                        {
                             afterVar = afterInfo[xi].split('=');
                             //alert(afterVar[0]);
                             if (afterVar[0] == 'id')
                             { if (photoAlbum) FBOptions.FBgetPhotos(afterVar[1]); else FBOptions.FBgetFeed(afterVar[1]); }
                        }
                    } else return;
                    //id=100003905656522&fref=ts
                }
                else //not profile.php, but equally complex *******************************************
                {
                    if (urlSplit[us].indexOf('?') > 1) //it could be a url with ? instead of /
                    {
                        var expression_3 = /(album|photo)/gi;
                        var regex_3 = new RegExp(expression_3);
                        var photoAlbum = urlSplit[us].match(regex_3);
                        //if (photoAlbum) alert('it is a photo-album');
                    }
                    else //it can be a URL like this https://www.facebook.com/thompsonde/album or similar
                    {
                           if(typeof urlSplit[parseInt(us) + 1] !=='undefined')
                           {
                               var expression_3 = /(album|photo)/gi;
                               var regex_3 = new RegExp(expression_3);
                               var photoAlbum = urlSplit[parseInt(us) + 1].match(regex_3);
                               //if (photoAlbum) alert('it is a photo-album');
                           }
                    }
                    var url = "https://graph.facebook.com/"+urlSplit[us]+"?access_token="+FB.getAccessToken();
                    jQuery.ajax({url: url, type: "GET", data: {  }, cache: false,
                       success: function(html) 
                       { if (photoAlbum) FBOptions.FBgetPhotos(html.id); else FBOptions.FBgetFeed(html.id); } 
                   });
                     
                }
                return;
            }
            if (urlMatches_2) { FacebookYes = true; }
            
        }
      
    },
    FBFormaPHP: function()
    {
          jQuery.ajax({
            type: "POST",
            
             url: mobifURL + "?option=com_mobiconf&task=facebook_1",
            data: { theurl: mobifURL },
            success: function (data) 
            {    var htmlvid =data; 
                 
                var iPhoneHeight = jQuery.data( document.body, "iPhoneHeight");
                 var androidHeight = jQuery.data( document.body, "androidHeight");
                 jQuery('#iPhoneOutContent').css({'height' : iPhoneHeight + 'px'});
                 jQuery('#androidOutContent').css({'height' : androidHeight + 'px'});
                 jQuery('#iPhoneOutContent').html(htmlvid);
                 jQuery('#androidOutContent').html(htmlvid);
            }
        });
    },
    
    FBFormat: function(formatted)
    {
        var htmlvid = formatted; 
                 var iPhoneHeight = jQuery.data( document.body, "iPhoneHeight");
                 var androidHeight = jQuery.data( document.body, "androidHeight");
                 jQuery('#iPhoneOutContent').css({'background': '#fff', 'height' : iPhoneHeight + 'px'});
                 jQuery('#androidOutContent').css({'background': '#fff','height' : androidHeight + 'px'});
                 jQuery('#iPhoneOutContent').html(htmlvid);
                 jQuery('#androidOutContent').html(htmlvid);
    }
}
*/
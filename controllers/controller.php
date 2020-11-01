<?php
defined('_JEXEC') or die;
jimport('joomla.application.component.controller');

class MoBiConFController extends JController
{
    private $X_LIMIT = 350;
    private $Y_LIMIT = 350;
    private $file_field = 'upload_file';
    private $fb_code = "\n<!--
        function checkLoginState() {  
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
     js.src = \"//connect.facebook.net/en_GB/all.js\";
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
        //https://graph.facebook.com/rpcarbonell/?fields=posts&access_token=\"+FB.getAccessToken();
        
        function(response) {
              var url = \"https://graph.facebook.com/me?access_token=\"+FB.getAccessToken();
                localStorage.setItem(\"FB_AccessToken\", FB.getAccessToken());
                localStorage.setItem(\"FB_OldToken\", localStorage.getItem(\"FB_AccessToken\") );
                
                 //url = \"https://graph.facebook.com/rpcarbonell/\";
                jQuery.ajax({url: url, type: \"GET\", data: {  }, cache: false,
                   success: function(html) 
                   { //alert(html.id);
                        if (typeof (html.id) == 'undefined') {alert ('fb id is not there'); return; }
                       localStorage.setItem(\"FB_ID\", html.id);
                       localStorage.setItem(\"_oldFB_ID\", html.id);
                       
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
        var accessToken = localStorage.getItem(\"FB_AccessToken\"); 
        return accessToken;
    },
    FB_ID: function()
    {
        var accessToken = localStorage.getItem(\"FB_ID\");
        return accessToken;
    },
    FBgetFeed: function()
    {
        var id = FBOptions.FB_ID();
        var url = \"https://graph.facebook.com/\"+ id +\"/feed?access_token=\"+FBOptions.AccessToken();
         
        jQuery('#facebook-feed').val(\"https://graph.facebook.com/\"+ id +\"/feed\");
        //jQuery(\"input[name=tab_url]\").val(\"http://www.facebook.com/\"+ id+\"/feed\");
         jQuery.ajax({url: url, type: \"GET\", data: {  }, cache: false,
                       success: function(html) 
                       { data = html.data; 
                           angular.element(jQuery(\"#customizeApp\")).scope().ChangefromFB();
                           htmlvid = '';
                           var urlphoto;
                           var timestamp, formatted, t;
                           var mmToMonth = new Array(\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\");
                           for (i in data) 
                           { 
                               // alert(data[i].id);
                                if (i > 5) continue;
                                if (typeof data[i].message == 'undefined' && typeof data[i].story == 'undefined') continue;
                                
                                
                                 
                                
                                 timestamp = (new Date(data[i].created_time).getTime())/1000;
                                 var dt = new Date(timestamp * 1000);
                                  var mm = mmToMonth[dt.getMonth()];
                                 t = mm + \", \" + dt.getDate() + \", \" + dt.getFullYear();
                                 htmlvid += \"<div style='font-size: 11px; margin-bottom: 5px; border: 2px solid #ddd; background: #fff; padding: 5px;'>\"
                                 htmlvid += \"<span style='color: #777;'>\"+t+\"</span><br />\";
                                 data[i].story = (typeof data[i].story != 'undefined') ? data[i].story + \"<br />\" : '';
                                // alert(data[i].message);
                                data[i].message = (typeof data[i].message != 'undefined') ? data[i].message : '';
                               // alert(data[i].message);
                               if ((typeof data[i].picture != 'undefined'))
                                {
                                    htmlvid +=  \"<img style='float: right; height: 100px;' src='\" + data[i].picture + \"' />\";
                                } 
                               htmlvid += data[i].story + data[i].message;
                                
                                 if (typeof data[i].cover_photo != 'undefined') 
                                 {
                                     urlphoto = \"https://graph.facebook.com/\" + data[i].cover_photo + \"/picture\";
                                     htmlvid += \"<img style='float: right; right: 20px; height: 70px;' src='\" + urlphoto + \"' /><div style='clear: both;'></div>\";
                                 }
                                 htmlvid += \"<div style='clear: both;'></div></div>\";
                                 
                                 var iPhoneHeight = jQuery.data( document.body, \"iPhoneHeight\");
                                 var androidHeight = jQuery.data( document.body, \"androidHeight\");
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
        var url = \"https://graph.facebook.com/\"+id+\"/albums?access_token=\"+FBOptions.AccessToken();
         jQuery('#facebook-albums').val(\"https://graph.facebook.com/\"+id+\"/albums\");
         jQuery(\"input[name=tab_url]\").val(\"http://www.facebook.com/\"+ id+\"/albums\");
        
                    jQuery.ajax({url: url, type: \"GET\", data: {  }, cache: false,
                       success: function(html) 
                       { data = html.data; 
                           angular.element(jQuery(\"#customizeApp\")).scope().ChangefromFB();
                           htmlvid = '';
                           var urlphoto;
                           var timestamp, formatted, t;
                           var mmToMonth = new Array(\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\");
                           for (i in data) 
                           { 
                               // alert(data[i].id);
                                if (i > 6) continue;
                                htmlvid += \"<div style='margin-bottom: 5px; border: 2px solid #ddd; background: #fff; padding: 5px;'><b>\"+data[i].name+\"</b>\";
                                
                                 
                                
                                 timestamp = (new Date(data[i].created_time).getTime())/1000;
                                 var dt = new Date(timestamp * 1000);
                                  var mm = mmToMonth[dt.getMonth()];
                                 t = mm + \", \" + dt.getDate() + \", \" + dt.getFullYear();
                                 htmlvid += \"<br /><span style='font-size: 11px; color: #777;'>\"+t+\"</span>\";
                                 if (typeof data[i].cover_photo != 'undefined') 
                                 {
                                     urlphoto = \"https://graph.facebook.com/\" + data[i].cover_photo + \"/picture\";
                                     htmlvid += \"<img style='float: right; right: 20px; height: 70px;' src='\" + urlphoto + \"' /><div style='clear: both;'></div>\";
                                 }
                                 htmlvid += \"</div>\";
                                 
                                 var iPhoneHeight = jQuery.data( document.body, \"iPhoneHeight\");
                                 var androidHeight = jQuery.data( document.body, \"androidHeight\");
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
        var url = \"https://graph.facebook.com/\"+ id +\"/accounts?access_token=\"+FB.getAccessToken();
                    jQuery.ajax({url: url, type: \"GET\", data: {  }, cache: false,
                       success: function(html) 
                       {
                           dataPage = html.data;
                           var dataArray = [];
                           var dataArray_2 = [];
                           var selectOptions = \"<option value='me'>Default User Website</option>\";
                           for (i in dataPage) 
                           { 
                               if (typeof(dataPage[i].id) =='undefined' || dataPage[i].id == '') continue;
                               dataArray_2[i] = dataPage[i].access_token;
                               dataArray[i] = dataPage[i].id;
                               selectOptions += \"<option value='\"+dataPage[i].id+\"'>\"+dataPage[i].name+\"</option>\";
                           }
                           localStorage.setItem(\"dataArray_2\", JSON.stringify(dataArray_2));
                           localStorage.setItem(\"dataArray\", JSON.stringify(dataArray));
                           jQuery('#facebookPages').html(selectOptions);
                       },
                       error: function(html){ alert('unable to get data'); } });
    },
    selectPage: function()
    {
        var selObj = document.getElementById('facebookPages');
        var selIndex = selObj.selectedIndex;
        var selectedPageId = selObj.options[selIndex].value;
        var dataArray = localStorage.getItem(\"dataArray\");
        dataArray = JSON.parse(dataArray);
        var indexChosen;
        for (i in dataArray) { if (selectedPageId == dataArray[i]) { indexChosen = i; } }
        if (typeof(indexChosen) == 'undefined') 
        {
            localStorage.setItem(\"FB_AccessToken\", localStorage.getItem(\"FB_OldToken\"));
            localStorage.setItem(\"FB_ID\", localStorage.getItem(\"_oldFB_ID\"));
            FBOptions.FBgetFeed(); 
            return;
        }
        dataArray = localStorage.getItem(\"dataArray_2\");
        dataArray = JSON.parse(dataArray);
        localStorage.setItem(\"FB_AccessToken\", dataArray[indexChosen]); 
        localStorage.setItem(\"FB_ID\", selectedPageId);
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
                    var url = \"https://graph.facebook.com/\"+urlSplit[us]+\"?access_token=\"+FB.getAccessToken();
                    jQuery.ajax({url: url, type: \"GET\", data: {  }, cache: false,
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
            type: \"POST\",
            
             url: mobifURL + \"?option=com_mobiconf&task=facebook_1\",
            data: { theurl: mobifURL },
            success: function (data) 
            {    var htmlvid =data; 
                 
                var iPhoneHeight = jQuery.data( document.body, \"iPhoneHeight\");
                 var androidHeight = jQuery.data( document.body, \"androidHeight\");
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
                 var iPhoneHeight = jQuery.data( document.body, \"iPhoneHeight\");
                 var androidHeight = jQuery.data( document.body, \"androidHeight\");
                 jQuery('#iPhoneOutContent').css({'background': '#fff', 'height' : iPhoneHeight + 'px'});
                 jQuery('#androidOutContent').css({'background': '#fff','height' : androidHeight + 'px'});
                 jQuery('#iPhoneOutContent').html(htmlvid);
                 jQuery('#androidOutContent').html(htmlvid);
    }
}
//-->\n";
     function __construct() { parent::__construct(); }
     public function addDBTables()
             
     {
        $query = "CREATE TABLE IF NOT EXISTS `#__mobiconf_appdata` (
  `id` int(13) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `facebook` varchar(50) NOT NULL,
  `background` varchar(300) NOT NULL,
  `title` varchar(50) NOT NULL,
  `last_updated` int(13) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;";
     }
     public function twitter()
     {
         $document = JFactory::getDocument();
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "css/twitter.css";
         $document->addStyleSheet($uribase);
         require_once(JPATH_COMPONENT.'/libraries/twitteroauth.php');
             $theurl = $_POST['theurl'];
             $theurl = explode('/', $theurl);
             $username = $theurl[count($theurl) - 1];
             //echo "username ius $username ";
             $pos = strpos($username, '.');  
             //echo "pos is $pos";
              if ($username == '' || $pos !== false) 
             {
                 $username = "rpcarnell";
             }
            // echo "username is $username";
             # Define constants
            define('TWEET_LIMIT', 5);
            define('TWITTER_USERNAME', $username);
            $params = JComponentHelper::getParams( 'com_mobiconf' );
            define('CONSUMER_KEY', $params->get('twitter_key'));
            define('CONSUMER_SECRET', $params->get('twitter_secret'));
            define('ACCESS_TOKEN', 'YOUR_TOKEN');
            define('ACCESS_TOKEN_SECRET', 'YOUR_TOKEN_SECRET');
             
            
            # Create the connection
            $twitter = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
            //print_r($twitter->token);
            # Migrate over to SSL/TLS
            $twitter->ssl_verifypeer = true;

            # Load the Tweets
            $tweets = $twitter->get('statuses/user_timeline', array('screen_name' => TWITTER_USERNAME, 'exclude_replies' => 'true', 'include_rts' => 'false', 'count' => TWEET_LIMIT));
           //print_r($tweets->errors[0]->message);
            if (isset($tweets->errors[0]->message))
            {
                echo "Unable to authenticate Twitter keys.";//$tweets->errors[0]->message;
                exit;
            }
         
            ?>
<div class='twitter-data'>
<div class="profile" followedby="false" verified="false" protected="false" data-id="35470897" currentuser="true">

    <div class="profile-overview">
        <div class="basics" style="position: relative; background-image: -moz-linear-gradient(5…ofile/assets/bg_profile_empty.png"); background-size: cover;"></div>
        <div class="auxiliary">
            <div class="profile-counts">
                <div class="stats-count-group tweet-count activeLink" href="/rpcarnell/tweets">
                    <div class="stats-count">

                         <?php echo $tweets[0]->user->statuses_count;?>

                    </div>
                    <div class="stats-name">

                         Tweets 

                    </div>
                </div>
                <div class="stats-count-group followings-count activeLink" href="/rpcarnell/followings">
                    <div class="stats-count">

                         188 

                    </div>
                    <div class="stats-name">

                         Following 

                    </div>
                </div>
                <div class="stats-count-group followers-count activeLink" href="/rpcarnell/followers">
                    <div class="stats-count">

                        <?php echo $tweets[0]->user->followers_count;?>

                    </div>
                    <div class="stats-name">

                         Followers 

                    </div>
                </div>
            </div>
            <div class="profile-actions">
                 
                <div class="flexible-space"></div>
               
            </div>
        </div></div>
    </div>
<ul class="stream-items no-end-item" type="profile_tweets">
    <?php
            foreach($tweets as $tw)
            {  //print_r($tw);
                ?>


    <li class="stream-item stream-tweet">
        
    
        
        <i class="tweet-dogear"></i>
        <div class="stream-item-wrapper tweet-item">
            <div class="tweet-body">
                <div class="profile-link tweet-image">
                    <img class="avatar" src="<?php echo $tw->user->profile_image_url; ?>"></img>
                </div>
                <div class="tweet-content">
                    <div class="tweet-row">
                        
                        
                        <div class="user-name"> 
                    <span class="full-name"> <?php echo $tw->user->name;?> </span> 
                    <i class="verified-icon"></i> <span class="screen-name"> <s>@</s><?php echo $tw->user->screen_name;?> </span> 
                </div>   <div class="timestamp" timestamp="1401247341000"><?php echo date('M d', strtotime($tw->created_at)); ?></div>  
                        
                    </div>
                    <div class="tweet-text">
                        <div class="tweet-text-inner">
                            <div class="dir-ltr">

                               <?php echo $tw->text; ?>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
<?php 
          }
           ?>
    </ul></div>
    <?php
            exit;
           return;
          
     }        
     public function youtube()
     {
         include(JPATH_COMPONENT."/libraries/mobileurls.php");
         $url = "https://youtube.com/channel/UCkQX1tChV7Z7l1LFF4L9j_g";
         $url = "https://www.flickr.com/photos/glenn-in-japan/with/3212206475/";
         $url = "https://www.flickr.com/search/?q=bodypainting";
       //  $url = "http://m.youtube.com/watch?v=omX1wbQiQ2c&fs=1";
         //$url = "https://mobile.twitter.com/rpcarnell";
         $url = "'https://www.flickr.com/photos/glenn-in-japan/with/3212206475/'";
          $url = "https://www.twitter.com/rpcarnell";
        // twitterMobile($url);
        // $url = "https://m.youtube.com/results?search_query=bodypaint";
         // $url = "http://www.google.com";
      //  echo file_get_contents($url); exit;
         //twitterMobile($url);
         exit;
     }
     public function mbdesign()
     {  
         $document = JFactory::getDocument();
         $params = JComponentHelper::getParams( 'com_mobiconf' );
         $fb_id = $params->get('fb_app_id');
         $content = "var fb_app_id='$fb_id';";
         $document->addScriptDeclaration($content);
         $content = "var mobifURL='".JURI::base()."';";
         $document->addScriptDeclaration($content);
         //$document->addScript('http://connect.facebook.net/en_US/all.js');
         $content = "var mobiconfURL='".JURI::base()."components/com_mobiconf/images/';";
         $document->addScriptDeclaration($content);
         $document->addScriptDeclaration($this->fb_code);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "css/style.css";
         $document->addStyleSheet($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "css/jquery-ui-1.10.4.custom.css";
         $document->addStyleSheet($uribase);
         ///var/www/html/redgiantdev/components/com_mobiconf/css/jquery-ui-1.10.4.custom.css
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/jquery.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/jquery.form.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/jquery-ui-1.10.4.custom.min.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/angular.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/mobifunctions.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/mobiconf.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/websites/facebook.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/websites/webparser.js";
         $document->addScript($uribase);
         $id = JRequest::getVar('id','0', 'int');
         $user = &JFactory::getUser();
         
         if ($id > 0) { $storeData = $this->getUserOld($id, $user->id); }
         $viewType = $document->getType();
         $view = $this->getView  ( 'mbdesign',$viewType);
         $view->assign('userid', $user->id);
         $view->assign('storeData', $storeData);
         $projectid = ($storeData && $id) ? $id : 0;
         $view->assign('projectid', $projectid);
         $view->display();
     }
     private function getUserOld($id, $user_id)
     {
         $db = JFactory::getDBO();
         $query = "SELECT * FROM #__mobiconf_appdata WHERE id = $id AND user_id = $user_id LIMIT 1";
         $db->setQuery($query);
         $row = $db->loadObject();
         return ($row) ? $row : false;
     }
     private function getUserOld_2($id, $user_id)
     {
         $db = JFactory::getDBO();
         $query = "SELECT * FROM #__mobiconf_appda_2 WHERE project_id = $id AND user_id = $user_id LIMIT 1";
         $db->setQuery($query);
         $row = $db->loadObject();
         return ($row) ? $row : false;
     }
     public function setup()
     {
         $document = JFactory::getDocument();
         $params = JComponentHelper::getParams( 'com_mobiconf' );
         $fb_id = $params->get('fb_app_id');
         $content = "var fb_app_id='$fb_id';";
         $document->addScriptDeclaration($content);
         $document->addScriptDeclaration('var mobifURL="'.JURI::base().'";');
         $document->addScriptDeclaration('var arid="'.$_GET['arid'].'";');
          //$document->addScript('http://connect.facebook.net/en_GB/all.js');
         $document->addScriptDeclaration($this->fb_code);
         $content = "var mobiconfURL='".JURI::base()."components/com_mobiconf/images/';";
         $document->addScriptDeclaration($content);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "css/style.css";
         $document->addStyleSheet($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "css/jquery-ui-1.10.4.custom.css";
         $document->addStyleSheet($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "css/facebook_1.css";
         $document->addStyleSheet($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "css/facebook_2.css";
         $document->addStyleSheet($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "css/twitter.css";
         $document->addStyleSheet($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "css/colorpicker/layout.css";
         $document->addStyleSheet($uribase);
         ///var/www/html/redgiantdev/components/com_mobiconf/css/jquery-ui-1.10.4.custom.css
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/jquery.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/jquery.form.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/jquery-ui-1.10.4.custom.min.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/angular.js";
         $document->addScript($uribase);
         
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/mobifunctions.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/mobiconf.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/websites/facebook.js";
         $document->addScript($uribase);
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "assets/js/websites/webparser.js";
         $document->addScript($uribase);
         //$params = JComponentHelper::getParams( 'com_mobiconf' );
          
         //$recaptcha = $params->get('commentreCAPTCHA');
         $id = JRequest::getVar('id','0', 'int');
         $user = &JFactory::getUser();
         
         if ($id > 0) { 
              $storeData = $this->getUserOld($id, $user->id);  
              $storeDat2 = $this->getUserOld_2($id, $user->id); 
              
         }
         $viewType = $document->getType();
         $view = $this->getView  ( 'setupdesign',$viewType);
         $view->assign('userid', $user->id);
         $view->assign('storeData', $storeData);
          $view->assign('storeDat_2', $storeDat2);
         $projectid = ($storeData && $id) ? $id : 0;
         $view->assign('projectid', $projectid);
         $view->display();
     }
     public function fnl()
     {
         $document = JFactory::getDocument();
         $uribase = JURI::base(true). "/components/com_mobiconf". DS . "css/style.css";
         $document->addStyleSheet($uribase);
         $user = &JFactory::getUser();
         $db = JFactory::getDBO();
         $id = JRequest::getVar('id','0', 'int');
         $query = "SELECT * FROM #__mobiconf_appdata WHERE id = $id AND user_id= $user->id LIMIT 1";
         $db->setQuery($query);
         $row = $db->loadObject();
         $viewType = $document->getType();
         $view = $this->getView  ( 'final',$viewType);
         $view->assign('row', $row);
         $query = "SELECT * FROM #__mobiconf_appda_2 WHERE project_id = $id AND user_id= $user->id LIMIT 1";
         $db->setQuery($query);
         $row = $db->loadObject();
         $view->assign('row_2', $row);
         $params = JComponentHelper::getParams( 'com_mobiconf' );//let's get the virtuemart IDs
         $pr_id_1 = $params->get('virtuemart_product_1');
         $pr_id_2 = $params->get('virtuemart_product_2');
         $product_1 = $this->getProductInfo($pr_id_1);
         $product_2 = $this->getProductInfo($pr_id_2);
         $_SESSION['mobiconf'] = $user->id."-".$id;
         $view->assign('product_1', $product_1);
         $view->assign('product_2', $product_2);
         $view->display();
     }
     private function getProductInfo($id)
     {
         if(!is_numeric($id)) return;
         $query = "SELECT a.*, b.product_price FROM #__virtuemart_products_en_gb as a INNER JOIN #__virtuemart_product_prices as b ON a.virtuemart_product_id = b.virtuemart_product_id WHERE a.virtuemart_product_id = $id LIMIT 1";
         $db = JFactory::getDBO();
         $db->setQuery($query);
         $row = $db->loadObject();
         return ($row) ? $row : false;
     }
     public function storeUserData()
     {
         $data = json_decode(file_get_contents("php://input"));
         $user = &JFactory::getUser();
         /* if (!is_numeric($data->userid) || $data->userid == 0 || $user->id == 0) { $fr->id = '';
             $fr->error = "Your User id is not available. You may have to log in again.";
             $fr->msg = '';exit;}****************  <--- careful, userd is no longer being used */
         $fr = new stdClass();
         if (md5("dsd".date('Ymd', time())."sdsd") != $data->usertoken)
         {
             $fr->error = "Invalid Token";
             $fr->msg = '';
             echo json_encode($fr);
             exit;
         }
         //$fr->msg = $data->backimage." ".$data->userid. " ".$data->fbuserid;
         $projectID = $data->projectid;
         $projectExists = false;
        
         $db = JFactory::getDBO();
         $query = "INSERT INTO #__mobiconf_appdata (id ,user_id, facebook, background, title, last_updated) VALUES (NULL , '".$db->escape($data->userid)."', '".$db->escape($data->fbuserid)."', '".$db->escape($data->backimage)."', '".$db->escape($data->title)."', '".time()."')";
         if (is_numeric($projectID) && $projectID > 0)
         {
             $qu2 = "SELECT * FROM #__mobiconf_appdata WHERE id = $projectID AND user_id = '".$data->userid."' LIMIT 1";
             $db->setQuery($qu2);
             $row = $db->loadObject();
             if ($row)
             { 
                 $projectExists = true;
                 $query = "UPDATE #__mobiconf_appdata SET title='".$db->escape($data->title)."', last_updated='".time()."', facebook= '".$db->escape($data->fbuserid)."', background='".$db->escape($data->backimage)."' WHERE id = $projectID AND user_id = '".$data->userid."' LIMIT 1"; 
             }
         }
         $db->setQuery($query);
         $y = $db->query();
         if ($y)
         {
             if (! $projectExists) { $projectID = $db->insertid(); }
             $fr->id = $projectID;
             $fr->error = "";
             $fr->msg = 'Data has been successfully stored';
         }
         else
         {
             $fr->id = '';
             $fr->error = "There was an error storing your data. Please try again.";
             $fr->msg = '';
         }
         echo json_encode($fr);
         exit;
     }
     public function storeUserDat_2()
     {
         $data = json_decode(file_get_contents("php://input"));
         $user = &JFactory::getUser();
       /*  if (!is_numeric($data->userid) || $data->userid == 0 || $user->id == 0) { $fr->id = '';
             $fr->error = "Your User id is not available. You may have to log in again.";
             $fr->msg = '';exit;}*/
         if (!is_numeric($data->projectid))
         {
             $fr->error = "ERROR - project ID is not numeric";
             $fr->msg = '';
             echo json_encode($fr);
             exit;
         }
         $db = JFactory::getDBO();
         $query = "SELECT * FROM #__mobiconf_appda_2 WHERE project_id ='".$data->projectid."' AND user_id = '".$db->escape($data->userid)."' LIMIT 1";
         $db->setQuery($query);
         $row = $db->loadObject();
         if ($data->theme == '') { $data->theme = "desert"; }//use desert by default
         if ($row)
         { $query = "UPDATE #__mobiconf_appda_2 SET links='".serialize($data->menus)."', palette='".$db->escape($data->theme)."', updated='".time()."' WHERE project_id = '".$data->projectid."' AND user_id = '".$db->escape($data->userid)."' LIMIT 1"; }
         else { $query = "INSERT INTO #__mobiconf_appda_2 (project_id,user_id,links,palette, updated) VALUES ('".$data->projectid."', '".$db->escape($data->userid)."', '".serialize($data->menus)."', '".$db->escape($data->theme)."', ".time().");"; }
         
         $db->setQuery($query);
         $db->Query();
         $fr = new stdClass();
         if (md5("dsd".date('Ymd', time())."sdsd") != $data->usertoken)
         {
             $fr->error = "Invalid Token";
             $fr->msg = '';
             echo json_encode($fr);
             exit;
         }
         $fr->error = "";
         $fr->msg = 'Successful storage';
         $fr->id = $data->projectid;
         echo json_encode($fr);    
         exit;
     }
     public function contentChange_1()
     {
         ?> 
<div id='iPhoneOutContent'></div>
<div id="iPhoneBottom">
            <img class='iPhoneMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/home.png";?>" />
            <!--<img class='iPhoneMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/map.png";?>" />
            <img class='iPhoneMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/photo.png";?>" />
            <img class='iPhoneMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/video.png";?>" />
            <img class='iPhoneMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/fb.png";?>" />
             <img class='iPhoneMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/twitter.png";?>" />
            <img class='iPhoneMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/email.png";?>" />-->
</div>
         <?php 
     exit;
     }
     public function contentChange_2()
     {
         ?> <div id='androidOutContent'></div>
<div id="androidBottom">
            <img class='androidMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/home.png";?>" />
            <!--<img class='androidMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/map.png";?>" />
            <img class='androidMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/photo.png";?>" />
            <img class='androidMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/video.png";?>" />
            <img class='androidMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/fb.png";?>" />
             <img class='androidMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/twitter.png";?>" />
            <img class='androidMenu' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/menu/email.png";?>" />-->
            
        </div>
         <?php 
     exit;
     }
     public function facebook_1()
     {
         ?>
         <div style="width: 20%;">

    <div>
         
         <div style="width: 20%;">

    

         <div class="_70k">

    <div id="u_jsonp_2_2" class="_6_7 clearfix">
        <a class="_6-6 _6-7" href="https://www.facebook.com/rpcarbonell">

            Timeline

            <span class="_513x"></span>
        </a>
        <a class="_6-6" data-medley-id="pagelet_timeline_medley_about" href="https://www.facebook.com/rpcarbonell/about">

            About

            <span class="_513x"></span>
        </a>
        <a class="_6-6" data-medley-id="pagelet_timeline_medley_photos" href="https://www.facebook.com/rpcarbonell/photos">

            Photos

            <span class="_gs6">

                15

            </span>
            <span class="_513x"></span>
        </a>
        <a class="_6-6" data-medley-id="pagelet_timeline_medley_friends" href="https://www.facebook.com/rpcarbonell/friends">

            Friends

            <span class="_gs6">

                1,693

            </span>
            <span class="_513x"></span>
        </a>
        <div id="u_jsonp_2_3" class="_6a uiPopover _6-6 _9rx _5v-0">
            <a id="u_jsonp_2_4" class="_9ry _p" role="button" rel="toggle" aria-expanded="false" aria-haspopup="true" href="#">

                More

                <i class="_bxy img sp_yy1OffNzXet sx_d5e652"></i>
            </a>
        </div>
    </div>

</div>
    </div></div>
         <?php
         exit;
     }
     function uploadImage()
     {
         $token = md5("dsd".date('Ymd', time())."sdsd");
         if ($_POST['imageToken'] != $token) {echo 0; return;}
         list($dir, $filename) = $this->upload_pic();
         if ($dir && $filename) {
             echo json_encode(array('dir'=>$dir, 'filename' => $filename));
             $user = &JFactory::getUser();
             
         }
         else echo 0;
         exit;
     }
     private function storePicDB($dir, $filename, $user_id)
     {
         $db = JFactory::getDBO();
         $threeMonths = 90 * 24 * 3600;
         $oneWeek = 7 * 24 * 3600;
         $query = "( SELECT * FROM #__mobiconf_backg WHERE user_id = $user_id AND used = 0 AND  (".time()." - uploaded) > $oneWeek LIMIT 10 )";
         $query .= " UNION ( SELECT * FROM #__mobiconf_backg WHERE user_id = $user_id AND used = 1 AND  (".time()." - uploaded) > $threeMonths  LIMIT 10 )";
         //echo $query;
         $db->setQuery($query);
         $rows = $db->loadObjectList();
         if (is_array($rows)) { 
             foreach ($rows as $rw) 
                 { 
                     @unlink(JPATH_COMPONENT."/images/".$rw->directory."/".$rw->image);  
                     $delque = "DELETE FROM #__mobiconf_backg WHERE user_id = $user_id AND image= '$rw->image' LIMIT 1";
                     $db->setQuery($delque);
                     $db->Query();
                 } 
         }
         $query = "INSERT INTO #__mobiconf_backg (user_id,directory,image,uploaded)VALUES ('$user_id', '$dir', '".$db->escape($filename)."', '".time()."');";
         $db->setQuery($query);
         $db->Query();
     }
    function upload_pic($id = '', $directory = '')
    {

        include(JPATH_COMPONENT."/libraries/thumbnail.inc.php");
        jimport('joomla.client.helper');
        JClientHelper::setCredentialsFromRequest('ftp');

        jimport('joomla.filesystem.file');

        $file =& JRequest::getVar($this->file_field, '', 'files', 'array' );//Get File name, tmp_name
        //echo "file is $file";
        //print_r($file);
        $filename = JPath::clean(strtolower($file['name']));

        if (trim($file['type']) == '') {  return array(false, false);}
        if (trim($filename) == '') return array(false, false);
         $directory = 'useruploads';//'directcron'.DS.$directory;
            //$imgsettings = imageSettings::getInstance('upload_pic');
            $crudepath = JPATH_COMPONENT.DS.'images'.DS;//$imgsettings->imageDir();//JPATH_ROOT.DS.'images'.DS;
         JFolder::create($crudepath.DS.$directory, 0755);
         if (!is_writeable($crudepath.DS.$directory.DS))
           {

              echo "<script> alert('Error - Path ".$crudepath." is not writeable!');</script>\n";
                return array(false, false);   
           }
           else
           {
               $crudepath = $crudepath.DS.$directory.DS;
               JFolder::create($crudepath.'thumbnails', 0755);
           }
        //$filepath = JPATH_ROOT.DS.'images/albums'.DS.$filename;//specific path of the file
        $filepath = $crudepath.$filename;//specific path of the file
        if (is_file($filepath))
        {
             echo "<script> alert('The file you are trying to upload has already been uploaded.');</script>\n";
            return array($directory, $filename);
        }
        $allowed = array('image/jpeg', 'image/png', 'image/gif', 'image/JPG', 'image/jpg', 'image/pjpeg');

        if (!in_array($file['type'], $allowed)) //To check if the file are image file
        {
                echo "<script> alert('The file you are trying to upload ".$file['type']." is not supported.');</script>\n";
              return array(false, false); 
        }
        else
        {
                 JFile::upload($file['tmp_name'], $filepath);//first param is src file, second param is destination
                 /* Perhaps the file is too large, let's make it smaller: */
                  $img = $this->Right_Creator($crudepath, $filename);
                      if ($img === false) {
                          echo "<script> alert('File Error! File Type Error');</script>\n";
                               exit;
                          }
                      $width = imagesx( $img );
                      $height = imagesy( $img );
                      imagedestroy($img);
                      /*  we should always free up memory, always, and $img variable is also used in
                      * Minimize_Image method */
                      $smalled = 0;

                      if ($height > $this->Y_LIMIT)
                      {
                          $this->Minimize_Image($crudepath, $filename, $this->Y_LIMIT, 'height');
                          $smalled = 1;
                      }
                      if ($width > $this->X_LIMIT) {$this->Minimize_Image($crudepath, $filename, $this->X_LIMIT, 'width'); $smalled =1;}
                      //we now create a thumbnail:
                      $this->Minimize_Image($crudepath , $filename, 150, 'height', true);
                 $user = &JFactory::getUser();
                 $this->storePicDB($directory, $filename, $user->id);//storte the data in the database
                 return array($directory, $filename);
        }
    }
    private function Right_Creator($pathToImages, $fname)
    {
        $pos = strrpos($fname, ".");
          if ($pos === false) return false;
          $extension = strtolower(substr($fname, $pos +1));
          if ($extension == 'gif') $img = @imagecreatefromgif( "{$pathToImages}{$fname}" );
          elseif ($extension == 'png') $img = @imagecreatefrompng( "{$pathToImages}{$fname}" );
          elseif ($extension == 'bmp') $img = $this->ImageCreateFromBMP( "{$pathToImages}{$fname}" );
          else $img = @imagecreatefromjpeg( "{$pathToImages}{$fname}" );
          return $img;
    }
    private function Minimize_Image($pathToImages, $fname, $thumb = "150", $choice ='width', $thumbnail = false)
    {


       if ($fname == '') return;
       if (!is_writeable($pathToImages))
       {
              echo "<script> alert('Error - Path #1 is not writeable! Exiting now');</script>\n";
              exit;
       }
           $thumbClass = new Thumbnail($pathToImages.DS.$fname);
           if ($thumbnail === true)
          {
              $pathToImages = str_replace('\/\/', '\/', $pathToImages.DS.'thumbnails');
              if (!is_writeable($pathToImages))
       {
              echo "<script> alert('Error - Thumbnail Path is not writeable! Exiting now');</script>\n";

              exit;
       }
          }
           $height = $thumbClass->getCurrentHeight();
           $width = $thumbClass->getCurrentWidth();
           // calculate thumbnail size
           if ($choice == 'width') {$new_width = $thumb;
           $new_height = floor( $height * ( $thumb / $width ) );}
           else {$new_height = $thumb;
            $new_width = floor( $width * ( $thumb / $height ) );}
             $thumbClass->resize($new_width, $new_height);
             $thumbClass->save($pathToImages.DS.$fname, 100);



    }
}
?>
         
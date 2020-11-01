<?php 
//https://graph.facebook.com/search?callback=jQuery18208797525019607002_1399972821956&access_token=511450802262127|MnhPJPe0yb2HyKvfGimL6MsYZd8&q=gala&type=page&featureClass=P&style=full&fields=likes%2Cname%2Ccategory%2Cpicture%2Cis_community_page&className=facebookItem&selectAction=facebook&limit=30&_=1399975552643
if ($this->storeData)
{
    $background = $this->storeData->background;
    $title = $this->storeData->title;
    echo "<script>\nuseStoredData('".addslashes($title)."', '".addslashes($background)."');\n";
}
else
{   echo "<script>\nuseStoredData('', '')"; } //we must use this because localstorage stores things even when the page is reloaded
if ( $background) { echo "\njQuery(function() {  jQuery('#ownImage').show().html('Use My Own Image').click(function(){ ownBackground('".addslashes($background)."');}); });"; }
echo "\n</script>";
if (isset($_GET['wrn']))
{
    echo "<div id='urlwarning' style='font-weight: bold;'>Unable to get application information. Please start again.</div>";
}
?>
<div id="fb-root"></div>
<fb:login-button scope="email, user_photos, manage_pages, read_stream" onlogin="checkLoginState();"></fb:login-button>
<div id="status"></div>
<br /> 
<div id="mobiconfWrap" ng-app='myApp'>
<div  id="mainContainer">
<h3 ng-controller="TextController">{{someText.message}}</h3>
<select name='selectDevice' id="selectDevice" onChange='changeDevice()'>
    <option value="1">iPhone</option>
    <option value="2">Android</option>
</select>

<div id="divAndroid" class="mobiledev" style="display: none;"  ng-controller="androidController">
    <div id="divAndroidContent"></div><div id="divAndroidContentOverlay"></div><div id="androidPreviewTitle" ng-bind="youCheckedIt.x"></div>
    <img src="<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/S3-Template.jpg";?>" alt="iPhone"/>
    <div style='float: right;'><b>Enter Title:</b> <input type="text" ng-model="youCheckedIt.x" ></div>
</div>
<div id="diviPhone" class="mobiledev" ng-controller="iPhoneController">
    <div id="diviPhoneContent"></div><div id="diviPhoneContentOverlay"></div><div id="iPhonePreviewTitle" ng-bind="youCheckedIt2.x"></div>
    <img src="<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/iPhone-5.jpg";?>" alt="iPhone"/>
    <div style='float: right;'><b>Enter Title:</b> <input type="text" ng-model="youCheckedIt2.x"></div>
</div>
<div id="chooseAppType" ng-controller="mobileCustomizer_1">

    <ul id='setUpBack'>
<li ng-repeat='student in students' ng-click='chooseAppType(student.layer_id)' id='{{student.layer_id}}'>
{{student.name}}
</li>
    </ul>
    <div style='clear: both'></div>
    <br /><div id='ownImage' style='display: none; text-decoration: underline;'></div>
    <div style='padding: 5px; padding-top: 20px; margin: 20px; margin-top: 0px;'>Upload your loading screen: <form id='myForm' action='index.php?option=com_mobiconf&task=uploadImage' method='post' enctype="multipart/form-data"><input type='file' id='fileuploader' name='upload_file' />
            <input type="hidden" value='<?php echo md5("dsd".date('Ymd', time())."sdsd");?>' name='imageToken' >
            <input type='submit' value='Submit' /></form>
    
    <div id="progress" style='display: none;'>
        <div id="bar" style='width: 100px; margin-top: 2px; background: #0a0; height: 10px;'></div>
        <div id="percent">0%</div >
</div>
        <div id='message'></div>
 
 
<br/>
    </div>
</div>

</div>
<div class="errorMsg"></div>
<div ng-controller="submitPhoneData">
<div id="right_search">
   
    <form class="form2" method="get" ng-submit='submitData()'>
    <div class="inputContaner">
       <input type="hidden" id="userToken" value='<?php echo md5("dsd".date('Ymd', time())."sdsd");?>' />
       <input type="hidden" id="userid" value="<?php echo $this->userid;?>" />
       <input type="hidden" id="fbuserid" value="" />
       <input type="hidden" id='projectid' value="<?php echo $this->projectid;?>" />
     <div style="margin-top: 5px;"><input type="Submit" value="Next" /></div></div>

    </form>  <ul>
                    <li class="err" ng-repeat="error in errors"> {{ error}} </li>
                </ul>
                <ul>
                    <li class="info" ng-repeat="msg in msgs"> {{ msg}} </li>
                </ul> 
</div></div>
</div>
<script>
    function preload(arrayOfImages) {
    jQuery(arrayOfImages).each(function(){
        jQuery('<img/>')[0].src = this;
         
    });
}

// Usage:

preload([
    '<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/blog.png";?>',
     '<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/business.png";?>',
      '<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/education.png";?>',
      '<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/events.png";?>',
      '<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/music.png";?>',
      '<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/other.png";?>',
      '<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/photography.png";?>',
      '<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/restaurants.png";?>',
   
]);
    </script>
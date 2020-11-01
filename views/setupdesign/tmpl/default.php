<?php
//https://graph.facebook.com/search?callback=jQuery18208797525019607002_1399972821956&access_token=511450802262127|MnhPJPe0yb2HyKvfGimL6MsYZd8&q=gala&type=page&featureClass=P&style=full&fields=likes%2Cname%2Ccategory%2Cpicture%2Cis_community_page&className=facebookItem&selectAction=facebook&limit=30&_=1399975552643

//https://gdata.youtube.com/feeds/api/videos?q=googledevelopers&max-re‌​sults=5&v=2&alt=jsonc&orderby=published
if (!is_numeric($this->projectid) || $this->projectid == 0)
{
    echo "<script>alert($this->projectid); window.location.href= mobifURL+'?option=com_mobiconf&wrn=1';</script>";
}
if ($this->storeData)
{
    $background = $this->storeData->background;
    $title = $this->storeData->title;
    echo "<script>\nuseStoredData('".addslashes($title)."', '".addslashes($background)."');\n";
}
else
{   echo "<script>\nuseStoredData('', '')"; } //we must use this because localstorage stores things even when the page is reloaded
echo "\n</script>";
$step1 = (isset($_GET['id'])) ? "&id=".$_GET['id'] : '';
//WARNING: do not change the ID of the invisible layer below. This is used by Angular to get stored links
echo "<div id='serialinks' style='display: none;'>".json_encode(unserialize($this->storeDat_2->links))."</div>";
?>
<div id="fb-root"></div>
<fb:login-button scope="email, user_photos, manage_pages, read_stream" onlogin="checkLoginState();"></fb:login-button>
<div id="status"></div><br />
<div class="extraLinksHidden"></div><?php /* this is used to store data*/ ?>
<div id="mobiconfWrap" ng-app='myApp'>
    

<div id="mainContainer">
    <a href='index.php?option=com_mobiconf<?php echo $step1; ?>' style='color: #000; text-decoration: underline; font-size: 14px;'>Go Back to Step 1</a>
    
    <br /><br />
Choose Platform: <select name='selectDevice' id="selectDevice" onChange='changeDevice()'>
    <option value="1">iPhone</option>
    <option value="2">Android</option>
</select><p><b>Select a Facebook Page:</b> <select id="facebookPages" onChange='FBOptions.selectPage()'></select></p>

<div id="subContainer" style="position: relative">
<div id="divAndroid" class="mobiledev" style="display: none;"  ng-controller="androidController">
    <div id="divAndroidContModf">
        <div id='androidOutContent'></div>
<div id="androidBottom">
    <div ng-repeat='menu in menus track by $index'>
         <br ng-if="menu.id > 5" /> 
             <img class='androidMenu' id='androidMenu{{menu.id}}' ng-Click='changeScreen(menu, $event)' data-myURL="{{menu.url}}" src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/"?>{{menu.image}}" /> 
    </div>    
            
        </div>
     
        
    </div>
    <div id="androidPreviewTitle" ng-bind="youCheckedIt.x"></div>
    
    <img src="<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/S3-Template.jpg";?>" alt="iPhone"/>
    
    <div style='float: right; padding: 10px; background: #eee;'><b>Enter Title:</b> <input type="text" ng-model="youCheckedIt.x" ></div>
</div>
<div id="diviPhone" class="mobiledev" ng-controller="iPhoneController">
    
    <div id="diviPhoneContModf"> 
        
        <div id='iPhoneOutContent'></div>
<div id="iPhoneBottom">
    <div ng-repeat='menu in menus track by $index'>
        <br ng-if="menu.id > 5" /> 
     <img class='androidMenu' id='androidMenu{{menu.id}}' ng-Click='changeScreen(menu, $event)' data-myURL="{{menu.url}}" src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/"?>{{menu.image}}" /> 
    
    </div>
</div>
        
        
        
    </div>
    
    <div id="iPhonePreviewTitle" ng-bind="youCheckedIt2.x"></div>
   
    <img src="<?php echo JURI::base(true). "/components/com_mobiconf". DS . "images/iPhone-5.jpg";?>" alt="iPhone"/>
    
    <div style='float: right; padding: 10px; background: #eee;'><b>Enter Title:</b> <input type="text" ng-model="youCheckedIt2.x"></div>
</div>

<div id="customizeTabs">
    <div class='custTab' onClick='slideDownScheme("#customizeApp")'>Application Features</div>
    <div class='custTab' onClick='slideDownScheme("#customizeLook")'>Customize Looks</div>
</div>
<div id="customizeApp" class='custoAppl' ng-controller="mobileCustomizer_2">

    <ul id='setUpBack_2'> 
<li ng-repeat='student in layers' ng-if="student.id != 5" on-last-repeat ng-click='chooseAppType(student.id)' id='bigmenu_{{student.id}}' style="color: #fff; background: {{student.background}};">
{{student.name}}</li>
</ul><br />
<div id="iconChooser"><br /><br /><form>
        <h2 class="addanicon">Add an Icon:</h2><img style='float: left; margin-right: 5px; height:100px; background: #ddd; border: 1px solid #999;' src='<?php echo JURI::base(). "components/com_mobiconf". DS . "images/{{newMenu.image}}";?>' />
            <p><label>Tab Name: </label><input type="text" name="tab_name" ng-model="newMenu.name" /></p>
            <p><label>URL: </label><input type="text" name="tab_url" ng-model="newMenu.url" style='width: 300px;' /><span id='urlwarning'></span></p>
            <div style="display: none;">  <p><label>Image: </label><input type="text" name="tab_image" id="tab_image" ng-model="newMenu.image" /></p></div>
             <input type="button" value="Save"  ng-click="saveMenu()" />
             <input type="button" value="delete"  ng-click="deleteMenu()" />
        </form><br />
        
       
        
        <div id="iconsList">
         <img class='iconls' ng-repeat='icon in icons' src="<?php echo JURI::base(). "components/com_mobiconf". DS . "images/{{icon.image}}";?>" ng-click='changeIcon(icon.image)' /> 
     
            
        </div>
       
    </div>
  <div style='clear: both'></div>
    <br /><div id='ownImage' style='display: none; text-decoration: underline;'></div>
    <div style='padding: 5px; padding-top: 20px; margin: 20px; margin-top: 0px;'><b>Upload your own icon:</b> <form id='myForm_2' action='index.php?option=com_mobiconf&task=uploadImage' method='post' enctype="multipart/form-data"><input type='file' id='fileuploader' name='upload_file' />
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

<div id="customizeLook" class='custoAppl' ng-controller='customizeLook'>
     <div ng-repeat='palt in palettes' class='gradientFrame' ng-Click='changePalette(palt.name)'><div class='colorGradient' id='{{palt.name}}'></div>{{palt.name | capitalizeNoUnder }}</div>
</div>
 
 

<div ng-controller="submitPhoneData">
<div  id="next2">
   
    <form class="form2" method="get" ng-submit='submitData_2()'>
    <div class="inputContaner">
       <input type="hidden" id="userToken" value='<?php echo md5("dsd".date('Ymd', time())."sdsd");?>' />
       <input type="hidden" id="userid" value="<?php echo $this->userid;?>" />
       <input type="hidden" id="fbuserid" value="" />
       <input type="hidden" id="theme" value="" />
       <input type="hidden" id="facebook-feed" value="" />
       <input type="hidden" id="facebook-albums" value="" />
       <input type="hidden" id="theme" value="" />
       <input type="hidden" id='projectid' value="<?php echo $this->projectid;?>" />
       <p>Make sure your settings are fine before you proceed.</p>
     <div><input type="Submit" value="Next" /></div></div>
 
    </form>  <ul>
                    <li class="err" ng-repeat="error in errors"> {{ error}} </li>
                </ul>
                <ul>
                    <li class="info" ng-repeat="msg in msgs"> {{ msg}} </li>
                </ul> 
</div></div><div style="clear: both;"></div>
</div>
<div class="errorMsg"></div>
 

</div>
</div>
<script>
    
    jQuery( document ).ready(function() {  
slideDownScheme("#customizeApp");
});
    </script>
 
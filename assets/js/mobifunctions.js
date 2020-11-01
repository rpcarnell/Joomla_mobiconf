//   remove resaults list on mouse leave
function besend()
{
    jQuery("#progress").show();
        //clear everything
        jQuery("#bar").width('0%');
        jQuery("#message").html("");
        jQuery("#percent").html("0%");
}
function uploadPro()
{
    jQuery("#bar").width(percentComplete+'%');
    jQuery("#percent").html(percentComplete+'%');
}
function suc()
{
    jQuery("#bar").width('100%');
        jQuery("#percent").html('100%');
}

 $(function() {
      var options = {
    beforeSend: function() { besend(); },
    uploadProgress: function(event, position, total, percentComplete) { uploadPro(); },
    success: function() { suc(); },
    complete: function(response)
    { //alert(response.responseText);
        if(response.responseText == 0)
        {
            jQuery("#message").html("<font style='color: #a00;'>There has been an error. Please try again!</font>");
            return;
        }
        data = JSON.parse(response.responseText);
        var imageURL = mobiconfURL + data.dir + "/" + data.filename;
        jQuery('#ownImage').show().html('Use My Own Image').click(function(){ownBackground(imageURL);});
       // <div data-ownImage='' id='ownImage' style='display: none;'></div>
        var windowWidth = '100%';
        var windowHeight = '100%';
        jQuery('#fileuploader').val('');
        jQuery('#diviPhoneContentOverlay').css({'background-image' : 'url(' + imageURL + ')', backgroundSize : windowWidth + ' ' + windowHeight});
        jQuery('#divAndroidContentOverlay').css({'background-image' : 'url(' + imageURL + ')', backgroundSize : windowWidth + ' ' + windowHeight});
        jQuery("#message").html("<font style='color: #0a0;'>File has been successfully uploaded</font>");
    },
    error: function()
    {
       jQuery("#message").html("<font color='red'> ERROR: unable to upload files</font>");
 
    }
 
};

 
     jQuery("#myForm").ajaxForm(options);
     
    jQuery("#right_search .form2 .inputContaner").mouseleave(function (e) {
        jQuery("#right_search .form2 .inputContaner ul.resultsList").hide("slide", { direction: 'up' }, 500);
    });

    jQuery('#right_search .form2 input[type="text"].faceBookInput').keyup(function () {
        _appUrl = jQuery(this).val();
        isFaceBookOrUrl(jQuery(this).val());
        ErrorFunc.closeErorrs();


    });
    var thisExtra = [];
    jQuery('div.extraLinksHidden').data("foo", thisExtra);
    
    
    
});
function useStoredData(title, background)
{
    localStorage.setItem("backstored", background);
    localStorage.setItem("backtitle", title);
}
function getStoredData()
{
    var backg = localStorage.getItem("backstored");
    var title = localStorage.getItem("backtitle");
    
    if (typeof backg == 'string' && backg != '') { ownBackground(backg); }
    if (typeof title == 'string' && title != '') { return title; }
    else return false;
}
function submitAppTitle()
{
   // alert( jQuery('#enterTitle').html() );
    return true;
}
function slideDownScheme(divSlide)
{
    jQuery('.custoAppl').slideUp('fast');
    jQuery(divSlide).slideDown();
}
function ownBackground(imageURL)
{
        var windowWidth = '100%';
        var windowHeight = '100%';
        jQuery('#diviPhoneContentOverlay').css({'background-image' : 'url(' + imageURL + ')', backgroundSize : windowWidth + ' ' + windowHeight});
        jQuery('#divAndroidContentOverlay').css({'background-image' : 'url(' + imageURL + ')', backgroundSize : windowWidth + ' ' + windowHeight});
        
}
function isFaceBookOrUrl(searchString) {
    var UrlRegExp = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;;
    var FBRegExp = "facebook";
    // Check string for URL format
    if (new RegExp(UrlRegExp).test(searchString)) {
        // Check string for FaceBook format
        if (new RegExp(FBRegExp).test(searchString)) {
            //  console.log("facebook inside");
            searchFacebookUrl(searchString, "fbUrl");
            _urlType = "1";
        }
            // Return URL
        else {
        //    console.log("URL inside");
          //  urlSearch(searchString);
            _urlType = "0";
        }
    }
    else {
        // console.log("FaceBook Name");
        searchFacebookUrl(searchString, "fbName");
        _urlType = "1";
    }
    //  console.log(searchString);
}
function searchFacebookUrl(fbSearchTerm, qType) {
    if (fbSearchTerm === "" || fbSearchTerm === null) {
        $("#right_search .form2 .inputContaner ul.resultsList").css("display", "none");
    }
   // var fbtoken = "511450802262127|MnhPJPe0yb2HyKvfGimL6MsYZd8";
   // alert(fbtoken);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    // facebook URL
    if (qType === "fbUrl") {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: 'https://graph.facebook.com',
            data: {
                access_token: fbtoken,
                ids: fbSearchTerm // search term
            },
            success: function (data) {
               // console.log(JSON.stringify(data));
                
                fbReaults(data, qType);
               

                
            }
        });
    }
        // facebook Name  
    else if (qType === "fbName") {
        jQuery.ajax({
            type: "GET",
            dataType: "jsonp",
            url: 'https://graph.facebook.com/search',
            data: {
                access_token: fbtoken,
                q: fbSearchTerm, // search term
                type: "page",
                featureClass: "P",
                style: "full",
                fields: "likes,name,category,picture,is_community_page",
                className: "facebookItem",
                selectAction: "facebook",
                limit: 30 // limits number of result per page 
            },
            success: function (data) {
                fbReaults(data, qType);
            }
        });
    }
    else {
        // Site URL
    }
}
function fbReaults(data, type) {
    if (type === "fbName") {
        jQuery(".inputContaner ul.resultsList").html('');
        jQuery.each(data.data, function (index, item) {
            var likesText = item.likes + " liked this";
            jQuery(".inputContaner ul.resultsList").append(jQuery('<li fbid="' + item.id + '"  name="' + item.name + '"></li>').append(jQuery('<a class="fbresPage"></a>').attr('id', item.id).html(item.name + "<br/><span>" + item.category + " " + likesText + "</span>")).prepend(jQuery('<img/>').attr('src', item.picture.data.url)));
            
            jQuery("#right_search .form2 .inputContaner ul.resultsList").css("display", "block");

            // select the FB page
            jQuery("#right_search .form2 .inputContaner ul.resultsList li").click(function () { //alert($(this).attr('name'));
                jQuery('#right_search .form2 input[type="text"]').val(jQuery(this).attr('name'));//provide the input box with the name
                _appUrl = jQuery(this).attr('fbid');
                jQuery('#arid').val(_appUrl);
                
                jQuery("#right_search .form2 .inputContaner ul.resultsList").hide("slide", { direction: 'up' }, 500);
              
                ErrorFunc.closeErorrs();
				jQuery('.faceBookInput').focus();
            })
        });
		
    } else if (type === "fbUrl") {
        jQuery.each(data, function (index, item) {
            jQuery(".inputContaner ul.resultsList").html('');
            var likesText = item.likes + " liked this";
            jQuery(".inputContaner ul.resultsList").append(jQuery('<li  fbid="' + item.id + '"  name="' + item.name + '"></li>').append(jQuery('<a class="fbresPage"></a>').attr('id', item.id).html(item.name + "<br/><span>" + item.category + " " + likesText + "</span>")).prepend($('<img/>').attr('src', 'http://graph.facebook.com/' + item.id + '/picture')));
            _appUrl = item.id;
            jQuery("#right_search .form2 .inputContaner ul.resultsList").css("display", "block");
            // select the FB page
            jQuery("#right_search .form2 .inputContaner ul.resultsList li").click(function () {
                jQuery('#right_search .form2 input[type="text"]').val(jQuery(this).attr('name'));//provide the input box with the name
                _appUrl = $(this).attr('fbid');
                
                jQuery('#arid').val(_appUrl);
                
                jQuery("#right_search .form2 .inputContaner ul.resultsList").hide("slide", { direction: 'up' }, 500);
                ErrorFunc.closeErorrs();
				jQuery('.faceBookInput').focus();
            })
          //  //}                                               *** remove comment to filter community_page
        });
    }
}
function changeDevice()
{
    var devChosen = jQuery('#selectDevice option:selected').val();
    jQuery('.mobiledev').fadeOut();
    if(devChosen == 2)
    { jQuery('#divAndroid').fadeIn(); } 
    else jQuery('#diviPhone').fadeIn();
}

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}


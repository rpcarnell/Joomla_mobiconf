 
var webParser =
{
    youTube: function() {},
    twitter: function(webURL)
    {
         // jQuery('head').prepend('<link rel="stylesheet" href="'+mobifURL+'components/com_mobiconf/css/twitter.css" type="text/css" />');
            //alert(webURL);     
               jQuery.ajax({
            type: "POST",
            
             url: mobifURL + "?option=com_mobiconf&task=twitter",
            data: { theurl: webURL },
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
    extraLinks: function()
    {
       var htmlvid = ""; 
       var iPhoneHeight = jQuery.data( document.body, "iPhoneHeight");
       var extraLinks = jQuery('div.extraLinksHidden').data("foo");
       for (ext in extraLinks)
       {
           if (isNaN(extraLinks[ext].id)) continue;
           htmlvid += "<img style='height: 60px;' src='" + mobiconfURL + extraLinks[ext].image + "' /><br />";
       }
       var androidHeight = jQuery.data( document.body, "androidHeight");
       jQuery('#iPhoneOutContent').css({'height' : iPhoneHeight + 'px'});
       jQuery('#androidOutContent').css({'height' : androidHeight + 'px'});
       jQuery('#iPhoneOutContent').html(htmlvid);
       jQuery('#androidOutContent').html(htmlvid);
    }
        
}
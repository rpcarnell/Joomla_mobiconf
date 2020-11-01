
var currentPage = 1;
var wasSegmentSelected = false;
var appName = "";
var FbPageName = "";
var _appUrl = "";
var _sgtId = "2";
var _urlType = "1";

var _discoverTimeOut = '15000';
var _discoverConTimeOut = '5000';



var isCpRed = "";

// ***************Ui***************
var index = 0;
// the sel
var Sindex = 0;
//$(".nav li").click(function () {
//    // `this` is the DOM element that was clicked
//    clickBuisness();
//    var index = $("li").index(this);
//    // the selcted tab index
//    var Sindex = $("li.selected").index();

//    if (index === Sindex) {
//        //do nothing
//        //  event.preventDefault();
//    }
//    else if (index > Sindex) {
//        slideForm(Sindex, index, "left", "right");

//    }
//    else {
//        slideForm(Sindex, index, "right", "left");

//    }
//    $(".nav li").removeClass("selected");
//    $(this).addClass("selected");
//});
//// Forms sliding direction
//function slideForm(formTHide, formTShow, formTHideD, formTShowD) {

//    $('#left .form' + formTHide).hide("slide", { direction: formTHideD }, 1000, function () { $(this).removeClass('selected') });
//    $('#left .form' + formTShow).show("slide", { direction: formTShowD }, 1000).addClass('selected');

//}

$(".nav li").click(function () {
    var index = $("li").index(this);
    $(".nav li").removeClass("selected");
    $(this).addClass("selected");
	
$(".nav li .borderTriangle").css('opacity', '0');
$(".nav li .triangle").css('opacity', '0');

	
    if (!($(this).prev(".nav li").hasClass('done'))){
        $(this).prev(".nav li").addClass('done');
        $(this).prev(".nav li").children('span').html('&#10004;');
    }

    switch (index)
    {
        case 0:
            $('.formsSlider').animate({ "left": "0px" }, 1000, "linear", function () {
 
				$('.form0 .defaultText').focus();
				$( ".nav li:nth-child(1) .borderTriangle").css('opacity', '1');
				$( ".nav li:nth-child(1) .triangle").css('opacity', '1');
			restartFB();
            });
            break;
        case 1:
		clickBuisness();
            $('.formsSlider').animate({ "left": "-627px" }, 1000, "linear", function () {
             
			   $('#left .form1 ul .selectedLi').focus();
				$( ".nav li:nth-child(2) .borderTriangle").css('opacity', '1');
				$( ".nav li:nth-child(2) .triangle").css('opacity', '1');
            restartFB();
			});
			
            break;
        case 2:
            $('.formsSlider').animate({ "left": "-1250px" }, 1000, "linear", function () {
                $('#left .form2 input[type="text"].faceBookInput').focus();
					$( ".nav li:nth-child(3) .borderTriangle").css('opacity', '1');
				$( ".nav li:nth-child(3) .triangle").css('opacity', '1');
            });
            break;
    }
    $("#headerSecond > div.appTitleHead").css('display', 'none');
    $("#headerSecond > div.appNameHead").css('display', 'block');
    $("#underStrip").css({'border-bottom':'1px solid #B9B9B9','height': '40px'});
    $("#content_wrapper").css({ 'border-top': '1px solid #FFFFFF', 'padding-top': '19px' });
    if (appName != "") {
        $(".AppNameTitle").html(appName);
    }

});



// Next click
$("input[value='Next']").click(function () {
    //var parent = ($(this).parent('div.form').index());
    //navLiDoneMode();
    $(".nav li.selected").next().trigger("click");
})
function navLiDoneMode() {
    $(".nav li.selected span").css('background-color', '#80BC11');
    $(".nav li.selected").addClass("clickable");
}

// Back click
$(".back").click(function () {
    var parent = ($(this).parent('div.form').index());
    $(".nav li.selected").prev().trigger("click");
})
//enter Press
$(document).keypress(function (e) {
    if (e.which == 13) {
        $(".form.selected input[value='Next']").trigger("click");
    }
});
$(document).keydown(function (objEvent) {
    if (objEvent.keyCode == 9) {  //tab pressed
        objEvent.preventDefault(); // stops its action
    }
});
// double click segments
$("#left .form1 ul li").dblclick(function () {
    $("#left .form1 input[type='button']").click();
});
// arrows navigation
$("#left .form1 ul").keydown(function (e) {
    if (e.which == 37) { // left  
        if (!$('#left .form1 ul li.selectedLi').hasClass('Blog')) {
            $('#left .form1 ul li.selectedLi').prev('#left .form1 ul li').click();
        }
        else {
            $('#left .form1 ul li.selectedLi').prev('#left .form1 ul li').prev('#left .form1 ul li').click();
        }
    }
    else if (e.which == 39) { // right     
        if (!$('#left .form1 ul li.selectedLi').hasClass('Restaurants')) {
            $('#left .form1 ul li.selectedLi').next('#left .form1 ul li').click();
        }
        else {
            $('#left .form1 ul li.selectedLi').next('#left .form1 ul li').next('#left .form1 ul li').click();
        }

    }

    else if (e.which == 40) {// down
        $('#left .form1 ul li.selectedLi').next('#left .form1 ul li').next('#left .form1 ul li').next('#left .form1 ul li').next('#left .form1 ul li').next('#left .form1 ul li').click();

    }
    else if (e.which == 38) {// up
        $('#left .form1 ul li.selectedLi').prev('#left .form1 ul li').prev('#left .form1 ul li').prev('#left .form1 ul li').prev('#left .form1 ul li').prev('#left .form1 ul li').click();
    }

});

// Segments selection
$("#left .form1 ul li").click(function () {
    if (!$(this).hasClass('music')) {
        var bgImages = {
            "2": ["BG2.png", "DefaultIcon2.png", "PageBackgroundSmb.png"],
            "3": ["BG3.png", "DefaultIcon3.png", "PageBackgroundMusic.png"],
            "6": ["BG6.png", "DefaultIcon6.png", "PageBackgroundEvents.png"],
            "11": ["BG11.png", "DefaultIcon11.png", "PageBackground11.png"],
            "4": ["BG4.png", "DefaultIcon4.png", "PageBackgroundBlog.png"],
            "5": ["BG5.png", "DefaultIcon5.png", "PageBackgroundEducation.png"],
            "10": ["BG10.png", "DefaultIcon10.png", "PageBackgroundPhoto.png"],
            "1": ["BG1.png", "DefaultIcon1.png"]
        }

        var segmentId = $(this).attr("seg");

        $("#RightSide .PhoneContent").css('background-image', 'url(' + urls.images + bgImages[segmentId][0] + ')');
        $("#RightSide .phoneIcon").css('background-image', 'url(' + urls.images + bgImages[segmentId][1] + ')');
        if (bgImages[segmentId][2]) {
            $("body").css('background-image', 'url(' + urls.images + bgImages[segmentId][2] + ')');
        }
        else {
            $("body").css('background-image', 'none');
        }
        $("#RightSide .letsStartBuilding").animate({ top: "24px" }, 300);
        //  alert(!$(this).hasClass("selected"));
        if (!$(this).hasClass("selectedLi")) {
            $("#left .form1 ul li").removeClass("selectedLi");
            $(this).addClass("selectedLi");
        }

       // if ($(this).hasClass("Music")) {
       //     $(".music").slideToggle();
       // }
       // else {
       //     $(".music").slideUp();
       // }
        if (!$(this).hasClass("music")) {
            _sgtId = $(this).attr('seg');
        }
    }
});
//   remove resaults list on mouse leave
$("#left .form2 .inputContaner").mouseleave(function (e) {
    $("#left .form2 .inputContaner ul.resultsList").hide("slide", { direction: 'up' }, 500);
});

$('#left .form2 input[type="text"].faceBookInput').keyup(function () {
    _appUrl = $(this).val();
    //if (appName === "" || appName === null) {
    //    _appUrl = "";
    //}
    //  alert($(this).val());
    isFaceBookOrUrl($(this).val());
    ErrorFunc.closeErorrs();
	
	
});
$('.faceBookInput').keydown(function(e) {
    if(e.which == 13) { // Checks for the enter key
       //alert('test');
	   $('.sendToDis').trigger('click');
	    e.preventDefault(); // Stops IE from triggering the button to be clicked
    }
});


$('#left .form2 input[type="text"].URlInput').keyup(function () {
   
    ErrorFunc.closeErorrs();
});

$('#left .form2 input[type="text"].URlInput').keydown(function(e) {
    if(e.which == 13) { // Checks for the enter key
       //alert('test');
	   $('.sendToDisUrl').trigger('click');
	    e.preventDefault(); // Stops IE from triggering the button to be clicked
    }
});




//app name value
$('#left .form0 input[type="text"]').keyup(function () {
    appName = $(this).val();
    $('#RightSide .AppNamePreviewTitle').html(appName);
});

// ***************Ui***************
// ***************FB/Url String***************
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
// ***************FB/Url String***************   
// 
// ***************FB Search*************** 
function searchFacebookUrl(fbSearchTerm, qType) {
    if (fbSearchTerm === "" || fbSearchTerm === null) {
        $("#left .form2 .inputContaner ul.resultsList").css("display", "none");
    }
    var fbtoken = "511450802262127|MnhPJPe0yb2HyKvfGimL6MsYZd8";
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
        $.ajax({
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
        $(".inputContaner ul.resultsList").html('');
        $.each(data.data, function (index, item) {
            var likesText = item.likes + " liked this";
            $(".inputContaner ul.resultsList").append($('<li  fbid="' + item.id + '"  name="' + item.name + '"></li>').append($('<a class="fBPage"></a>').attr('id', item.id).html(item.name + "<br/><span>" + item.category + " " + likesText + "</span>")).prepend($('<img/>').attr('src', item.picture.data.url)));
            
            $("#left .form2 .inputContaner ul.resultsList").css("display", "block");

            // select the FB page
            $("#left .form2 .inputContaner ul.resultsList li").click(function () {
                $('#left .form2 input[type="text"]').val($(this).attr('name'));
                _appUrl = $(this).attr('fbid');
                $("#left .form2 .inputContaner ul.resultsList").hide("slide", { direction: 'up' }, 500);
                ErrorFunc.closeErorrs();
				$('.faceBookInput').focus();
            })
        });
		
    } else if (type === "fbUrl") {
        $.each(data, function (index, item) {
            $(".inputContaner ul.resultsList").html('');
            var likesText = item.likes + " liked this";
          //  //if (item.is_community_page) {                  *** remove comment to filter community_page
          //  //    console.log(item.is_community_page);       *** remove comment to filter community_page
          //  //}                                              *** remove comment to filter community_page
          //  //else {                                         *** remove comment to filter community_page
            $(".inputContaner ul.resultsList").append($('<li  fbid="' + item.id + '"  name="' + item.name + '"></li>').append($('<a class="fBPage"></a>').attr('id', item.id).html(item.name + "<br/><span>" + item.category + " " + likesText + "</span>")).prepend($('<img/>').attr('src', 'http://graph.facebook.com/' + item.id + '/picture')));
            _appUrl = item.id;
            $("#left .form2 .inputContaner ul.resultsList").css("display", "block");
            // select the FB page
            $("#left .form2 .inputContaner ul.resultsList li").click(function () {
                $('#left .form2 input[type="text"]').val($(this).attr('name'));
                _appUrl = $(this).attr('fbid');
                $("#left .form2 .inputContaner ul.resultsList").hide("slide", { direction: 'up' }, 500);
                ErrorFunc.closeErorrs();
				$('.faceBookInput').focus();
            })
          //  //}                                               *** remove comment to filter community_page
        });
    }
}

// error massages
$("[action=close]").click(function () {
    ErrorFunc.closeErorrs();
});

var ErrorFunc = {
    closeErorrs: function () {
        $(".errorMsg").css("display", "none");
    },
    closeFunction: function () {
        $(this).parent().css("display", "none");
    },
    openError: function (errorBox) {
        $(errorBox).css("display", "block");
    }
};



//first next button
$('#left .form0 input[type="button"]').click(function () {
clickBuisness();
});

// when page is moved if buisness was not changed will triger animation for the first time
function clickBuisness() {
    if ($('#left .form1 ul li.Bussiness').hasClass("selectedLi")) {
       $('#left .form1 ul li.Bussiness').click();
    }
}

//No Facebook back facebook click
$('.noFacebookOrBack').click(function () {
    if ($(".submitionFB").hasClass("hidden")) {
        $(".submitionURL").hide("slide", { direction: "up" }, 1000).addClass("hidden");
        $(".submitionFB").show("slide", { direction: "down" }, 1000).removeClass("hidden");
    }
    else {
        $(".submitionFB").hide("slide", { direction: "up" }, 1000).addClass("hidden");
        $(".submitionURL").show("slide", { direction: "down" }, 1000).removeClass("hidden");
    }
    $('.faceBookInput').val("");
    $('.URlInput').val("");
    _appUrl = "";
    ErrorFunc.closeErorrs();
});

function restartFB() {

    if ($(".submitionFB").hasClass("hidden")) {
        $(".submitionURL").hide().addClass("hidden");
        $(".submitionFB").show().removeClass("hidden");
    }
   
    $('.faceBookInput').val("");
    $('.URlInput').val("");
    _appUrl = "";
    ErrorFunc.closeErorrs();
	return false;
}



// send to discovery
$('.sendToDis').click(function () {
	

	
    if ($('.faceBookInput').val() == "" || $('.faceBookInput').val() == null) {
     //   console.log("empty");
        ErrorFunc.openError('.emptyFaceBook');
        return false;
    }
    else if (_appUrl == "" || _appUrl == null) {
      //  console.log("empty");
        ErrorFunc.openError('.FaceBookChoose');
        return false;
    }
	
	
	else if($('.faceBookInput').val() != "" && _urlType == "0"){
	//	return true;
	_appUrl = $('.faceBookInput').val();
		 sendDiscoveryData();
		}
	
	
	
     sendDiscoveryData();
});
function ValidateURL(s) {
    var regexp = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;;

    return regexp.test(s);
}


$('.sendToDisUrl').click(function () {
  
    var urlExp = $('.URlInput').val();
    if (urlExp == "" || urlExp == null) {
        
        ErrorFunc.openError('.emptyUrl');
        return false;
    }
    else if (!ValidateURL(urlExp)) {
        ErrorFunc.openError('.notUrl');
        return false;
    }
	 _appUrl = $('.URlInput').val();
	 _urlType = 0;
 console.log(_appUrl);
 console.log(_sgtId);
 console.log(_urlType);
 

  sendDiscoveryData();
    
});



function sendDiscoveryData() {
    $('.phoneIcon').fadeOut();

    var Ftitle = $("<div class='submitDisable'><h1>We're grabbing your content.</h1><h2>Your app will be ready in a few seconds!</h2></div>").append();
	// ziv url
	
    $('.phoneIcon').fadeOut();
   $('#urlType').val(_urlType);
   $('#pageUrl').attr('value', _appUrl);
    $('#segId').attr('value', _sgtId);
    $('.form2').html(Ftitle);
    $('.letsStartBuilding').animate({ top: "24px" }, 300);
	$('.discoveryLoader').css('display','block');
   submitTheForm();
}




$('.noWebsiteLink').click(function () {
// var Ftitle = $("<div class='submitDisable'><h1>We're creating a new app for you.</h1><h2>Just a few seconds until you can start customizing it.</h2></div>").append();
// $('.form2').html(Ftitle);       
	   window.location.href = wizardUrl + _sgtId;



})

// ***************FB Search*************** 
$(document).ready(function () {
    $('.form0 .defaultText').focus();

  $('.submitionURL').addClass('hidden');

});


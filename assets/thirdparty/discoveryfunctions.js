/// <reference path="Constants.js" />

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return unescape(pair[1]);
        }
    }
};

var activeTransport = getUrlQueryStrings()['transport'] || 'auto';

function submitTheForm() {
    var connectionManager = $.connection.connectionManager,
    groupAddedCalled = false;
    var isCompletedFlag = false;
    discoveryTimer = ""; //setTimeout("DiscoveryCompleted();", _discoverConTimeOut);
    $.connection.hub.url = _serviceUrl;  //'http://localhost:1861/signalr';

    connectionManager.client.recieveFromServer = function (sessionId, data, completionTime, isComplete) {
        _.each(JSON.parse(data.Result),
                    function () {
                        if (isComplete) {
                            completeTime = new Date(completionTime);
                            if (!isCompletedFlag) {
                                resultData = JSON.parse(data.Result);
                                connectionManager.connection.stop();
                                DiscoveryCompleted();
                                isCompletedFlag = true;
                            }
                        }
                        else {
                            resultData = JSON.parse(data.Result);
                            showData(resultData);
                        }
                    });
    };

    $.connection.hub.error = function (error) {
        DiscoveryCompleted();
    };

    $.connection.hub.start({ transport: activeTransport }).then(function () {
        //pl to handle what happens after connection gets initiated!
        clearTimeout(discoveryTimer);
        discoveryTimer = ""; 
		setTimeout("DiscoveryCompleted();", _discoverTimeOut);

        if (typeof _ssKey != 'undefined' && typeof _Cuid != 'undefined') {
            var DisResult = window.JSON.stringify({ DiscoveryStartTimestamp: startUnixTime, Segment: _sgtId, DiscoveryInputs: [{ Type: _urlType, InputParams: { Cuid: _Cuid, SsKey: _ssKey}}] });
        }
        else {
            var DisResult = window.JSON.stringify({ DiscoveryStartTimestamp: startUnixTime, Segment: _sgtId, DiscoveryInputs: [{ Type: _urlType, Value: _appUrl}] });
        }

        connectionManager.server.discover(DisResult);
    }).fail(function () {
        DiscoveryCompleted();
    });

    var segments = {
        0: "general",
        1: "general",
        2: "bussiness",
        3: "music",
        4: "blogs",
        5: "education",
        6: "events",
        7: "congregation",
        8: "sport",
        9: "community",
        10: "photos",
        11: "restaurants"
    };

    $('#discovery').addClass(segments[_sgtId]);

    //start();
}

var isSearchCompleted = false;
var discoveryTimer;
var resultData = null;
var foundData = [];
var startUnixTime = Math.round((new Date()).getTime() / 1000);
function getPageType(typeId) {
    var pt = pageTypes[typeId];
    for (var x in pt) {
        if (typeof pt[x] == 'object')
            return pt[x];
    }
}

function showData(data) {
    if (!data) return;
    var numberOfPages = data.pages.length;
    for (i = 0; i < numberOfPages; i++) {
        var typeId = data.pages[i].typeId;
        var pageType = getPageType(typeId);
        if ($('#myPages').find('.item[data-name="' + pageType.discoveryLabel + '"]').length < 1) {
            addItemToIphone(pageType);
        }
    }
}

function addItemToIphone(pageType) {
    if ($('#myPages').find('.item').length <= 12) {
        $('<div class="item ' + pageType.name + '" data-name="' + pageType.discoveryLabel + '"><div></div><span>' + pageType.title + '</span></div>').appendTo('#myPages');
        window.setTimeout(function () {
            $('#myPages').find('.item[data-name="' + pageType.discoveryLabel + '"]').addClass('show');
        }, 100);
    }
}

function DisplayData(data, arrNum) {
    /// <summary>Called when data is recieved from discovery service</summary>
    /// <param name="data" type="Object">data recieved from discovery service (properties depend on response type)</param>
    //get the appropriate feed container for the data returned
    if (!data) return;
    var found = data.count > 0;
    if (data.typeId == 'url' && data.url) {
        $('#pageUrl').val(data.url);
        return;
    }
    //merge items
    var items = foundData[arrNum];
    if (!items) {
        //******** Temporary default quality
        if (data.meta) {
            for (i = 0; i < data.meta.length; i++) {
                data.meta[i].quality = 0.8;
            }
        }
        //******** Temporary default quality

        items = foundData[arrNum] = data;
    }
    storeData();
}

function storeData() {
    /// <summary>Stores data recieved from discovery service in hidden field</summary>
    /// <param name="data" type="Object">data recieved from discovery service (properties depend on response type)</param>

    // patch: to support old classic asp.net pages (before MVC).
    var storageElement;
    storageElement = $('#discoveryData');
    //    var currentValue = '';
    //    for (var x in foundData) {
    //        if (typeof foundData[x] == 'function')
    //            continue;
    //        if (currentValue.length > 0)
    //            currentValue += "~~|~~";
    //        currentValue += JSON.stringify(foundData[x]);
    //    }
    var results = { results: foundData };
    storageElement.val(JSON.stringify(results));
}


function DiscoveryCompleted() {
    /// <summary>Called when discovery search is finished</summary>
    clearTimeout(discoveryTimer);
    isSearchCompleted = true;
    completeUnixTime = Math.round((new Date()).getTime() / 1000);

    if (resultData != null) {
        for (var i = 0; i < resultData.pages.length; i++) {
            var item = ({ typeId: resultData.pages[i].typeId, count: resultData.pages[i].count, meta: resultData.pages[i].meta, url: (resultData.pages[i].meta[0] != null) ? resultData.pages[i].meta[0].value.url : null, icons: (resultData.pages[i].icons != null) ? resultData.pages[i].icons : [] });
            DisplayData(item, i);
        }
        var iconResults = { results: resultData.icons };
        $('#discoveryIcons').val(JSON.stringify(iconResults));

        var nameResults = { results: resultData.names };
		
		// Marketing discovery if user filled app name overwrite discovery resaults	
	
	//	if (appName != null ||  $.trim(appName).length > 0){
	//		nameResults ={"results":[{"Quality":1,"Value":appName}]};
	//		}
			
        $('#discoveryNames').val(JSON.stringify(nameResults));
// ziv stoping the flow for testing
//return false;
// ziv stoping the flow for testing

        $('#completionTime').val(completeUnixTime - startUnixTime);

        $('#pagesNum').val(resultData.pages.length);
    }

    $('.discovery_proccess').hide();
    var completeMsgItem = $('.discovery_messages li').eq(4).find('span');
    completeMsgItem.html('Search completed. Opening Control Panel...');
    completeMsgItem.fadeIn('fast');

    //postback to server in order to save data to session and redirect to Wizard page
    window.setTimeout("redirect();", 1000);
}

function redirect() {
 $("#form1").get(0).setAttribute('action','http://mobilecp.como.com/pages/DiscoveryResult' + isCpRed);
 $("#form1").submit();
 //   $("#frmDiscover").submit();
}

function getUrlQueryStrings(url) {
    var vars = {}, hash;
    var hashes;
    if (url && url != null) {
        hashes = url.slice(window.location.href.indexOf('?') + 1).split('&');
    }
   else {
        hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    }
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}


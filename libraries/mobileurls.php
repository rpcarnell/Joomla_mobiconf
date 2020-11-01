<?php
/*
http://cms.mobile.conduit-services.com/photos/albums/facebook/rihanna/?callback=angular.callbacks._7
 * 
 */
function returnURL($url)
{
    //   $url = 'http://frxcvee.com';
    $ch = curl_init();
   // curl_setopt($ch, CURLOPT_URL, $url);
    //curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3B48b Safari/419.3');
     $headers = array();
        $header[0] = "Accept: text/xml,application/xml,application/xhtml+xml,";
	 $header[0] .= "text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5";
	$header[] = "Cache-Control: max-age=0";
	$header[] = "Connection: keep-alive";
	$header[] = "Keep-Alive: 300";
	$header[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
	$header[] = "Accept-Language: en-us,en;q=0.5";
	// $header[] = "Pragma: ";
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    // $ch = curl_init();
//curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_FAILONERROR, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_AUTOREFERER, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $lastUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    echo "Original: $url <br>Final: $lastUrl";
    exit; 
}
function twitterMobile($url)
{
    $ch = curl_init();
   // curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3B48b Safari/419.3');
      
	   
	   curl_setopt($ch, CURLOPT_URL, $url);
           curl_setopt($ch, CURLOPT_HEADER, 1);
	  curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
            $headers = array();
        $header[0] = "Accept: text/xml,application/xml,application/xhtml+xml,";
	 $header[0] .= "text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5";
	$header[] = "Cache-Control: max-age=0";
	$header[] = "Connection: keep-alive";
	$header[] = "Keep-Alive: 300";
	$header[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
	$header[] = "Accept-Language: en-us,en;q=0.5";
	 $header[] = "Pragma: ";
         header_remove(); 
         curl_setopt($ch, CURLOPT_HEADER, false);//header output eliminated
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
	  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	   if (!is_null($referer)) {
	   	curl_setopt($ch, CURLOPT_REFERER, $referer);	
	   }
	   
	   $data = @curl_exec($ch);
           echo $data;
	   	 exit;   
	   
}
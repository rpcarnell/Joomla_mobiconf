<?php
$userid = $_POST['userid'];
$datesnd = (int)$_POST['date2snd'];
$menu_id = $_POST['menu_id'];
$url = $_POST['url'];
if (!is_numeric($userid) || !is_numeric($menu_id)) { echo "ERROR - non-numeric data"; exit; }
$file = $userid."-".$datesnd.".jpg";
$changed = false;
session_start();

if (isset($_SESSION[$userid."-".$menu_id]))//if there's a session for this user and this index already?
{
    $decoded = json_decode($_SESSION[$userid."-".$menu_id]);
    if ($url == $decoded->url) { $file = $decoded->file; }//let's get a previous value
    else { //user changed the URL, so let's try something new:
        $encode  = array();
        $encode['url'] = $url;//let's change the values
        $encode['file'] = $file;
        $_SESSION[$userid."-".$menu_id] = json_encode($encode); 
        $changed = true;
    }
}
else 
    { 
        $encode  = array();
        $encode['url'] = $url;
        $encode['file'] = $file;
        $_SESSION[$userid."-".$menu_id] = json_encode($encode); 
    }//store the file in a session

$directory = "useruploads";
$saveToFile = "../images/$directory/$file";
if (is_file($saveToFile) && !$changed)
{
    $screenShot= array();
    $screenShot['url'] = "components/com_mobiconf/images/useruploads/$file";
    $screenShot['file'] = $file;
    $screenShot['directory'] = $directory;
    $screenShot['storefile'] = 0;
    echo json_encode($screenShot);
    exit;
} else $file = $userid."-".$datesnd.".jpg";//let's go back to the old value
include("lib/GrabzItClient.class.php");
include("config.php");
$grabzIt = new GrabzItClient($grabzItApplicationKey, $grabzItApplicationSecret);
$grabzIt->SavePicture($url, $saveToFile, 360, 640, null, null, null, 5000, null, 1);//$url, $saveToFile, $browserWidth = null, $browserHeight = null, $width = null, $height = null, $format = null, $delay = null, $targetElement = null
$screenShot= array();
$screenShot['url'] = "components/com_mobiconf/images/useruploads/$file";
$screenShot['file'] = $file;
$screenShot['directory'] = $directory;
$screenShot['storefile'] = 1;
echo json_encode($screenShot);
exit;
?>
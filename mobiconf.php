<?php
/**
* version $Id: newsfeeds.php 21518 2011-06-10 21:38:12Z chdemko $
 * @package		Joomla.Site
 * @subpackage	com_newsfeeds
 * @copyright	Copyright (C) 2005 - 2011 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

defined('_JEXEC') or die('Restricted access');
$user = &JFactory::getUser();
$itemid = JRequest::getVar('Itemid', 0, '', 'int');
$id = JRequest::getVar('id','0', 'int');
$extraDat = ($id) ? "&id=".$id : '';
if ($user->username == '') 
{ 
    $mainframe = JFactory::getApplication();
    $redirectUrl = base64_encode(JRoute::_("index.php?option=com_mobiconf{$extraDat}&Itemid=$itemid"));  
    $redirectUrl = '&return='.$redirectUrl;
    $joomlaLoginUrl = 'index.php?option=com_users&view=login';
    $finalUrl = $joomlaLoginUrl . $redirectUrl;
   // $mainframe->redirect($finalUrl);
}
//define('DIRC_COM_COMPONENT', 'com_directcron');
require_once (JPATH_COMPONENT.DS.'controllers'.DS.'controller.php');
$view = JRequest::getVar('view', '', 'cmd');
if( $view != '') {

	$path = JPATH_COMPONENT.DS.'controllers'.DS.$view.'.php';
        
	if (file_exists($path)) 
        { require_once ($path);
                
                $controller = $view;
	}  
}
if ($view=='') $defaultTask = 'mbdesign';

//Create the controller
$classname  = 'MoBiConFController'.$controller;

$controller = new $classname( );

$task = JRequest::getVar('task', $defaultTask, 'default', 'cmd');
 
//echo "view is $view and task is $task"; exit;
$controller->execute($task);
// Redirect if set by the controller
$controller->redirect();
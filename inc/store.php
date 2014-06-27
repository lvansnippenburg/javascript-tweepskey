<?php
///////////////////////////////////////////
// store.php             //
// (c) 2003-2006, Jonge Helden BV        //
// The Netherlands                       //
///////////////////////////////////////////
// $Author:  $
// $Date:  $ 
// $Revision:  $
///////////////////////////////////////////
define('__accessKeyId__','04BBTBV1WSAVN7N6GX82');
define('__secretAccessKey__','hCLVezJ7XU6MqE8NLXGV+3qx3sU/pHqOr0baAuCw');
define('__bucketname__','storage.tweepskey.com');
require_once("s3.class.php");

if (stristr($_SERVER['HTTP_REFERER'],"tweepskey") !== false AND (ISSET($_POST['tweep'])) AND (ISSET($_POST['data']))) {
		$path = addslashes($_POST['tweep'])."/".time().".json";
		error_log($path);
		writedata($_POST['data'], $path);
		echo str_replace("/","_",$path);
} else {
	echo "false";
}

function writedata($data, $path) {
	if (substr($path,0,1) =='/') {
		$path = substr($path,1);
	}
	$s3 = new s3(__accessKeyId__, __secretAccessKey__);
	$result = $s3->putObject($data, __bucketname__, $path, S3::ACL_PUBLIC_READ);
	unset($s3);
}
?>
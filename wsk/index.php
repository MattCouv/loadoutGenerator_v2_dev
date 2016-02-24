<?php
	define('ROOT', dirname(__DIR__));
	require ROOT.'/app/App.php';
	$app = App::getInstance();
	$app::load();
	$app->getRouting();
?>

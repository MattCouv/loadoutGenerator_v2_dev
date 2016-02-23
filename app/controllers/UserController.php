<?php
namespace App\controllers;
use \Core\Auth\DBAuth;
use \App;
/**
* 
*/
class UserController extends AppController
{
	protected $template = 'default';
	function __construct($class)
	{
		$app = App::getInstance();
			$auth = new DBAuth($app->getDb());
			if(!$auth->logged() || $auth->getUserStatut() !== str_replace('App\controllers\\', '', $class)){
				header('Location: index.php?url=' . $auth->getUserStatut() . '/index');
			}
	}
}
 ?>
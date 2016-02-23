<?php
namespace App\controllers;
use \Core\Controller\Controller;
use \App;
/**
*
*/
class AppController extends Controller
{
	protected $template = 'default';
	function __construct()
	{
		$this->viewPath = ROOT . '/app/Views/';
	}
}
 ?>

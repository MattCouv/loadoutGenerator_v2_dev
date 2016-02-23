<?php
/**
*
*/
class App{

	public $title = " Mon site ";
	private $db_instance;
	private $router_instance;
	private static $_instance;

	public static function getInstance(){
		if (is_null(self::$_instance)) {
			self::$_instance = new App();
		}
		return self::$_instance;
	}

	public function getRouting(){
		if (is_null($this->router_instance)) {
			$this->router_instance = new \Core\Routing\Router();
		}
		return $this->router_instance;
	}


	public static function load()
	{
		session_start();
		require ROOT . '/app/Autoloader.php';
		App\Autoloader::register();
		require ROOT . '/Core/Autoloader.php';
		Core\Autoloader::register();
	}
}

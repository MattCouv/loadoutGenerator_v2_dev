<?php
namespace Core\Controller;
/**
* 
*/
class Controller{

	protected $viewPath;
	protected $template;

	public function model($model)
	{
		require_once '../app/models/' . $model . '.php';
		return new $model();
	}

	public function render($view, $variables = []){
		if (is_null($this->template)) {
			extract($variables);
			require($this->viewPath . $view . '.php');
		}else{
			ob_start();
			extract($variables);
			require($this->viewPath . $view . '.php');
			$content = $ob_get_clean();
			require($this->viewPath . 'templates/' . $this->template . '.php');
		}
	}
}
 ?>
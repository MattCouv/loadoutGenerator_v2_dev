<?php
namespace Core\HTML;
/**
* 
*/
class Form
{
	protected $data;

	public $surround = 'p';

	function __construct($data = [])
	{
		$this->data = $data;
	}

	protected function surround($html)
	{
		return "<{$this->surround}>{$html}</{$this->surround}>";
	}

	protected function getValue($index)
	{
		return isset($this->data[$index]) ? $this->data[$index] : null;
	}

	public function input($name,$label, $options = [])
	{
		$type = isset($options['type']) ? $options['type'] : 'text';
		return $this->surround(
			'<label for="' . $name . '">' . $label . '</label><input type="' . $type . '" name="' . $name . '" id="' . $name . '" value="' . $this->getValue($name) . '" />'
			);
	}
}
 ?>
<?php
namespace Core\HTML;
/**
*
*/
class Piform extends Form
{
	protected function surround($html)
	{
		return "<div class=\"group\">{$html}<span class=\"bar\"></span></div>";
	}

	public function input($name,$label, $options = [])
	{
		$type = isset($options['type']) ? $options['type'] : 'text';
		return $this->surround(
			'<label for="' . $name . '">' . $label . '</label><input type="' . $type . '" name="' . $name . '" id="' . $name . '" value="' . $this->getValue($name) . '"  class="input underline-ltr" placeholder="' . $label . '" required/>'
			);
	}
}
 ?>
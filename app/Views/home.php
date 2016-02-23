<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>project pi Login page</title>
	<link rel="stylesheet" href="/structureMVC/public/css/home.css">
</head>
<body>
	<header class="header">
		<h1>Bienvenue sur</h1>
		<h1 class="project">Project PI</h1>
	</header>
	<section class="card login">
		<p id="msg"><?php if($errors){ echo 'Identifiant incorrect';}else{echo '';} ?></p>
		<form class="form" method="post" autocomplete="off" id='login_form'>
			<?= $form->input('login','Utilisateur ou email');?>
			<?= $form->input('password','Mot de passe',['type'=>'password']);?>
			<div>
				<button type="submit" class="connect" id="submit">Connexion</button>
			</div>
		</form>
	</section>
	<!-- <script src="/structureMVC/public/js/valScript.js"></script> -->
</body>
</html>
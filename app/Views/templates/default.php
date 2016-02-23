<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="copyright" content="loadoutgenerator is created by Matthieu Couvreur and all rights are recerved to him">
	<meta name="keywords" content="bf4,loadout,generator,loadoutgenerator,random,classes,guns,weapons,items,kits,gadgets,randomly">
	<meta name="description" content="With loadoutgenerator you will be able to generate some random loadouts with YOUR unlocks for Battlefield 4 to mix things up and have some fun trying new ways to play.">
	<meta name="robots" content="index,follow">
	<title>LoadoutGenerator</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<!-- @@@ CSS -->
	<link rel="stylesheet" type="text/css" href="./css/main.css" >
</head>
<body>
<header id="head">
	<div class="game"><a href="#"><img src="./img/logosmall.png" alt=""></div></a>
	<div class="nav">
	<div class="menu">
	<div class="home">
		<a href="#" class="active-borders-right" id="soldierBtn">Soldier</a>
	</div>
	<table class="left">
		<tbody>
			<tr>
				<td>
				<a href="about" class="active-borders-left" id="aboutBtn">About</a>
				</td>
				<td>
				<a href="donation" class="active-borders-left" id="donateBtn">Support</a>
				</td>
			</tr>
		</tbody>
	</table>
	</div>
	</div>
</header>

  <?= $content ?>



  <!-- @@@ JS -->
<script src="./../bower_components/jquery/dist/jquery.min.js" ></script>
<script src="./js/App.js"></script>
<!-- Analytics -->
</body>
</html>

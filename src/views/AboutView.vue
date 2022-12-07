<template>
	<div class="about">
		<h1>Heyhoi, deze webapp is gemaakt om de kookroosters van <span class="adres">Campuslaan 47</span> bij te
			houden!</h1>
		<h2>Als je me nodig hebt, kun je me bereiken via <a class="linkje"
				href="https://github.com/SimplyPancake">GitHub</a>!</h2>
	</div>
</template>

<style>
@media (min-width: 1024px) {
	.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
}

.adres {
	background: #FF0000;
	background: linear-gradient(to right, #FF0000 0%, #FF9900 43%, #FFF700 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.linkje,
.linkje:active,
.linkje:visited,
.linkje:hover {
	background: #BB00FF;
	background: linear-gradient(to left, #BB00FF 0%, #FF0000 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>

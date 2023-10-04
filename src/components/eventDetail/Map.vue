<template>
	<div class="event-detail__map-address">
		<IconEventDetailMap class="event-detail__map-address-icon"/>
		<span class="event-detail__map-value">{{ address }}</span>
	</div>
	<div id="map" />
</template>
<script setup>
	import IconEventDetailMap from '@/components/icons/IconEventDetailMap.vue';
	const props = defineProps(['address']);
	import { onMounted } from 'vue';

	let map = false;
	const loadMap = () =>
	{
		if(typeof window.ymaps != 'undefined')
		{
			initMap();
			return false;
		}

		const script = document.createElement('script');
		script.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?apikey=40de562b-71b5-47b4-9117-e644ce003d6b&lang=ru_RU');

		script.addEventListener('load', () => {initMap(); });
		document.head.appendChild(script);
	};

	const initMap = () => {
		window.ymaps.ready(setupMap);
	};

	const getCoordinates = async (address) => {
		var myGeocoder = ymaps.geocode(address);
		let coords = await myGeocoder.then(function (res){
			const coordinates = res.geoObjects.get(0).geometry._coordinates;
			if (coordinates && coordinates.length === 2)
				return coordinates;
			return false;
		});
		return coords;
	}

	async function setupMap()
	{
		let coords       = await getCoordinates(props.address);
		const mapOptions = {center: [coords[0], coords[1]], zoom: 14, controls: [], };
		map              = new window.ymaps.Map('map', mapOptions, {suppressObsoleteBrowserNotifier: true , suppressMapOpenBlock: true });
		let placemark    = new window.ymaps.Placemark([coords[0], coords[1]]);
		map.geoObjects.add(placemark);
	}

	onMounted(() => {loadMap(); });
</script>
<style lang="scss">
	#map
	{
		max-height: 80px;
		min-height: 80px;
		overflow: hidden;
		position: relative;
		top: 2px;
		border-radius: 8px;

		.ymaps-2-1-79-copyright__wrap { display: none; }
	}

	.event-detail__map-address
	{
		display: flex;
		align-items: center;
		margin: 10px 0;
	}

	.event-detail__map-value
	{
		margin-left: 12px;
		font-size: 14px;
		color: $primary;
		font-weight: 400;
	}

	.event-detail__map-address-icon
	{
		min-width: 24px;
		min-height: 24px;
	}
</style>
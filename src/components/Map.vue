<template>
  <div id="map"></div>
</template>

<script>
import {onMounted} from "vue";
import axios, {HttpStatusCode} from "axios";
import pointer from "@/assets/images/pointer-min.png";

export default {
  setup() {
    onMounted(() => {
      const script = document.createElement("script");
      script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBlSCrrP6QRaHIoe8xeMAT36Blavbz4_UE&callback=initMap";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      window.initMap = function () {
        var zoomMap = 12;
        var fullScrCntr = false;

        if (window.innerWidth > 767) {
          document.getElementById("map").style.height = "600px";
          zoomMap = 13;
          fullScrCntr = true;
        }

        var map = new google.maps.Map(document.getElementById("map"), {
          center: {lat: 56.028028, lng: 92.864297},
          zoom: zoomMap,
          fullscreenControl: fullScrCntr,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_LEFT,
          },
          styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#181818"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#2c2c2c"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#373737"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3c3c3c"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3d3d3d"
                }
              ]
            }
          ]
        });

        function markerInfo(location) {
          const container = document.createElement('div')
          container.className = 'address-item'

          // Close button (optional)
          // const btnClose = document.createElement('div')
          // btnClose.className = 'btn-close'
          // container.appendChild(btnClose)

          // Address text
          const addressText = document.createElement('div')
          addressText.className = 'address-text'
          addressText.innerHTML = location.address
          container.appendChild(addressText)

          // Elements (comments + quests)
          location.elements.forEach(element => {
            if (element.comment) {
              const note = document.createElement('div')
              note.className = 'note'
              note.textContent = element.comment
              container.appendChild(note)
            }

            const questBox = document.createElement('div')
            questBox.className = 'btn-quest-box'

            element.quests.forEach(quest => {
              const link = document.createElement('a')
              link.href = '#'
              link.className = 'btn-red'
              link.textContent = quest
              questBox.appendChild(link)
            })

            container.appendChild(questBox)
          })

          return container
        }

        let markers = [];

        axios.get(import.meta.env.VITE_API_URL + "/location/").then((response) => {
          if (response.status === HttpStatusCode.Ok && response.data.status) {
            let result = response.data.result;
            for (let i = 0; i < result.length; i++) {
              const coords = result[i].coordinates;
              const contentInfo = markerInfo(result[i]);
              const latLng = new google.maps.LatLng(coords[0], coords[1]);

              const marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: pointer,
                info: contentInfo,
                id: i,
                animation: google.maps.Animation.DROP,
              });

              let infoWindow = new google.maps.InfoWindow({
                pixelOffset: new google.maps.Size(0, 74),
                maxWidth: 195,
              });

              google.maps.event.addListener(marker, "click", function () {
                if (window.prev_infowindow) {
                  window.prev_infowindow.close();
                }
                window.prev_infowindow = infoWindow;
                infoWindow.setContent(this.info);
                infoWindow.open(map, this);
              });

              markers.push(marker);
            }
          } else {
            throw new Error("Ошибка сервера");
          }
        }).catch((error) => {
          console.error(`Ошибка при получении локаций: ${error}`)
        })
      };
    });
  },
};
</script>

<style>
#map {
  color: #000;
  min-height: 400px;
}

.address-item {
  font-size: 10px;
  font-weight: 400;
  color: black;
  text-align: center;
}

.address-text {

}

.address-item .address-text {
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
}

.address-item .note {
  margin: 10px 0;
}

.address-item .btn-quest-box {
  text-align: center;
}

.address-item .btn-quest-box .btn-red {
  font-size: 12px;
  margin: 2px auto;
}

.btn-red {
  display: inline-block;
  background-color: #ce1034;
  font-size: 16px;
  font-weight: 400;
  color: white;
  padding: 6px 18px;
  -webkit-border-radius: 18px;
  border-radius: 18px;
  border-width: 0;
  margin: 10px 0;
}

@media (max-width: 768px) {

}
</style>

<!-- <template>
<div id="map" style="width: 100%; height: 400px;"></div>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
name: 'YandexMap',
setup() {
    const map = ref(null);

    onMounted(() => {
    ymaps.ready(() => {
        // Инициализация карты
        map.value = new ymaps.Map('map', {
        center: [56.011127, 92.857018], // Центр карты (Москва)
        zoom: 12, // Уровень масштабирования
        });

    });
    });

    return {
    map,
    };
},
};
</script> -->
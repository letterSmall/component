let vars = {
  mapStyles: [
    { featureType: "all", elementType: "labels", stylers: [{ visibility: "on" }] },
    { featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "administrative.locality", elementType: "labels.text", stylers: [{ visibility: "on" }] },
    { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 20 }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 21 }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dedede" }, { lightness: 21 }] },
    { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 18 }] },
    { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 16 }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#f2f2f2" }, { lightness: 19 }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] },
  ],
  placesList: []
}

let select = s => document.querySelector(s),
    selectAll = s => document.querySelectorAll(s)

const mailForm = select('#email-form')
const searchPlacesInput = select('[data-search-places]')
const calendlyButtons = selectAll('[data-calendly-button]')
const clearSearchButton = select('[data-clear-search]')

const places = selectAll('#autocomplete-options--places [data-option-value]')
const placesArray = places.forEach(place => vars.placesList.push({
  title: place.getAttribute('data-option-value'),
  lat: place.getAttribute('data-option-lat'),
  lng: place.getAttribute('data-option-lng'),
  desc: place.getAttribute('data-option-description'),
  calendly: place.getAttribute('data-option-calendly')
}))
const showPlaces = () =>  places.forEach(place => place.classList.remove('hide'))
const hidePlaces = () => places.forEach(place => place.classList.add('hide'))
const popupCalendy = calendlyUrl => Calendly.initPopupWidget({url: calendlyUrl.toString()})

const isEmpty = str => !str.trim().length;


window.initTestRideApp = function () {

  let myLatlng = new google.maps.LatLng(37.090240, -95.712891);
  let mapSettings = {
    // center: { lat: 37.090240, lng: -95.712891 },
    center: myLatlng,
    zoom: 4,
    mapTypeControl: !1,
    fullscreenControl: !1,
    zoomControl: !0,
    zoomControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER },
    streetViewControl: !1,
    styles: vars.mapStyles,
  }

  let map = new google.maps.Map(document.getElementById("map"), mapSettings)

  const markerIcon = {
    url: 'https://cdn.shopify.com/s/files/1/0577/4222/9674/t/8/assets/marker-test-ride.svg?v=53485591299819474011653294808', // url
    scaledSize: new google.maps.Size(48, 60), // W & H
  };

  // add the markers and infowindow
  let marker, infowindow = new google.maps.InfoWindow()
  vars.placesList.forEach(place => {
    if(place.desc !== 'null') {
      
      const placeLatlng = new google.maps.LatLng(place.lat, place.lng)
      
      marker = new google.maps.Marker({
        position: placeLatlng,
        icon: markerIcon,
        title: place.title,
        map: map
      })

      marker['infowindow'] = new google.maps.InfoWindow({
        content: `
          <div class="map-info-window">
            <h2>${place.title}</h2>
            <p>${place.desc}</p>
            <br>
            <a href="javascript:void(0)" class="btn btn--yellow btn--small btn--rounded btn--bold-text btn--no-animate" onClick="popupCalendy('${place.calendly}')"> Book Now </a>
          </div>
          `,
        maxWidth: 294
      })

      const placeCircle = new google.maps.Circle({
        strokeWeight: 1,
        strokeColor: "#1e1e1e",
        strokeOpacity: 0.2,
        fillColor: "#1e1e1e",
        fillOpacity: 0.1,
        map,
        center: placeLatlng,
        radius: 800,
      });

      google.maps.event.addListener(marker, 'click', function() {
        popupCalendy(place.calendly)
      })

      google.maps.event.addListener(placeCircle, 'click', function() {
        popupCalendy(place.calendly)
      })

      let closeInfoWindowWithTimeout
      
      google.maps.event.addListener(marker, 'mouseover', function() {
        clearTimeout(closeInfoWindowWithTimeout)
        this['infowindow'].open(map, this)

        selectAll('.map-info-window').forEach(info => {
          info.addEventListener('mouseover', function(){
            clearTimeout(closeInfoWindowWithTimeout)
          })
        })
      })

      google.maps.event.addListener(marker, 'mouseout', function(){
        closeInfoWindowWithTimeout = setTimeout(() => this['infowindow'].close(), 250)
      })

    }
  })
  

  // show location map
  places.forEach(place => {
    place.addEventListener('click', function(e){
      e.preventDefault()
      const mapLat = this.getAttribute('data-option-lat')
      const mapLng = this.getAttribute('data-option-lng')
      const desc = this.getAttribute('data-option-description')

      map.setCenter(new google.maps.LatLng(mapLat, mapLng))
      desc !== 'null' ? map.setZoom(15) : map.setZoom(4)
    })
  })
}

// Search places
const initSearchPlaces = function() {  

  function clearSearchPlace() {
    showPlaces()
    searchPlacesInput.value = ''
    clearSearchButton.classList.add('hide')
    mailForm.classList.add('hide')
  }

  function searchPlaces() {
    let selectedPlaces = vars.placesList.filter(placec => placec.title.toLowerCase().includes(this.value.toLowerCase()));
    let isPlaces = vars.placesList.some(place => place.title.toLowerCase().includes(this.value.toLowerCase()));

    // show clear search button
    if(clearSearchButton.classList.contains('hide')) clearSearchButton.classList.remove('hide')

    // toggle show/hide places
    if(isEmpty(this.value)) {
      clearSearchPlace()
    }
    else {
      hidePlaces()
      selectedPlaces.map(selectedPlace => {
        const isListCountry = select(`[data-option-value="${selectedPlace.title}"]`).getAttribute('data-option-is-country')
        if(isListCountry == "true") {
          const countryCode = select(`[data-option-value="${selectedPlace.title}"]`).getAttribute('data-option-country')
          select(`[data-option-value="${selectedPlace.title}"]`).classList.remove('hide')
          selectAll(`[data-option-country="${countryCode}"]`).forEach(city => city.classList.remove('hide'))
        }
        else {
          select(`[data-option-value="${selectedPlace.title}"]`).classList.remove('hide')
        }
      })
    }

    // display email form when the input place is not in the list
    if(!isPlaces && !isEmpty(this.value)) mailForm.classList.remove('hide')
    else mailForm.classList.add('hide')
  }  

  // popup calendly widget
  calendlyButtons.forEach(calendlyButton => {
    calendlyButton.addEventListener('click', function(e){
      e.preventDefault()
      const calendlyUrl = this.getAttribute('href')
      popupCalendy(calendlyUrl)
    })
  })

  // search place
  searchPlacesInput.addEventListener('keyup', searchPlaces)

  // clear search
  clearSearchButton.addEventListener('click', clearSearchPlace)

}

document.addEventListener("DOMContentLoaded", function () {
  initSearchPlaces()
})
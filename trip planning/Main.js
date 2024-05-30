//javascript.js
//set map options
var myLatLng = { lat: 24.149456, lng: 120.683876};
var mapOptions = {
    center: myLatLng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();
//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();
//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

//define calcRoute function
function calcRoute() {
    // 清除先前的路線
    directionsDisplay.setDirections({ routes: [] });

    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC
    }

    // 獲取旅行清單中的所有項目
    var travelListItems = document.querySelectorAll('#travelList li');
    if (travelListItems.length > 0) {
        request.waypoints = []; // 如果有旅行項目，則創建路線中途點
        travelListItems.forEach(function(item) {
            request.waypoints.push({
                location: item.textContent,
                stopover: true
            });
        });
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
            
            //display route
            directionsDisplay.setDirections(result);

            // 顯示推薦地點
            var originLatLng = result.routes[0].legs[0].start_location;
            showNearbyPlaces(originLatLng);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map
            map.setCenter(myLatLng);
            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
            // 處理錯誤
            alert('無法找到路線，請稍後再試。');
        }
    });
}


function showNearbyPlaces(location) {
    var request = {
        location: location,
        radius: '5000', // 搜索半徑，單位為米
        type: ['tourist_attraction'] // 搜索的景點類型
    };

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            // 在網頁上顯示推薦景點
            displayNearbyPlaces(results.filter(place => place.rating && place.rating >= 4));
             // 在地圖上添加標記
             for (var i = 0; i < results.length; i++) {
                var place = results[i];
                var markerIcon = {
                    url: 'Images/good.png', // 自定義圖標的 URL
                    scaledSize: new google.maps.Size(50,50) // 圖標的大小
                };
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    title: place.name,
                    icon: markerIcon // 使用自定義圖標
                });
            }
        }
    });
}

function displayNearbyPlaces(places) {
    var recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = '<h3>附近推薦景點：</h3><ul id="placesList" class="list-group list-group-flush">';
    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        // 使用 place.name、place.vicinity、place.rating 等屬性來顯示景點信息
        var placeInfo = '<li class="list-group-item" onclick="moveMapToPlace(' + place.geometry.location.lat() + ', ' + place.geometry.location.lng() + ', \'' + place.name + '\', ' + (place.rating || '無') + ')"><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>評分：' + (place.rating || '無') + '</li>';
        recommendationsContainer.innerHTML += placeInfo;

        // 在地圖上添加標記
        var markerIcon = {
            url: 'Images/good.png', // 自定義圖標的 URL
            scaledSize: new google.maps.Size(50,50) // 圖標的大小
        };
        var marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
            icon: markerIcon // 使用自定義圖標
        });

        // 創建 InfoWindow 以顯示詳細資訊
        var infoWindow = new google.maps.InfoWindow({
            content: '<strong>' + place.name + '</strong><br>' + place.vicinity 
        });
        // 添加 mouseover 事件，當用戶將鼠標懸停在圖標上時顯示 InfoWindow
        marker.addListener('mouseover', function() {
            infoWindow.open(map, marker);
        });
        // 添加 mouseout 事件，當用戶將鼠標移開圖標時關閉 InfoWindow
        marker.addListener('mouseout', function() {
            infoWindow.close();
        });
    }
    recommendationsContainer.innerHTML += '</ul>';
    // Add overflow-auto class to make the list scrollable
    recommendationsContainer.classList.add('overflow-auto');
}

function moveMapToPlace(lat, lng, placeName, placeRating) {
    var location = new google.maps.LatLng(lat, lng);
    map.setCenter(location);
    // 使用 Google 地圖地點圖片服務的 URL
    var imageUrl1 = 'https://maps.googleapis.com/maps/api/streetview?size=200x100&location=' + lat + ',' + lng + '&key=AIzaSyCQg-z8wy8TcOHC7EjlhM6yEWoyLDHsLwc';
    var ratingHtml = placeRating ? '<p><strong>評分：</strong>' + placeRating + '</p>' : '';

    // 在地圖上創建 InfoWindow 來顯示詳細資訊
    var infoWindowContent = '<div>' +
    '<h4>' + placeName + '</h4>' +
    '<img src="' + imageUrl1 + '" alt="' + placeName + ' 圖片" margin-right: 10px;">' + 
    '<p><strong>經緯度：</strong>' + lat + ', ' + lng + '</p>' +
    '<button class="btn btn-primary btn-sm" onclick="addToMyTravelList(\'' + placeName + '\')">加入旅行清單</button>' +
    '</div>';


    var infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
    });

    // 在地圖的中心顯示 InfoWindow
    infoWindow.setPosition(location);
    infoWindow.open(map);
}

function addToMyTravelList(placeName) {
    var listItem = document.createElement('li');
    listItem.textContent = placeName;
    document.getElementById('travelList').appendChild(listItem);
    // 將景點名稱存儲在一個陣列中或者發送一個 API 請求將其存儲在後端資料庫中
    alert('已將 ' + placeName + ' 加入您的旅行清單！');
    // 創建刪除按鈕
    var deleteButton = document.createElement('button');
    deleteButton.textContent = '刪除';
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm'); // 添加 Bootstrap 按鈕樣式
    deleteButton.addEventListener('click', function() {
        listItem.remove(); // 刪除對應的清單項目
        alert('已將 ' + placeName + ' 從您的旅行清單刪除！'); 
    });
    listItem.appendChild(deleteButton); // 將刪除按鈕添加到清單項目中
}

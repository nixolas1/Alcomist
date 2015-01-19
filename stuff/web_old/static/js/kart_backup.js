window.onload = function(){
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

        var map = document.getElementById("map_canvas");
        var cont = document.getElementById("container");
        map.style.height = (y-73)+"px";
       
      }

      function initialize() {


        var NTNU = new google.maps.LatLng(63.417622, 10.404305);
        var koie1 = new google.maps.LatLng(63.409944, 10.447027);
		
        var mapOptions = {
          zoom: 9,
          center: NTNU
        };

        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

              //NTNU
              //Description

              var contentString = '<a href="koie.php?id=0">Kråklikåten</a>  ';

              //infowindow
              var infowindow = new google.maps.InfoWindow({
                content: contentString
              });

              //marker

              var marker = new google.maps.Marker({
                position: NTNU,
                map: map,
                title: 'NTNU'
              });

              //Koie1

              //Description
              var koie1String = 'Hei, her finnes det en studentby som heter Voll Studentby ;) ';

              /*infowindow
              var koie1infowindows = new google.maps.infoWindow({
                  content: koie1String
                }); */


               //marker

               var marker1 = new google.maps.Marker({
                position: koie1,
                map: map,
                title: 'Voll Studentby'

              });




               google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
              });

              /*google.map.event.addListener(marker1, 'click', function(){
                koie1infowindows.open(map,marker1);
              });*/




}

google.maps.event.addDomListener(window, 'load', initialize);

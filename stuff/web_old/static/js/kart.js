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

        function Koie(name, lat, long) {
          this.name = name;
          this.long = long;
          this.lat = lat;
        }
        var center = new google.maps.LatLng(63.16349, 10.52637);

        var flaakoia = new Koie("Flåkoia", 63.15702, 10.36538);
        var fosenkoia = new Koie("Fosenkoia", 63.56813, 10.2954);
        var heinfjordstua = new Koie("Heinfjordstua", 63.31492, 10.75206);
        var hognabu = new Koie("Hognabu", 63.10875, 11.53450);
        var holmsaakoia = new Koie("Holmsåkoia", 63.08642, 11.64870);
        var holvassgamma = new Koie("Holvassgamma", 63.82745, 10.37133);
        var iglbu = new Koie("Iglbu", 62.96119, 10.09028);
        var kamtjoennkoia = new Koie("Kamtjønnkoia", 62.74317, 09.29119);
        var kraaklikaaten = new Koie("Kråklikåten", 63.1229, 10.59167);
        var kvernmovollen = new Koie("Kvernmovollen", 62.9283, 10.97890);
        var kaasen = new Koie("Kåsen", 63.12375, 09.44338);
        var lynhoegen = new Koie("Lynhøgen", 63.21028, 10.70875);
        var mortenskaaten = new Koie("Mortenskåten", 63.01650, 10.95894);
        var nicokoia = new Koie("Nicokoia", 63.16349, 10.52637);
        var rindalsloea = new Koie("Rindalsløa", 63.01999, 09.19786);
        var selbukaaten = new Koie("Selbukåten", 63.32851, 11.02758);
        var sonvasskoia = new Koie("Sonvasskoia", 63.39030, 11.41852);
        var stabburet = new Koie("Stabburet", 63.14200, 11.72236);
        var stakkslettbua = new Koie("Stakkslettbua", 63.14713, 09.11576);
        var telin = new Koie("Telin", 62.87615, 09.66196);
        var taagaabu = new Koie("Tågåbu", 62.82197, 10.60875);
        var vekvessaetra = new Koie("Vekvessætra", 62.70850, 09.80087);
        var oevensenget = new Koie("Øvensenget", 62.41219, 11.18655);

        var koier = [flaakoia, fosenkoia, heinfjordstua, hognabu, holmsaakoia, holvassgamma, iglbu, kamtjoennkoia, kraaklikaaten, kvernmovollen, kaasen, lynhoegen, mortenskaaten, nicokoia, rindalsloea,
        selbukaaten, sonvasskoia, stabburet, stakkslettbua, telin, taagaabu, vekvessaetra, oevensenget];

        var mapOptions = {
          zoom: 8,
          center: center,
        };

        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

        markers = [];
        for (var i = 0; i < koier.length;i++) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(koier[i].lat, koier[i].long),
            map: map,
			title: koier[i].name,
			maxWidth: 500.0            
          });

          markers.push(marker);
        }

        //infowindow that will open and close around the map
        var myInfowindow = new google.maps.InfoWindow({
          content: "",
        });

        function bindInfoWindow(marker, infowindow, koie) {
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent("<a href='koie.php?id=0'>" + koie.name + "</a>");     //OBSOBS!!! Lenken fører kun til Kråklikåten (id=0), må få korrekt linkformat...

            console.log(koie.name);
            infowindow.open(map, marker);
          });
        };

        for (var i = 0; i < markers.length; i++) {
          bindInfoWindow(markers[i], myInfowindow, koier[i]);
        }
}

google.maps.event.addDomListener(window, 'load', initialize);

import {Injectable} from '@angular/core';
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {Vector as VectorSource} from "ol/source";
import {Vector as VectorLayer} from "ol/layer";
import {fromLonLat} from "ol/proj";
import {Icon, Style} from "ol/style";


@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map?: Map;

  constructor() {
  }

  vectorSource = new VectorSource({
    features: [] as Feature[]
  });

  initMap() {

    this.map = new Map({
      target: 'map',  // The id of the div where the map will be displayed
      layers: [
        new TileLayer({
          source: new OSM()  // Using OpenStreetMap as the base layer
        })
      ],
      view: new View({
        center: fromLonLat([9.266163, 47.391255]),  // Coordinates in EPSG:3857 (Web Mercator)
        zoom: 14  // Zoom level
      })
    });

    const vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

// Add the vector layer to the map
    this.map.addLayer(vectorLayer);

    this.map.on('singleclick', (event) => {
      this.map?.forEachFeatureAtPixel(event.pixel, function (feature) {

        feature.get('clickListener')?.(feature.get('model'));
      });
    });
  }

  addFeature<T>(long: number, lat: number, dataItem: T, clickListener: (item: T) => void, iconUrl: string) {
    const feature = new Feature({
      geometry: new Point(fromLonLat([long, lat])),
      model: 1
    });
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: iconUrl
      })
    });

    feature.setStyle(iconStyle);


    feature.set('model', dataItem)

    feature.set('clickListener', clickListener);
    this.vectorSource.addFeature(feature)
  }

}

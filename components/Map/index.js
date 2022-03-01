import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useState, useRef } from "react";
import MapMarker from "./MapMarker";
import useGeoLocation from  "../../hooks/useGeoLocation";
import features from "../../configs/features";


const findCenter = (data) =>
  data
    .map((m) => m.position)
    .reduce(
      (prev, cur) => (cur ? prev.map((n, i) => n + cur[i]) : prev),
      [0, 0]
    )
    .map((n) => n / data.length);

const Map = ({ markers }) => {
  const zoomLevel = 7

  const data = markers
    .filter((m) => m.lat && m.lon && m.lat.length && m.lon.length)
    .map((m) => ({
      ...m,
      position: [ parseFloat(m.lat), parseFloat(m.lon) ],
    }));

  if (data.length < 1)
    return null;

  const position = findCenter(data);

  const [enableGeolocation, setEnableGeolocation] = useState(false)
  const location = useGeoLocation(enableGeolocation)
  const allowLocation = () => {
    setEnableGeolocation(true)
    console.log("enable geo:" + enableGeolocation)
  }

  const [map, setMap] = useState(null);
  const showMyLocation = () => { // either fix this or make it just request permission for location, or both 
    if(location.loaded && !location.error){
      map.flyTo([location.coordinates.lat, location.coordinates.lng], zoomLevel, {animate: true})
    } else {
      //alert(location.error.message) <- doesn't work properly, spits out error `message undefined`
      console.log("location not loaded")
    }
  }

  return (
    <div>
      {features.geolocation &&
        <div>
          <button className="showlocation-button" onClick={showMyLocation}>Show My Location</button>
          <button onClick={allowLocation}>Allow Location</button>
        </div>
      }
      <MapContainer center={position} zoom={zoomLevel} scrollWheelZoom={false} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((m, index) => (
          <MapMarker {...m} key={index} />
        ))}
        {features.geolocation && location.loaded && !location.error && (
          <Marker position={[location.coordinates.lat, location.coordinates.lng]}></Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;

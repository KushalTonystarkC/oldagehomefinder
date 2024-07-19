'use client';
import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

// Fix leaflet's default icon issue
// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Area {
  name: string;
  coordinates: Coordinates;
}

interface City {
  name: string;
  areas: Area[];
}

interface MapComponentProps {
  filteredData: City[];
}

const MapComponent: React.FC<MapComponentProps> = ({ filteredData }) => {
  return (
    <MapContainer
      center={[36.1699, -115.1398]} // Center the map on Nevada
      zoom={6}
      scrollWheelZoom={false}
      className="map-container"
      style={{ height: "350px", width: "100%" }} // Set the map height and width
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <MarkerClusterGroup> */}
        {filteredData.map((city) =>
          city.areas.map((area) => (
            <Marker
              key={area.name}
              position={[area.coordinates.latitude, area.coordinates.longitude]}
            >
              <Popup>
                <strong>{area.name}</strong><br />
                {city.name}
              </Popup>
            </Marker>
          ))
        )}
      {/* </MarkerClusterGroup> */}
    </MapContainer>
  );
};

export default MapComponent;
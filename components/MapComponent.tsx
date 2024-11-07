'use client';
import React, { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
  selectedCoordinates: Coordinates | null;
}

// Component to handle map center on selected coordinates
const FlyToLocation: React.FC<{ coordinates: Coordinates | null }> = ({ coordinates }) => {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.flyTo([coordinates.latitude, coordinates.longitude], 12); // Adjust zoom level if needed
    }
  }, [coordinates, map]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ filteredData, selectedCoordinates, isDefaultView }) => {
  const defaultCenter = [36.1699, -115.1398]; // Default center (e.g., Nevada)

  const FlyToLocation: React.FC<{ coordinates: Coordinates | null }> = ({ coordinates }) => {
    const map = useMap();
    useEffect(() => {
      if (coordinates && !isDefaultView) {
        map.flyTo([coordinates.latitude, coordinates.longitude], 12);
      } else if (isDefaultView) {
        map.flyTo(defaultCenter, 6); // Reset to default center with zoom level 6
      }
    }, [coordinates, isDefaultView, map]);

    return null;
  };

  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      scrollWheelZoom={false}
      className="map-container"
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToLocation coordinates={selectedCoordinates} />

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

      {selectedCoordinates && !isDefaultView && (
        <Marker position={[selectedCoordinates.latitude, selectedCoordinates.longitude]}>
          <Popup>
            <strong>Selected Location</strong>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;

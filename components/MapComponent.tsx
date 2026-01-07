'use client';
import React, { useEffect, useRef, useState, useMemo } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

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
  isDefaultView: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ filteredData, selectedCoordinates, isDefaultView }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const markersRef = useRef<maptilersdk.Marker[]>([]);
  const popupsRef = useRef<maptilersdk.Popup[]>([]);
  const listenersRef = useRef<Record<string, any>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const defaultCenter = useMemo<[number, number]>(() => [36.1699, -115.1398], []); // Default center (e.g., Nevada)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) {
      console.log('Map container not ready');
      return;
    }
    
    if (map.current) {
      console.log('Map already initialized');
      return;
    }

    // Get API key from environment variable or use a default
    const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || 'MAPTILER_API_KEY';
    console.log('Initializing map with API key:', apiKey ? `${apiKey.substring(0, 5)}...` : 'not set');
    maptilersdk.config.apiKey = apiKey;

    try {
      // Initialize the map
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [defaultCenter[1], defaultCenter[0]], // MapTiler uses [lng, lat]
        zoom: 6,
        scrollZoom: false,
      });

      console.log('Map instance created, waiting for load event...');

      // Wait for map to load before setting mounted
      map.current.once('load', () => {
        console.log('Map loaded successfully');
        setIsMounted(true);
        setMapError(null);
      });

      // Handle map errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Failed to load map. Please check your API key.');
        setIsMounted(false);
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please check your API key.');
      setIsMounted(false);
    }

    return () => {
      // Cleanup markers and popups
      markersRef.current.forEach(marker => marker.remove());
      popupsRef.current.forEach(popup => popup.remove());
      markersRef.current = [];
      popupsRef.current = [];
      
      // Cleanup map
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [defaultCenter]);

  // Handle map view and markers update
  useEffect(() => {
    if (!map.current || !isMounted) return;

    const mapInstance = map.current;

    // 1. Prepare GeoJSON data
    const features: GeoJSON.Feature[] = [];
    filteredData.forEach((city) => {
      city.areas.forEach((area) => {
        features.push({
          type: 'Feature',
          properties: {
            name: area.name,
            city: city.name,
            id: `${city.name}-${area.name}`,
          },
          geometry: {
            type: 'Point',
            coordinates: [area.coordinates.longitude, area.coordinates.latitude],
          },
        });
      });
    });

    const geojsonData: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: features,
    };

    // 2. Update Source and Layers
    const updateMarkers = () => {
      const source = mapInstance.getSource('markers') as maptilersdk.GeoJSONSource;
      
      if (source) {
        source.setData(geojsonData);
      } else {
        // Add GeoJSON source with clustering
        mapInstance.addSource('markers', {
          type: 'geojson',
          data: geojsonData,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        // Add cluster circles
        mapInstance.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'markers',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              10,
              '#f1f075',
              50,
              '#f28cb1',
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              10,
              30,
              50,
              40,
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          },
        });

        // Add cluster count labels
        mapInstance.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'markers',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
          },
        });

        // Add unclustered points
        mapInstance.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'markers',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#3388ff',
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff',
          },
        });

        // Add Event Listeners only once
        const clusterClickHandler = (e: maptilersdk.MapLayerMouseEvent) => {
          const features = mapInstance.queryRenderedFeatures(e.point, { layers: ['clusters'] });
          if (!features.length) return;
          const clusterId = features[0].properties!.cluster_id;
          const source = mapInstance.getSource('markers') as maptilersdk.GeoJSONSource;
          (source as any).getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
            if (err || zoom === undefined) return;
            mapInstance.easeTo({
              center: (features[0].geometry as GeoJSON.Point).coordinates as [number, number],
              zoom: zoom,
            });
          });
        };

        const pointClickHandler = (e: maptilersdk.MapLayerMouseEvent) => {
          if (!e.features || e.features.length === 0) return;
          const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number];
          const properties = e.features[0].properties as any;
          new maptilersdk.Popup()
            .setLngLat(coordinates)
            .setHTML(`<strong>${properties.name}</strong><br />${properties.city}`)
            .addTo(mapInstance);
        };

        const setCursorPointer = () => { mapInstance.getCanvas().style.cursor = 'pointer'; };
        const setCursorDefault = () => { mapInstance.getCanvas().style.cursor = ''; };

        mapInstance.on('click', 'clusters', clusterClickHandler);
        mapInstance.on('click', 'unclustered-point', pointClickHandler);
        mapInstance.on('mouseenter', 'clusters', setCursorPointer);
        mapInstance.on('mouseleave', 'clusters', setCursorDefault);
        mapInstance.on('mouseenter', 'unclustered-point', setCursorPointer);
        mapInstance.on('mouseleave', 'unclustered-point', setCursorDefault);

        listenersRef.current = {
          clusterClickHandler,
          pointClickHandler,
          setCursorPointer,
          setCursorDefault
        };
      }
    };

    // 3. Update Individual Markers
    // Remove existing individual markers
    markersRef.current.forEach(marker => marker.remove());
    popupsRef.current.forEach(popup => popup.remove());
    markersRef.current = [];
    popupsRef.current = [];

    if (selectedCoordinates && !isDefaultView) {
      const selectedMarker = new maptilersdk.Marker({ color: "#ff3388" })
        .setLngLat([selectedCoordinates.longitude, selectedCoordinates.latitude])
        .addTo(mapInstance);

      const selectedPopup = new maptilersdk.Popup({ offset: 25 })
        .setHTML(`<strong>Selected Location</strong>`);

      selectedMarker.setPopup(selectedPopup);
      markersRef.current.push(selectedMarker);
      popupsRef.current.push(selectedPopup);
    }

    // 4. Update View
    const updateView = () => {
      if (selectedCoordinates && !isDefaultView) {
        mapInstance.flyTo({
          center: [selectedCoordinates.longitude, selectedCoordinates.latitude],
          zoom: 12,
          duration: 1000,
        });
      } else if (isDefaultView) {
        if (features.length > 0) {
          const bounds = new maptilersdk.LngLatBounds();
          features.forEach((f) => {
            bounds.extend((f.geometry as GeoJSON.Point).coordinates as [number, number]);
          });
          mapInstance.fitBounds(bounds, { padding: 50, duration: 1000, maxZoom: 12 });
        } else {
          mapInstance.flyTo({
            center: [defaultCenter[1], defaultCenter[0]],
            zoom: 6,
            duration: 1000,
          });
        }
      }
    };

    // Execute updates
    if (mapInstance.loaded()) {
      updateMarkers();
      updateView();
    } else {
      mapInstance.once('load', () => {
        updateMarkers();
        updateView();
      });
    }

    return () => {
      // Clean up markers and popups on every run if needed, but source/layers we keep
      // If component unmounts, the primary useEffect cleanup handles map removal
    };
  }, [filteredData, selectedCoordinates, isDefaultView, isMounted, defaultCenter]);


  return (
    <div 
      ref={mapContainer} 
      className="map-container"
      style={{ height: "350px", width: "100%", position: "relative" }}
    >
      {!isMounted && (
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            flexDirection: "column",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            zIndex: 1000
          }}
        >
          {mapError ? (
            <>
              <div style={{ color: "red", marginBottom: "10px" }}>{mapError}</div>
              <div>Loading map...</div>
            </>
          ) : (
            <div>Loading map...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapComponent;

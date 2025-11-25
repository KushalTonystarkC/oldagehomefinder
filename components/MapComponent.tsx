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
    const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || 'Oa5JyryB7kK62XHg83D2';
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

  // Handle flyTo for selected coordinates and default view
  useEffect(() => {
    if (!map.current) return;

    if (selectedCoordinates && !isDefaultView) {
      map.current.flyTo({
        center: [selectedCoordinates.longitude, selectedCoordinates.latitude],
        zoom: 12,
        duration: 1000,
      });
    } else if (isDefaultView) {
      map.current.flyTo({
        center: [defaultCenter[1], defaultCenter[0]],
        zoom: 6,
        duration: 1000,
      });
    }
  }, [selectedCoordinates, isDefaultView, defaultCenter]);

  // Update markers with clustering when filteredData or selectedCoordinates change
  useEffect(() => {
    if (!map.current || !isMounted) return;

    const addMarkersWithClustering = () => {
      // Remove existing source and layers if they exist (this also removes event listeners)
      if (map.current!.getSource('markers')) {
        // Remove layers first
        if (map.current!.getLayer('clusters')) {
          map.current!.removeLayer('clusters');
        }
        if (map.current!.getLayer('cluster-count')) {
          map.current!.removeLayer('cluster-count');
        }
        if (map.current!.getLayer('unclustered-point')) {
          map.current!.removeLayer('unclustered-point');
        }
        // Remove source (this will clean up associated event listeners)
        map.current!.removeSource('markers');
      }

      // Remove existing individual markers
      markersRef.current.forEach(marker => marker.remove());
      popupsRef.current.forEach(popup => popup.remove());
      markersRef.current = [];
      popupsRef.current = [];

      // Prepare GeoJSON data for clustering
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

      // Add selected coordinates as a separate feature (not clustered)
      if (selectedCoordinates && !isDefaultView) {
        const selectedMarker = new maptilersdk.Marker({ color: "#ff3388" })
          .setLngLat([selectedCoordinates.longitude, selectedCoordinates.latitude])
          .addTo(map.current!);

        const selectedPopup = new maptilersdk.Popup({ offset: 25 })
          .setHTML(`<strong>Selected Location</strong>`);

        selectedMarker.setPopup(selectedPopup);
        markersRef.current.push(selectedMarker);
        popupsRef.current.push(selectedPopup);
      }

      // Add GeoJSON source with clustering
      map.current!.addSource('markers', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features,
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      // Add cluster circles
      map.current!.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'markers',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      // Add cluster count labels
      map.current!.addLayer({
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
      map.current!.addLayer({
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

      // Click handler for clusters
      const clusterClickHandler = (e: maptilersdk.MapLayerMouseEvent) => {
        const features = map.current!.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        });
        if (features.length === 0) return;
        
        const clusterId = features[0].properties!.cluster_id;
        const source = map.current!.getSource('markers') as any;
        
        if (source && typeof source.getClusterExpansionZoom === 'function') {
          source.getClusterExpansionZoom(clusterId, (err: Error | null, zoom?: number) => {
            if (err || zoom === undefined) return;
            map.current!.easeTo({
              center: (features[0].geometry as GeoJSON.Point).coordinates as [number, number],
              zoom: zoom,
            });
          });
        }
      };

      // Click handler for individual points
      const pointClickHandler = (e: maptilersdk.MapLayerMouseEvent) => {
        if (!e.features || e.features.length === 0) return;
        const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number];
        const properties = e.features[0].properties as any;
        
        new maptilersdk.Popup()
          .setLngLat(coordinates)
          .setHTML(`<strong>${properties.name}</strong><br />${properties.city}`)
          .addTo(map.current!);
      };

      // Change cursor on hover
      const clusterMouseEnter = () => {
        map.current!.getCanvas().style.cursor = 'pointer';
      };
      const clusterMouseLeave = () => {
        map.current!.getCanvas().style.cursor = '';
      };
      const pointMouseEnter = () => {
        map.current!.getCanvas().style.cursor = 'pointer';
      };
      const pointMouseLeave = () => {
        map.current!.getCanvas().style.cursor = '';
      };

      map.current!.on('click', 'clusters', clusterClickHandler);
      map.current!.on('click', 'unclustered-point', pointClickHandler);
      map.current!.on('mouseenter', 'clusters', clusterMouseEnter);
      map.current!.on('mouseleave', 'clusters', clusterMouseLeave);
      map.current!.on('mouseenter', 'unclustered-point', pointMouseEnter);
      map.current!.on('mouseleave', 'unclustered-point', pointMouseLeave);
    };

    // Wait for map to be fully loaded
    if (map.current.loaded()) {
      addMarkersWithClustering();
    } else {
      map.current.once('load', addMarkersWithClustering);
    }

    // Cleanup function - removing source and layers will clean up event listeners
    return () => {
      if (map.current && map.current.getSource('markers')) {
        if (map.current.getLayer('clusters')) {
          map.current.removeLayer('clusters');
        }
        if (map.current.getLayer('cluster-count')) {
          map.current.removeLayer('cluster-count');
        }
        if (map.current.getLayer('unclustered-point')) {
          map.current.removeLayer('unclustered-point');
        }
        map.current.removeSource('markers');
      }
    };
  }, [filteredData, selectedCoordinates, isDefaultView, isMounted]);

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

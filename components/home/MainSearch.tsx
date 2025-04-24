'use client';
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, InputGroup, Form, Button, Image, Dropdown } from 'react-bootstrap';
import MapComponent from "../MapComponent";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

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

const data: { cities: City[] } = {
  cities: [
    {
      name: "Las Vegas",
      areas: [
        {
          name: "The Strip",
          coordinates: {
            latitude: 36.1147,
            longitude: -115.1728
          }
        },
        {
          name: "Downtown Las Vegas",
          coordinates: {
            latitude: 36.1719,
            longitude: -115.1440
          }
        },
        {
          name: "Summerlin",
          coordinates: {
            latitude: 36.1650,
            longitude: -115.3101
          }
        }
      ]
    },
    {
      name: "Reno",
      areas: [
        {
          name: "Midtown",
          coordinates: {
            latitude: 39.5141,
            longitude: -119.8089
          }
        },
        {
          name: "University District",
          coordinates: {
            latitude: 39.5452,
            longitude: -119.8166
          }
        },
        {
          name: "Riverwalk District",
          coordinates: {
            latitude: 39.5273,
            longitude: -119.8135
          }
        }
      ]
    },
    {
      name: "Carson City",
      areas: [
        {
          name: "Downtown Carson City",
          coordinates: {
            latitude: 39.1638,
            longitude: -119.7674
          }
        },
        {
          name: "West Side Historic District",
          coordinates: {
            latitude: 39.1621,
            longitude: -119.7754
          }
        }
      ]
    }
  ]
};

const SearchMain: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<City[]>(data.cities);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<{ cityName: string; areaName: string }[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | null>(null);
  const [isDefaultView, setIsDefaultView] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Process search input
    if (searchTerm.trim() === "") {
      setFilteredData(data.cities);
      setSuggestions([]);
      setShowDropdown(false);
      setIsDefaultView(true);
      return;
    }

    setIsDefaultView(false);
    const lowercasedFilter = searchTerm.toLowerCase();
    
    // Generate suggestions
    const allAreas = data.cities.flatMap(city => 
      city.areas.map(area => ({
        cityName: city.name,
        areaName: area.name
      }))
    );

    const filteredSuggestions = allAreas.filter(({ cityName, areaName }) => 
      cityName.toLowerCase().includes(lowercasedFilter) || 
      areaName.toLowerCase().includes(lowercasedFilter)
    );

    setSuggestions(filteredSuggestions);
    setShowDropdown(filteredSuggestions.length > 0);

    // Filter data for map
    const filtered = data.cities.map(city => ({
      ...city,
      areas: city.areas.filter(area => 
        area.name.toLowerCase().includes(lowercasedFilter) || 
        city.name.toLowerCase().includes(lowercasedFilter)
      )
    })).filter(city => city.areas.length > 0);

    setFilteredData(filtered);
  }, [searchTerm]);

  const handleSelectSuggestion = (cityName: string, areaName: string) => {
    // Update search term
    setSearchTerm(`${areaName}, ${cityName}`);

    // Find the selected coordinates
    const selectedCity = data.cities.find(city => city.name === cityName);
    const selectedArea = selectedCity?.areas.find(area => area.name === areaName);

    if (selectedArea) {
      // Set coordinates for the map to focus on
      setSelectedCoordinates({...selectedArea.coordinates});
    }

    // Filter data for just this selection
    const filteredCity = selectedCity ? [{
      ...selectedCity,
      areas: selectedArea ? [selectedArea] : []
    }] : [];
    
    setFilteredData(filteredCity);
    setShowDropdown(false);
    setIsDefaultView(false);
  };
  
  const handleSearch = () => {
    // Execute search when button is clicked
    if (searchTerm.trim()) {
      // If there's only one suggestion, select it automatically
      if (suggestions.length === 1) {
        handleSelectSuggestion(suggestions[0].cityName, suggestions[0].areaName);
      }
      setShowDropdown(false);
    }
  };
  
  const handleBlur = () => {
    // Give time for the click to register before hiding dropdown
    setTimeout(() => setShowDropdown(false), 200);
  };

  const handleFocus = () => {
    // Show dropdown on focus if there are suggestions
    if (suggestions.length > 0) {
      setShowDropdown(true);
    }
  };

  const clearSearch = () => {
    // Reset all states
    setSearchTerm("");
    setFilteredData(data.cities);
    setSuggestions([]);
    setSelectedCoordinates(null);
    setIsDefaultView(true);
    setShowDropdown(false);
    
    // Focus the input field
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Clear search when backspace is pressed on an empty field
    if (e.key === 'Backspace' && searchTerm === '' && !isDefaultView) {
      clearSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // If the user manually clears the field, reset to default view
    if (value === '' && !isDefaultView) {
      clearSearch();
    }
  };

  return (
    <>
      <div className="container mx-auto my-4 px-4">
  <div className="flex flex-col lg:flex-row justify-between items-start">
    <div className="w-full lg:w-5/12 mb-4 lg:mb-0">
      <div className="flex flex-col justify-center">
      <Image src="https://bestfitnetwork.com/wp-content/uploads/2023/12/cropped-Bestfit-Network-Logo.webp" width={200} height={50} alt="Bestfit Network Logo" />
      <p className="mt-2">Your Interconnected Portal to Healthcare Communities</p>
      <h1 className="mb-3">Search The Best Senior Care Community</h1>
      </div>
      <div className="relative">
        <div className="flex mb-3">
          <input
            ref={searchInputRef}
            className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your zip code, city or location"
            aria-label="Enter your zip code, city or location"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button 
            className="px-4 py-2 border border-gray-300 border-l-0 rounded-r hover:bg-gray-100"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>
        
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute w-full bg-white border border-gray-300 rounded shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectSuggestion(suggestion.cityName, suggestion.areaName)}
              >
                {suggestion.areaName}, {suggestion.cityName}
              </div>
            ))}
          </div>
        )}
        
        {!isDefaultView && (
          <button 
            className="mt-2 text-blue-500 hover:text-blue-700"
            onClick={clearSearch}
          >
            Clear search and return to default view
          </button>
        )}
      </div>
    </div>
    <div className="w-full lg:w-6/12">
      <MapComponent 
        filteredData={filteredData} 
        selectedCoordinates={selectedCoordinates} 
        isDefaultView={isDefaultView}
      />
    </div>
  </div>
</div>
    </>
  );
}

export default SearchMain;
'use client';
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data.cities);
      setSuggestions([]);
      setShowDropdown(false);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = data.cities.map(city => ({
        ...city,
        areas: city.areas.filter(area => 
          area.name.toLowerCase().includes(lowercasedFilter) || 
          city.name.toLowerCase().includes(lowercasedFilter)
        )
      })).filter(city => city.areas.length > 0);

      setFilteredData(filtered);

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
    }
  }, [searchTerm]);

  
const handleSelectSuggestion = (cityName: string, areaName: string) => {
  setSearchTerm(`${areaName}, ${cityName}`);

  // Find the selected city's coordinates
  const selectedCity = data.cities.find(city => city.name === cityName);
  const selectedArea = selectedCity?.areas.find(area => area.name === areaName);

  if (selectedArea) {
    setSelectedCoordinates(selectedArea.coordinates); // Set coordinates for focusing
  }

  setSuggestions([]); // Clear suggestions
  setShowDropdown(false); // Close the dropdown
};
  
  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 150); // Small delay to allow dropdown selection
  };

  return (
    <>
      <Container className="my-4" fluid>
        <Row className="flex justify-between items-start px-4">
          <Col lg={5} className="search-container">
            <Image src="https://bestfitnetwork.com/wp-content/uploads/2023/12/cropped-Bestfit-Network-Logo.webp" width={200} height={50} />
            <p>Your Interconnected Portal to Healthcare Communities</p>
            <h1>Search The Best Senior Care Community</h1>
            <InputGroup className="my-2">
            <Form.Control
  placeholder="Enter your zip code, city or location"
  aria-label="Enter your zip code, city or location"
  aria-describedby="basic-addon2"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onFocus={() => setShowDropdown(suggestions.length > 0)}
  onBlur={handleBlur} // Updated onBlur handler
/>
              <Button variant="outline-secondary" id="button-addon2">
                <FaSearch />
              </Button>
            </InputGroup>
            {showDropdown && (
              <Dropdown.Menu show style={{ width: "100%" }}>
                {suggestions.map((suggestion, index) => (
                  <Dropdown.Item 
                    key={index} 
                    onClick={() => handleSelectSuggestion(suggestion.cityName, suggestion.areaName)}
                  >
                    {suggestion.areaName}, {suggestion.cityName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
          </Col>
          <Col lg={6} className="map-parent-container">
          <MapComponent filteredData={filteredData} selectedCoordinates={selectedCoordinates} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SearchMain;

"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { FaSearch, FaTimes } from "react-icons/fa";
import BrandLogo from "@/components/BrandLogo";

const MapComponent = dynamic(() => import("../MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[350px] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-400 backdrop-blur-md">
      <span className="animate-pulse text-sm font-medium">Loading map…</span>
    </div>
  ),
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

const data: { cities: City[] } = {
  cities: [
    {
      name: "Las Vegas",
      areas: [
        {
          name: "The Strip",
          coordinates: { latitude: 36.1147, longitude: -115.1728 },
        },
        {
          name: "Downtown Las Vegas",
          coordinates: { latitude: 36.1719, longitude: -115.144 },
        },
        {
          name: "Summerlin",
          coordinates: { latitude: 36.165, longitude: -115.3101 },
        },
      ],
    },
    {
      name: "Reno",
      areas: [
        {
          name: "Midtown",
          coordinates: { latitude: 39.5141, longitude: -119.8089 },
        },
        {
          name: "University District",
          coordinates: { latitude: 39.5452, longitude: -119.8166 },
        },
        {
          name: "Riverwalk District",
          coordinates: { latitude: 39.5273, longitude: -119.8135 },
        },
      ],
    },
    {
      name: "Carson City",
      areas: [
        {
          name: "Downtown Carson City",
          coordinates: { latitude: 39.1638, longitude: -119.7674 },
        },
        {
          name: "West Side Historic District",
          coordinates: { latitude: 39.1621, longitude: -119.7754 },
        },
      ],
    },
  ],
};

const SearchMain: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<City[]>(data.cities);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<
    { cityName: string; areaName: string }[]
  >([]);
  const [selectedCoordinates, setSelectedCoordinates] =
    useState<Coordinates | null>(null);
  const [isDefaultView, setIsDefaultView] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(data.cities);
      setSuggestions([]);
      setShowDropdown(false);
      setIsDefaultView(true);
      return;
    }

    setIsDefaultView(false);
    const lowercasedFilter = searchTerm.toLowerCase();

    const allAreas = data.cities.flatMap((city) =>
      city.areas.map((area) => ({
        cityName: city.name,
        areaName: area.name,
      }))
    );

    const filteredSuggestions = allAreas.filter(
      ({ cityName, areaName }) =>
        cityName.toLowerCase().includes(lowercasedFilter) ||
        areaName.toLowerCase().includes(lowercasedFilter)
    );

    setSuggestions(filteredSuggestions);
    setShowDropdown(filteredSuggestions.length > 0);

    const filtered = data.cities
      .map((city) => ({
        ...city,
        areas: city.areas.filter(
          (area) =>
            area.name.toLowerCase().includes(lowercasedFilter) ||
            city.name.toLowerCase().includes(lowercasedFilter)
        ),
      }))
      .filter((city) => city.areas.length > 0);

    setFilteredData(filtered);
  }, [searchTerm]);

  const handleSelectSuggestion = (cityName: string, areaName: string) => {
    setSearchTerm(`${areaName}, ${cityName}`);

    const selectedCity = data.cities.find((city) => city.name === cityName);
    const selectedArea = selectedCity?.areas.find(
      (area) => area.name === areaName
    );

    if (selectedArea) {
      setSelectedCoordinates({ ...selectedArea.coordinates });
    }

    const filteredCity = selectedCity
      ? [
          {
            ...selectedCity,
            areas: selectedArea ? [selectedArea] : [],
          },
        ]
      : [];

    setFilteredData(filteredCity);
    setShowDropdown(false);
    setIsDefaultView(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      if (suggestions.length === 1) {
        handleSelectSuggestion(
          suggestions[0].cityName,
          suggestions[0].areaName
        );
      }
      setShowDropdown(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowDropdown(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredData(data.cities);
    setSuggestions([]);
    setSelectedCoordinates(null);
    setIsDefaultView(true);
    setShowDropdown(false);

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Backspace" && searchTerm === "" && !isDefaultView) {
      clearSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "" && !isDefaultView) {
      clearSearch();
    }
  };

  return (
    <section className="section-pad pt-8 sm:pt-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12 lg:gap-10 lg:items-stretch">
        {/* Search column — asymmetric bento */}
        <div className="flex flex-col justify-center gap-8 lg:col-span-5">
          <div className="space-y-4">
            <BrandLogo size="lg" href="" />
            <p className="label-muted text-sm sm:text-base">
              Your Interconnected Portal to Healthcare Communities
            </p>
            <h1 className="title-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Search The Best Senior Care Community
            </h1>
          </div>

          <div className="relative">
            <div className="glass-strong flex overflow-hidden rounded-2xl p-1.5">
              <input
                ref={searchInputRef}
                className="input-premium min-w-0 flex-1 border-0 bg-transparent shadow-none focus:ring-0 focus:bg-transparent"
                placeholder="Enter zip code, city or location"
                aria-label="Enter your zip code, city or location"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                type="button"
                className="flex min-h-touch min-w-touch shrink-0 items-center justify-center rounded-xl bg-accent text-surface transition-all duration-200 ease-in-out hover:bg-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-[0.98]"
                onClick={handleSearch}
                aria-label="Search"
              >
                <FaSearch size={16} />
              </button>
            </div>

            {showDropdown && suggestions.length > 0 && (
              <ul
                className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-raised/95 py-2 shadow-glass-lg backdrop-blur-md"
                role="listbox"
              >
                {suggestions.map((suggestion, index) => (
                  <li key={`${suggestion.areaName}-${suggestion.cityName}`}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={false}
                      className="flex min-h-touch w-full items-center px-4 py-3 text-left text-sm text-slate-200 transition-all duration-200 ease-in-out hover:bg-accent/10 hover:text-accent"
                      onClick={() =>
                        handleSelectSuggestion(
                          suggestion.cityName,
                          suggestion.areaName
                        )
                      }
                    >
                      <span className="font-medium">{suggestion.areaName}</span>
                      <span className="ml-2 text-slate-500">
                        {suggestion.cityName}
                      </span>
                    </button>
                    {index < suggestions.length - 1 && (
                      <div className="mx-4 border-t border-white/5" />
                    )}
                  </li>
                ))}
              </ul>
            )}

            {!isDefaultView && (
              <button
                type="button"
                className="mt-3 inline-flex min-h-touch items-center gap-2 text-sm font-medium text-slate-400 transition-colors duration-200 ease-in-out hover:text-accent"
                onClick={clearSearch}
              >
                <FaTimes size={12} />
                Clear search and return to default view
              </button>
            )}
          </div>
        </div>

        {/* Map — larger bento panel */}
        <div className="lg:col-span-7">
          <div className="glass-strong overflow-hidden rounded-2xl p-2 sm:p-3">
            <div className="overflow-hidden rounded-xl">
              <MapComponent
                filteredData={filteredData}
                selectedCoordinates={selectedCoordinates}
                isDefaultView={isDefaultView}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchMain;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Commercial() {
  const [commercialProperties, setCommercialProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [areaType, setAreaType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommercialProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/properties/commercial");
        if (!response.ok) {
          throw new Error("Failed to fetch commercial properties");
        }
        const data = await response.json();
        setCommercialProperties(data);
      } catch (error) {
        console.error("Error fetching commercial properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommercialProperties();
  }, []);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (searchInput.trim()) queryParams.append("query", searchInput);
    if (areaType) queryParams.append("area", areaType);
    if (propertyType) queryParams.append("type", propertyType);

    if (queryParams.toString()) {
      navigate(`/search-commercial?${queryParams.toString()}`);
    } else {
      alert("Please enter a search term or select a property type.");
    }
  };

  const propertyCounts = commercialProperties.reduce((acc, property) => {
    acc[property.subCategory] = (acc[property.subCategory] || 0) + 1;
    return acc;
  }, {});

  const propertyFilters = Object.entries(propertyCounts).map(([subCategory, count]) => [
    subCategory,
    count,
  ]);

  propertyFilters.unshift(["All", commercialProperties.length]);

  const filteredProperties =
    selectedType === "All"
      ? commercialProperties
      : commercialProperties.filter((property) => property.subCategory === selectedType);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full lg:h-[60vh] sm:h-[100vh]">
        <video
          loop
          autoPlay
          muted
          className="w-full h-[50vh] sm:h-full object-cover"
          src="/excel-properties-dubai.webm"
          alt=""
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-xl lg:text-3xl font-bold">
              Discover Luxurious Commercial Properties in Dubai
            </h1>
            <h4>{loading ? "Loading..." : `${commercialProperties.length} properties available`}</h4>

            {/* Search Bar */}
            <div className="search-container mt-5 lg:mt-10 bg-white/30 backdrop-blur-md rounded-lg p-4 w-[90%] max-w-[800px] mx-auto shadow-md">
              <div className="flex flex-wrap gap-3 items-center justify-center">
                <input
                  className="w-full lg:w-1/3 px-4 py-2 border rounded bg-transparent text-white"
                  type="text"
                  placeholder="Search Commercial Properties"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <select
                  className="w-full lg:w-1/4 px-4 py-2 border rounded bg-transparent text-white"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option className="text-zinc-800" value="">Property Type</option>
                  <option className="text-zinc-800" value="Shop">Shop</option>
                  <option className="text-zinc-800" value="Studio">Studio</option>
                </select>
                <select
                  className="w-full lg:w-1/4 px-4 py-2 border rounded bg-transparent text-white"
                  value={areaType}
                  onChange={(e) => setAreaType(e.target.value)}
                >
                  <option  className="text-zinc-800" value="">Select Area</option>
                  <option className="text-zinc-800" value={500}>500</option>
                  <option className="text-zinc-800" value={1000}>1000</option>
                  <option className="text-zinc-800" value={1500}>1500</option>
                  <option className="text-zinc-800" value={2000}>2000</option>
                  <option className="text-zinc-800" value={3000}>3000</option>
                </select>
                <button
                  className="w-full lg:w-1/4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Filter by Property Types</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {propertyFilters.map(([subCategory, count]) => (
            <button
              key={subCategory}
              className={`px-4 py-2 rounded-lg border ${
                selectedType === subCategory
                  ? "bg-teal-500 text-white"
                  : "bg-white text-gray-700"
              } hover:bg-teal-500 hover:text-white transition`}
              onClick={() => setSelectedType(subCategory)}
            >
              {subCategory === "All" ? "🏢 All Properties" : subCategory} ({count})
            </button>
          ))}
        </div>
      </section>

      {/* Filtered Properties Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Commercial Properties</h2>
        {loading ? (
          <p>Loading properties...</p>
        ) : filteredProperties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white shadow-md rounded-lg overflow-hidden relative group"
              >
                {property.featured && (
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full z-10">
                    Featured
                  </span>
                )}
                <div className="relative">
                  <img
                    src={property.image || "default-image-url.jpg"}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-teal-600 opacity-0 group-hover:opacity-50 transition duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <Link
                      to={`/property/${property._id}`}
                      state={{ property }}
                      className="mt-4 inline-block bg-teal-500 text-white px-4 py-2 rounded text-sm"
                    >
                      View Property
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                  <div className="text-sm text-gray-800 mb-4">
                    <p>Location: {property.location || "Not specified"}</p>
                    <p>Area: {property.area || "N/A"} sqft</p>
                    <p>Price: {property.price || "Contact for price"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Commercial;

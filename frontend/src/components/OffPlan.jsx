import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

function HomePage() {
  const [offplanProperties, setOffplanProperties] = useState([]); // Offplan properties state
  const [loading, setLoading] = useState(true); // Loading state
  // const [selectedType, setSelectedType] = useState("All"); // Selected type filter
  const [selectedType, setSelectedType] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [areaType, setAreaType] = useState("");
  const navigate = useNavigate();


  // Fetch Offplan Properties
  useEffect(() => {
    const fetchOffplanProperties = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("http://localhost:3000/api/properties/off-plan"); // API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch offplan properties");
        }
        const data = await response.json();
        setOffplanProperties(data); // Update offplanProperties state
      } catch (error) {
        console.error("Error fetching offplan properties:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOffplanProperties();
  }, []); // Runs only on component mount

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (searchInput.trim()) queryParams.append("query", searchInput);
    if (areaType) queryParams.append("area", areaType);
    if (propertyType) queryParams.append("type", propertyType);

    if (queryParams.toString()) {
      navigate(`/search-off-plan?${queryParams.toString()}`);
    } else {
      alert("Please enter a search term or select a property type.");
    }
  };

  // Calculate dynamic counts of each property type
  const propertyCounts = offplanProperties.reduce((acc, property) => {
    acc[property.subCategory] = (acc[property.subCategory] || 0) + 1;
    return acc;
  }, {});

  // Convert counts to filter format
  const propertyFilters = Object.entries(propertyCounts).map(([subCategory, count]) => [
    subCategory,
    count,
  ]);

  // Add "All Properties" to the beginning of the filters
  propertyFilters.unshift(["All", offplanProperties.length]);

  // Filter properties based on selected type
  const filteredProperties =
    selectedType === "All"
      ? offplanProperties
      : offplanProperties.filter((property) => property.subCategory === selectedType);

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full h-[70vh] relative lg:h-[70vh] lg:mt-[0vw] sm:h-[100vh]">
        <video
          loop
          autoPlay
          muted
          className="relative z-0 w-full h-[70vh] sm:h-full object-cover object-center"
          src="/excel-properties-dubai.webm"
          alt=""
        />
        <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 text-center text-white flex items-center justify-center">
          <div className="w-full absolute items-center top-0 lg:top-28 lg:mt-0 mt-[20vh]">
            <h1 id="typewriter" className="mt-1 text-xl lg:text-3xl font-bold">
              Discover Luxurious Offplan Properties in Dubai
            </h1>
            <h4>{loading ? "Loading..." : `${offplanProperties.length} properties available`}</h4>
          </div> 
          <div className="search-container w-[100vw] mt-[10vh] h-[25vh] backdrop-blur-sm bg-white/20 rounded-lg lg:w-[90%] lg:max-w-[900px] mx-auto shadow-md z-10 sm:w-[60%] sm:h-[auto] p-1 lg:p-6">
          {/* Tabs */}
          <div className="tabs space-x-2 lg:space-x-3 sm:justify-start gap-3 sm:gap-5 mb-5">
            <Link
              className="tab-btn text-white bg-transparent border border-gray-300 py-2 px-3 sm:px-3 text-sm sm:text-base rounded cursor-pointer transition-all hover:bg-gray-200 active:bg-black active:text-white"
              to="/residential-properties"
            >
              Residential
            </Link>
            <Link
              className="tab-btn bg-transparent border border-gray-300 py-2 px-4 sm:px-5 text-sm sm:text-base rounded cursor-pointer text-white transition-all hover:bg-gray-200 active:bg-black active:text-white"
              to="/off-plan"
            >
              Off Plan
            </Link>
            <Link
              className="tab-btn bg-transparent border border-gray-300 py-2 px-4 sm:px-5 text-sm sm:text-base rounded cursor-pointer text-white transition-all hover:bg-gray-200 active:bg-black active:text-white"
              to="/commercial"
            >
              Commercial
            </Link>
          </div>

          {/* Search Bar */}
          <div className="search-bar flex flex-wrap gap-3 sm:gap-4 items-center justify-center bg-transparent">
            {/* Buy/Rent Dropdown */}
           

            {/* Keyword Search */}
            <input
              className="srch py-2.5 w-[45vw] lg:text-center sm:w-[40%] p-2 border bg-transparent border-gray-300 rounded text-sm sm:text-base"
              type="text"
              placeholder="Search Offplan Properties"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            {/* Property Type Dropdown */}
            <select className="dropdown w-[45vw] bg-transparent sm:w-[20%] border p-2 rounded"
             value={propertyType}
             onChange={(e) => setPropertyType(e.target.value)}
            >
             <option className="text-zinc-800" value="">Property Type</option>
                  <option className="text-zinc-800" value="Palace">Palace</option>
                  <option className="text-zinc-800" value="Plot">Plot</option>
            </select>

            {/* Bedroom Dropdown
            <select className="dropdown w-[45vw] bg-transparent sm:w-[20%] border p-2 rounded">
              <option className="text-zinc-900" >Bedroom</option>
              <option className="text-zinc-900" >Studio</option>
              <option className="text-zinc-900" >1 Bedroom</option>
              <option className="text-zinc-900" >2 Bedrooms</option>
              <option className="text-zinc-900" >3 Bedrooms</option>
              <option className="text-zinc-900" >4 Bedrooms</option>
              <option className="text-zinc-900" >5 Bedrooms</option>
              <option className="text-zinc-900" >6 Bedrooms</option>
              <option className="text-zinc-900" >7+ Bedrooms</option>
            </select> */}

            {/* Area Dropdown */}
            <select className="dropdown w-[45vw] bg-transparent sm:w-[15%] border p-2 rounded"
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

            {/* Buttons */}
            <div className="w-full sm:w-auto flex items-center justify-evenly gap-2 mt-3 sm:mt-0">
              <button className="reset-btn w-[45vw] sm:w-auto bg-gray-200 text-black border border-gray-300 px-4 py-2 rounded transition hover:bg-gray-300">
                ↻
              </button>
              <button className="search-btn w-[45vw] sm:w-auto bg-black text-white px-4 py-2 rounded transition hover:bg-gray-800"   onClick={handleSearch}>
                🔍 Search
              </button>
            </div>
          </div>
        </div>

        </div>
      </div>

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-zinc-800">Filter by Property Types</h2>
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
        <h2 className="text-2xl font-bold text-zinc-800 mb-4">Available Offplan Properties</h2>
        {loading ? (
          <p>Loading properties...</p>
        ) : filteredProperties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property._id} // Use _id from the database
                className="bg-white shadow-md rounded-lg overflow-hidden relative group"
              >
                {property.featured && (
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full z-10">
                    Featured
                  </span>
                )}
                <div className="relative">
                  <img
                    src={property.image || "default-image-url.jpg"} // Use default image if not provided
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
                  <div className="flex justify-between text-sm text-gray-800 mb-4">
                    <div>
                      <span className="block font-semibold">Location</span>
                      <div className="flex items-center">
                        <i className="ri-map-pin-5-fill text-red-600 mr-2"></i>
                        {property.location || "Not specified"}
                      </div>
                    </div>
                    <div>
                      <span className="block font-semibold">Bedrooms</span>
                      <div className="flex items-center">
                        <i className="fas fa-th-large text-gray-500 mr-2"></i>
                        {property.bedrooms || "N/A"}
                      </div>
                    </div>
                    <div>
                      <span className="block font-semibold">Area</span>
                      <div className="flex items-center">
                        <i className="fas fa-vector-square text-gray-500 mr-2"></i>
                        {property.area || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-500">For Sale</span>
                    <span className="text-lg font-bold text-teal-500">
                      {property.price || "Contact for price"}
                    </span>
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

export default HomePage;

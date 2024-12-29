import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import SearchResults from "./SearchResults";

const SearchResidential = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  // Extract query parameters
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const type = searchParams.get("type");
  const bedrooms = searchParams.get("bedrooms");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
            `http://localhost:3000/api/properties/residential/search?${searchParams.toString()}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, type ,bedrooms }), // Send both query and type
        });

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        setSearchResults(data); // Store results in state
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [query, type,bedrooms]);

  return (
    <div className="p-10">
      <div>
        <h1 className="text-2xl font-bold mt-[10vh]">Here are the properties you are Looking for</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[10vh]">
        {searchResults.length > 0 ? (
          searchResults.map((property) => (
            <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden relative group">
              {property.featured && (
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full z-10">
                  Featured
                </span>
              )}
              <div className="relative">
                <img
                  src={property.Images && property.Images[0] ? property.Images[0] : "/public/default-image.jpg"}
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
                      {property.location}
                    </div>
                  </div>
                  <div>
                    <span className="block font-semibold">Bedrooms</span>
                    <div className="flex items-center">
                      <i className="fas fa-th-large text-gray-500 mr-2"></i>
                      {property.bedrooms}
                    </div>
                  </div>
                  <div>
                    <span className="block font-semibold">Area</span>
                    <div className="flex items-center">
                      <i className="fas fa-vector-square text-gray-500 mr-2"></i>
                      {property.area} sqft
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-500">For Sale</span>
                  <span className="text-lg font-bold text-teal-500">{property.price}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResidential;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blogs/${id}`); // Backend endpoint for a specific blog
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-[15vh]">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Blog Detail
        </h1>
        <p className="text-center text-gray-500">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-[15vh]">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Blog Detail
        </h1>
        <p className="text-center text-gray-500">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-[15vh]">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">{blog.title}</h1>
      {blog.images &&
        blog.images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:3000${image}`}
            alt={blog.title}
            className="w-full mb-4 rounded-lg"
          />
        ))}
      <div dangerouslySetInnerHTML={{ __html: blog.content }}></div> {/* Render HTML content */}
    </div>
  );
};

export default BlogDetails;

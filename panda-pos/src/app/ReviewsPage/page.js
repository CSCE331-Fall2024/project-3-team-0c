"use client";

import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./Reviews.modules.css";

const Page = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [reviews, setReviews] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newReview, setNewReview] = useState({ rating: "", review_text: "" });

  // Fetch reviews and extract menu items
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:8080/ReviewsLoad"); // Call your backend API
        if (response.ok) {
          const data = await response.json();
          setReviews(data);

          // Extract unique menu items from the reviews
          const uniqueMenuItems = Array.from(
            new Set(data.map((review) => review.menu_item))
          );
          setMenuItems(uniqueMenuItems);

          // Set default selected item to the first menu item
          if (uniqueMenuItems.length > 0) {
            setSelectedItem(uniqueMenuItems[0]);
          }
        } else {
          console.error("Failed to fetch reviews.");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []); // Runs once on component mount

  // const handleAddReview = async () => {
  //   const { rating, review_text } = newReview;

  //   // Validate inputs
  //   if (!rating || !review_text.trim()) {
  //     alert("Please provide a valid rating and review text.");
  //     return;
  //   }

  //   try {
  //     // Make an API call to add the review
  //     const response = await fetch("http://localhost:8080/addReview", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         rating: parseInt(rating, 10),
  //         review_text,
  //         menu_item: selectedItem,
  //       }),
  //     });

  //     const result = await response.json();

  //     if (response.ok && result.success) {
  //       // Update the local state to include the new review
  //       const newReviewId = reviews.length + 1;
  //       setReviews([
  //         ...reviews,
  //         { review_id: newReviewId, rating: parseInt(rating, 10), review_text, menu_item: selectedItem },
  //       ]);
  //       setNewReview({ rating: "", review_text: "" });
  //       alert("Review added successfully!");
  //     } else {
  //       console.error(result.message || "Failed to add review.");
  //       alert(result.message || "Failed to add review.");
  //     }
  //   } catch (error) {
  //     console.error("Error adding review:", error);
  //     alert("An error occurred while adding the review.");
  //   }
  // };

  const handleAddReview = async () => {
    const { rating, review_text } = newReview;

    // Validate inputs
    if (!rating || !review_text.trim()) {
        alert("Please provide a valid rating and review text.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/addReview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                rating: parseInt(rating, 10),
                review_text,
                menu_item: selectedItem,
            }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Update the local state to include the new review
            const newReviewId = reviews.length + 1;
            setReviews([
                ...reviews,
                { review_id: newReviewId, rating: parseInt(rating, 10), review_text, menu_item: selectedItem },
            ]);
            setNewReview({ rating: "", review_text: "" });
            alert("Review added successfully!");
        } else {
            console.error(result.message || "Failed to add review.");
            alert(result.message || "Failed to add review.");
        }
    } catch (error) {
        console.error("Error adding review:", error);
        alert("An error occurred while adding the review.");
    }
  };

  const filteredReviewsaverage = reviews.filter(
    (review) => review.menu_item == selectedItem
  );

  const filteredReviews = reviews
    .filter((review) => review.menu_item === selectedItem)
    .filter((review) => review.review_text && review.review_text.trim());

  const averageRating = filteredReviews.length
    ? (
        filteredReviewsaverage.reduce((sum, review) => sum + parseFloat(review.rating), 0) /
        filteredReviewsaverage.length
      ).toFixed(1) // Round to 1 decimal place
    : null;

  return (
    <div className="container">
      <h1 className="header">Menu Item Reviews</h1>
      <select
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
        className="dropdown"
      >
        {menuItems.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {averageRating !== null && (
        <div className="averageRating">
          <h2>Average Rating: {averageRating} ⭐</h2>
        </div>
      )}

      <div className="reviewsContainer">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.review_id} className="reviewCard">
              <h3 className="menuItem">{review.menu_item}</h3>
              <p className="rating">Rating: {review.rating} ⭐</p>
              <p className="text">{review.review_text}</p>
            </div>
          ))
        ) : (
          <p className="noReviews">No reviews for this item yet!</p>
        )}
      </div>

      <div className="formContainer">
        <h2 className="formHeader">Add a Review</h2>
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          className="input"
        />
        <textarea
          placeholder="Write your review here..."
          value={newReview.review_text}
          onChange={(e) =>
            setNewReview({ ...newReview, review_text: e.target.value })
          }
          className="textarea"
        />
        <button onClick={handleAddReview} className="button">
          Submit
        </button>

      </div>
    </div>
  );
};

export default Page;

import React, { useState } from "react";
import axios from "axios";

const usePost = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const post = async (newPost) => {
    setIsPending(true);
    setError(null);
    try {
      const response = await axios.post(url, newPost);
      setData(response.data);
    } catch (err) {
      setError("Failed to post data.");
    } finally {
      setIsPending(false);
    }
  };

  return { post, data, isPending, error };
};

const PostingData = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showForm, setShowForm] = useState(true);

  const { post, data, isPending, error } = usePost("http://localhost:3000/posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    post({
      title,
      body,
      userId: 1, 
    });
    setShowForm(false);
  };

  const handleGoBack = () => {
    setTitle("");
    setBody("");
    setShowForm(true);
  };

  return (
    <div style={{ padding: "1rem" }}>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isPending}>
            {isPending ? "Posting..." : "Submit"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      ) : (
        <div>
          <h2>Post Submitted!</h2>
          {data && (
            <>
              <p><strong>ID:</strong> {data.id}</p>
              <p><strong>Title:</strong> {data.title}</p>
              <p><strong>Body:</strong> {data.body}</p>
            </>
          )}
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default PostingData;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FitnessData = () => {
  const [fitnessList, setFitnessList] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        // If no token return
        return;
      }

      const response = await fetch("/api/fitness", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setFitnessList(json);
      } else {
        // Handle error
      }
    };
    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    if (!token) {
      // Handle the case where the user is not logged in
      return;
    }

    const response = await fetch(`/api/fitness/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setFitnessList(fitnessList.filter((fitness) => fitness.id !== id));
    } else {
      console.log("error", id);
    }
    navigate("/");
  };

  // This is the return statement
  return (
    <div>
      <ul className="fitnesslist">
        {fitnessList.map((fitness) => (
          <li key={fitness._id}>
            <strong>Title:</strong> {fitness.title}
            <br />
            <strong>Date:</strong> {fitness.date}
            <br />
            <strong>Calories Burned:</strong> {fitness.caloriesBurned}
            <br />
            <strong>Duration:</strong> {fitness.duration}
            <br />
            <button onClick={() => handleDelete(fitness._id)}>Delete</button>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessData;

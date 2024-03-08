// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const fitnessDelete = (id) =>  async () => {
    await fetch(`/api/fitness/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

const FitnessDetails = ({ fitness }) => {
  return (
    <div className="fitness-details">
      <h4>{fitness.title}</h4>
      <p>
        {formatDistanceToNow(new Date(fitness.date), { addSuffix: true })}
      </p>
      <p>Duration: {fitness.duration}</p>
      <p>Calories Burned: {fitness.caloriesBurned}</p>
      <span className="material-symbols-outlined" onClick={()=>{fitnessDelete(fitness._id)}}>delete</span>
    </div>
  );
};

export default FitnessDetails;
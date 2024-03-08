import FitnessForm from "../components/FitnessForm";
import FitnessData from "../components/FitnessData";

const Home = () => {
  return (
    <div className="home">
      <div className="fitness_">
        <h1>Fitness Tracker</h1>
      </div>
      <div className="fitness">
        <FitnessData />
        <FitnessForm />
      </div>
    </div>
  );
}; 

export default Home;
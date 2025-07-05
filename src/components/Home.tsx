import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>CvFlows</h1>
      <h3>
        Creates, modify and distribute your cv in a graph-like dynamic interface
      </h3>
      <Link to="/edit">Go to Edit Document View</Link>
    </div>
  );
};

export default Home;

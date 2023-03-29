import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Messenger from '../pages/messenger';

const MessengerRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Messenger />} />
      </Routes>
    </Router>
  );
};

export default MessengerRouter;

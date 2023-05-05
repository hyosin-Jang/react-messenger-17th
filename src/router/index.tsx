import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Friends from '../pages/friends';
import ChatRooms from '../pages/chatRooms';
import Messenger from '../pages/messenger';
import OnBoarding from '../pages/onBoarding';

const MessengerRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chats" element={<ChatRooms />} />
        <Route path="/chats/:roomId" element={<Messenger />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/" element={<OnBoarding />} />
      </Routes>
    </Router>
  );
};

export default MessengerRouter;

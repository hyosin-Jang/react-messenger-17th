import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Friends from 'pages/friends';
import ChatRooms from 'pages/chatRooms';
import Messenger from 'pages/messenger';
import OnBoarding from 'pages/onBoarding';
import Settings from 'pages/settings';

const MessengerRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/chats" element={<ChatRooms />} />
        <Route path="/chats/:roomId" element={<Messenger />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default MessengerRouter;

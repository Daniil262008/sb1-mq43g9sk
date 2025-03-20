import React, { useState } from 'react';
import { UserPlus, UserMinus, UserCog } from 'lucide-react';

interface QueueUser {
  id: string;
  position: number;
  joinedAt: Date;
}

function App() {
  const [queue, setQueue] = useState<QueueUser[]>([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const addToQueue = () => {
    const newUser: QueueUser = {
      id: Math.random().toString(36).substring(7),
      position: queue.length + 1,
      joinedAt: new Date(),
    };
    setQueue([...queue, newUser]);
  };

  const removeFromQueue = () => {
    if (queue.length > 0) {
      const updatedQueue = queue.slice(1).map((user, index) => ({
        ...user,
        position: index + 1,
      }));
      setQueue(updatedQueue);
    }
  };

  const formatWaitTime = (date: Date) => {
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    return `${minutes} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="https://images.unsplash.com/photo-1561758033-7e924f619b47?w=128&h=128&fit=crop" 
              alt="Restaurant logo" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <h1 className="text-2xl font-bold text-red-600">FastQueue</h1>
          </div>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <UserCog size={20} />
            <span>Register</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Queue Status */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Current Queue</h2>
            <p className="text-gray-600 mt-2">
              {queue.length} {queue.length === 1 ? 'person' : 'people'} in line
            </p>
          </div>

          {/* Queue Actions */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={addToQueue}
              className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              <UserPlus size={24} />
              <span>Join Queue</span>
            </button>
            <button
              onClick={removeFromQueue}
              className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              <UserMinus size={24} />
              <span>Leave Queue</span>
            </button>
          </div>

          {/* Queue List */}
          <div className="space-y-4">
            {queue.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full font-bold">
                    {user.position}
                  </span>
                  <span className="text-gray-700">Customer #{user.id}</span>
                </div>
                <span className="text-gray-500">
                  Waiting: {formatWaitTime(user.joinedAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Register Account</h3>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
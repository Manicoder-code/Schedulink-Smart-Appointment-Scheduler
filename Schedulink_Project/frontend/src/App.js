import React from 'react';
import CreateUserForm from './components/CreateUserForm';
import CreateSlotForm from './components/CreateSlotForm';
import SlotList from './components/SlotList';
import UserList from './components/UserList';

function App() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Schedulink – Smart Appointment Scheduler</h1>
      <CreateUserForm />
      <UserList />
      <CreateSlotForm />
      <SlotList />
    </div>
  );
}

export default App;


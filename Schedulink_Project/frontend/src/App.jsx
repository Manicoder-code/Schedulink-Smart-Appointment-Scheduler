import CreateUserForm from "./components/CreateUserForm";
import UserList from "./components/UserList";
import CreateSlotForm from "./components/CreateSlotForm";
import SlotList from "./components/SlotList";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Schedulink Frontend</h1>
      <CreateUserForm />
      <UserList />
      <CreateSlotForm />
      <SlotList />
    </div>
  );
}

export default App;


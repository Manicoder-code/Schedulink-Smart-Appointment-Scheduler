import React from "react";
import SlotPicker from "./components/SlotPicker";

function App() {
  const [slots, setSlots] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8000/slots/")
      .then(res => res.json())
      .then(data => setSlots(data));
  }, []);

  const handleSelect = (slot) => {
    alert(`You selected slot from ${slot.start_time}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Schedulink</h1>
      <SlotPicker slots={slots} onSelect={handleSelect} />
    </div>
  );
}

export default App;

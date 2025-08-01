import { useEffect, useState } from "react";

function SlotList() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/slots`);
        const data = await response.json();
        setSlots(data);
      } catch (error) {
        console.error("Failed to fetch slots", error);
      }
    };

    fetchSlots();
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">All Slots</h2>
      {slots.length === 0 ? (
        <p>No slots found.</p>
      ) : (
        <ul className="space-y-2">
          {slots.map((slot) => (
            <li key={slot.id} className="border p-2 rounded">
              <div>User ID: {slot.user_id}</div>
              <div>Start: {slot.start_time}</div>
              <div>End: {slot.end_time}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SlotList;


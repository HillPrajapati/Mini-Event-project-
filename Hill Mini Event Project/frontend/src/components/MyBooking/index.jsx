// src/components/MyBookings.jsx
import { useEffect, useState } from 'react';
import API from '../../api';
import './MyBookings.css'; 
import Loader from '../Loder';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    API.get('/bookings/my')
      .then(res => {
        setBookings(res.data);
      })
      .catch(error => {
        alert('Failed to fetch bookings');
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, []);

  const cancel = async (eventId) => {
    await API.post('/bookings/cancel', { eventId });
    setBookings(bookings.filter(b => b.event._id !== eventId));
  };

  return (
    <div className="my-bookings-container">
      {isLoading && <Loader />} 
      <h2 className="my-bookings-heading">My Bookings</h2>
      <div className="booking-list">
        {bookings.map(b => (
          <div className="booking-card" key={b._id}>
            <p className="booking-event-name">{b.event.name}</p>
            <p className="booking-event-date">{b.event.date}</p>
            <button className="cancel-button" onClick={() => cancel(b.event._id)}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
}

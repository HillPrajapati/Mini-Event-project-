// src/components/Events.jsx
import { useEffect, useState } from 'react';
import API from '../../api';
import './Events.css'; 
import Loader from '../Loder';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    setIsLoading(true); 
    API.get('/bookings/allEvents')
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        alert('Failed to fetch events');
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, []);

  const book = async (eventId) => {
    try {
      await API.post('/bookings/book', { eventId });
      alert('Booked successfully');
      API.get('/bookings/allEvents')
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        alert('Failed to fetch events');
      })
      .finally(() => {
        setIsLoading(false); 
      });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="events-container">
      {isLoading && <Loader />}
      <h2 className="events-heading">Available Events</h2>
      <div className="event-list">
        {events.map(event => (
          <div className="event-card" key={event._id}>
            <p className="event-name">{event.name}</p>
            <p className="event-seats">{event.availableSeats} seats available</p>
            <button className="event-button" onClick={() => book(event._id)}>Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}

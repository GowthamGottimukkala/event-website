import React, { useEffect, useState } from 'react';
// import './MyCreatedEvents.css';
import PageHeader from '../../components/PageHeader/PageHeader';
import EventCard from '../../components/EventCard/EventCard';
import * as eventAPI from '../../services/events-api';

function MyCreatedEvents(props) {

    // set initial state
    const [events, setEvents] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            // get all events from back-end api
            const results = await eventAPI.getAll();

            if(results.err) {
                // replace page if error retrieving event data
                results.err && props.history.replace('/');
            } else {

                // filter out events that user has not rsvp'd to
                const res = results.filter(event => {
                    
                    return event.user == props.user._id;
                });

                // set state
                setEvents(res);
                setIsLoaded(true);
            }
        }
        fetchData();
    }, [ props.history, props.user._id ]);

    return (
        <div className='MyCreatedEvents'>

            <PageHeader />

            <div className='container py-3'>
                {isLoaded ? (
                    <>
                        <h1 className="event-name">
                            <span>My Created Events</span>
                        </h1>

                        <div className="row">
                            {events.map((event, idx) => {
                                return (
                                    <div className="col-md-6 col-lg-4">
                                        <EventCard event={event} idx={idx} />
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <>Loading...</>
                )}
            </div>

        </div>
    );
} 

export default MyCreatedEvents;
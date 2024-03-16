import './timeline.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Timeline = ({ events, categories, setEvents, setCategories}) => {

    //wyświetlanie konkretnych kategorii
    function filterSelection(c) {
        var x, i;
        x = document.getElementsByClassName("filterDiv");
        if (c == "all") c = "";
        for (i = 0; i < x.length; i++) {
          w3AddClass(x[i], "d-none");
          if (x[i].className.indexOf(c) > -1) w3RemoveClass(x[i], "d-none");
        }
      }
      
    function w3AddClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
          if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
        }
      }
      
    function w3RemoveClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
          while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);     
          }
        }
        element.className = arr1.join(" ");
      }

    //sortowanie wydarzeń wedug daty
    const sortedEvents = events.slice().sort((a, b) => new Date(a.start_date) - new Date(b.start_date));   

    const [selectedEvent, setSelectedEvent] = useState(null);

    //obługa kliknięcia w wydarzenie
    const handleEventClick = (event) => {
      setSelectedEvent(event);
    };
  
    const handleClose = () => {
      setSelectedEvent(null);
    };
    
    //usuwanie wydarzenia
    const deleteEvent = () => {
        const updatedEvents = events.filter((event) => event.id !== selectedEvent.id);
        setEvents(updatedEvents);
        Cookies.remove(`eventsCookie_event_${selectedEvent.id}`)
        handleClose();
      };
  
    //nawigacja do strony edycji wydarzenia
    const navigate = useNavigate();

    const handleEdit = (selectedEvent) => {
        navigate("/ModifyEvent", {state: {selectedEvent: selectedEvent}});
    };

    return(
        <section class="gradient-custom-5">
            <div class="container">
                <div id="myBtnContainer" class="center">
                    <button 
                        type="button" 
                        style={{background: '#000000'}}
                        class="btn btn-varying btn-outline-secondary"
                        onClick={() => filterSelection('all')}>
                            Wszystkie
                    </button>
                    {categories.map((category) => (     
                        <button 
                            key={category.id}
                            type="button" 
                            style={{background: category.color}} 
                            class="btn btn-varying btn-outline-secondary"
                            onClick={() => filterSelection(category.name)}>
                                { category.name }
                        </button>
                    ))}
                </div>
            </div>
            <div class="container py-5">
                <div class="main-timeline-5">
                    {sortedEvents.map((event) => {
                        const category = categories.find((cat) => cat.id === event.category_id);                     
                        return (
                            <div key={event.id} class={"timeline-5 right-5 filterDiv get-det " + category.name} onClick={() => handleEventClick(event)}>
                                <div class="card">
                                    <div class="card-body p-4">
                                        <h5>{ event.name }</h5>
                                        <span class="small text-muted"><i class="fas fa-clock me-1"></i>{event.start_date}</span>
                                        <p class="mt-2 mb-2 max-lines">{event.description}</p>
                                        <button 
                                            type="button" 
                                            style={{background: category.color }} 
                                            class="btn btn-varying btn-secondary" 
                                            disabled>
                                                { category.name }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {selectedEvent && (
                    <Modal show={true} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedEvent.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 class="content">Od {selectedEvent.start_date} do {selectedEvent.end_date}</h5>
			            <div class="content">
                            <p>{selectedEvent.description}</p>
                            <img class="mb-1-6 rounded" src={selectedEvent.image} alt={selectedEvent.name}></img>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" class="btn btn-danger" onClick={deleteEvent}>Usuń</button>
                        <button type="button" class="btn btn-warning" onClick={() => handleEdit(selectedEvent)}>Edytuj</button>
                        <Button class="btn btn-primary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                    </Modal>
                )}
            </div>
        </section>
    )
}

export default Timeline;
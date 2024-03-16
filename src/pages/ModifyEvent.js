import { useLocation } from "react-router-dom";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ModifyEvent = ({events, categories, setEvents}) => {
  const location = useLocation()
  const {selectedEvent} = location.state;

  const [formData, setFormData] = useState({
    id: selectedEvent.id,
    name: selectedEvent.name,
    description: selectedEvent.description,
    image: selectedEvent.image,
    start_date: selectedEvent.start_date,
    end_date: selectedEvent.end_date,
    category_id: selectedEvent.category_id,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const eventIndex = events.findIndex((event) => event.id === formData.id);
    if (eventIndex !== -1) {
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents];
        updatedEvents[eventIndex] = {
          ...updatedEvents[eventIndex],
          ...formData,
        };
        Cookies.set(`eventsCookie_event_${formData.id}`, JSON.stringify(updatedEvents[eventIndex]));
        return updatedEvents;
      });
      alert("Zapisano zmiany!");
      navigate("/");
    }
  };

  return (
    <section class="gradient-custom-5"> 
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-md-8">
              <form onSubmit={handleSubmit}>
                <div class='d-none'><input type="text" class="form-control" id="id" name="id" value={formData.id} /></div>

                <label htmlFor="name" class="form-label">Nazwa wydarzenia:</label>
                <input type="text" class="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />

                <label htmlFor="description" class="form-label">Opis wydarzenia:</label>
                <input type="text" class="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
                
                <label htmlFor="category_id" class="form-label">Kategoria wydarzenia:</label>
                <select class="form-select" id="category_id" name="category_id" value={formData.category_id} onChange={handleChange}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="image" class="form-label">Fotografia wydarzenia:</label>
                <input type="url" class="form-control" id="image" name="image" value={formData.image} onChange={handleChange} />
                <div id="imgHelp" class="form-text">Podaj link do obrazka.</div>
                <br />

                <div class="mb-3 mw-100">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td><label htmlFor="start_date" class="form-label">Początek wydarzenia:</label></td>
                                <td><label htmlFor="end_date" class="form-label">Koniec wydarzenia:</label></td>
                            </tr>
                            <tr>
                                <td><input type="date" class="form-control" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} /></td>
                                <td><input type="date" class="form-control" id="end_date" name="end_date" value={formData.end_date} onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <button type="submit" class="btn btn-primary">Zapisz zmiany</button>
              </form>
            </div>
          </div>
        </div>  
    </section>
  )
};
  
  export default ModifyEvent;
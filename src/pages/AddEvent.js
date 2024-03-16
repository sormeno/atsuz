import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Cookies  from 'js-cookie';

const AddEvent = ({events, categories, setEvents}) => {

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    image: '',
    start_date: '',
    end_date: '',
    category_id: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();  
    
    // znalezienie max id w wydarzeniach i przypisanie max(id)+1 do nowego wydarzenia
    const maxId = Math.max(...events.map((event) => event.id), 0);
    const newId = maxId + 1;
    //zapisanie zmian do events
    const newEvent = { ...formData, id: newId };  
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    //zapisanie zmian w cookie
    Cookies.set(`eventsCookie_event_${newId}`, JSON.stringify(newEvent));

    alert("Dodano wydarzenie!");
    navigate("/");
  };

  return (
    <section class="gradient-custom-5"> 
      <div class="container container-width">
          <div class="row justify-content-center">
              <div class="col-md-8 font-color">
              <form onSubmit={handleSubmit}>
                <div class='d-none'><input type="text" class="form-control" id="id" name="id" value={formData.id} /></div>

                <label htmlFor="name" class="form-label">Nazwa wydarzenia:</label>
                <input type="text" class="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required/>

                <label htmlFor="description" class="form-label">Opis wydarzenia:</label>
                <input type="text" class="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required/>
                
                <label htmlFor="category_id" class="form-label">Kategoria wydarzenia:</label>
                <select class="form-select" id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required>
                    <option selected></option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="image" class="form-label">Fotografia wydarzenia:</label>
                <input type="url" class="form-control" id="image" name="image" value={formData.image} onChange={handleChange} required/>
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
                                <td><input type="date" class="form-control" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} required/></td>
                                <td><input type="date" class="form-control" id="end_date" name="end_date" value={formData.end_date} onChange={handleChange} required/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <button type="submit" class="btn btn-primary">Dodaj wydarzenie</button>
              </form>
            </div>
          </div>
        </div>  
    </section>
  )
};
  
  export default AddEvent;
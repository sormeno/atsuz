import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; 
import '../index.css';
import Cookies from 'js-cookie';

const ModifyCategories = ({ categories, setCategories, events }) => {
  const [formData, setFormData] = useState({
    id: '', 
    name: '',
    color: '#000000',
  });
  
  
  const [formEditData, setFormEditData] = useState({
    id: '', 
    name: '',
    color: '#000000',
  });

  const [showModal, setShowModal] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setFormEditData((prevFormEditData) => ({ ...prevFormEditData, [name]: value }));
  };

  const handleShowModal = (categoryId) => {
    setEditingCategoryId(categoryId);
    const categoryToEdit = categories.find((category) => category.id === categoryId);
    setFormEditData({
      id: categoryToEdit.id,
      name: categoryToEdit.name,
      color: categoryToEdit.color,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategoryId(null);
    setFormEditData({
      id: '',
      name: '',
      color: '#ffffff',
    });
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();

    // aktualizacja kategorii w obiekcie z kategoriami
    const updatedCategories = categories.map((category) =>
      category.id === editingCategoryId ? { ...formEditData } : category
    );
    setCategories(updatedCategories);
    Cookies.set('categoriesCookie', JSON.stringify(updatedCategories));

    handleCloseModal();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // znalezienie max id w kategoriach i przypisanie max(id)+1 do nowego wydarzenia
    const maxId = Math.max(...categories.map((event) => event.id), 0);
    const newId = String(maxId + 1);
    //zapisanie zmian do events
    const newCategory = { ...formData, id: newId };  
    const newCategories = [...categories, newCategory];
    setCategories(newCategories);
    Cookies.set('categoriesCookie', JSON.stringify(newCategories));
    
    //resetowanie formularza
    setFormData({
      id: '',
      name: '',
      color: '#ffffff',
    });
  };

  const handleDelete = (categoryId) => {
  // sprawdz czy kategoria nie jest przypisana do zadnego wydarzenia
  const isCategoryAssigned = events.some((event) => event.category_id === categoryId);

  if (isCategoryAssigned) {
    alert("Nie można usunąć kategorii, ponieważ isntieją powiązane wydarzenia.");
  } 
  else {
    const updatedCategories = categories.filter((category) => category.id !== categoryId);
    setCategories(updatedCategories);
    Cookies.set('categoriesCookie', JSON.stringify(updatedCategories));
  }
  };

  return (
    <div className="container container-width font-color">
      <h3>Edycja kategorii</h3>
      <br />
      <h5>Istniejące kategorie:</h5>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Kolor</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td><h6>{category.name}</h6></td>
                <td>
                  <div
                    style={{
                      width: '35px',
                      height: '35px',
                      backgroundColor: category.color,
                    }}
                  ></div>
                </td>
                <td>
                  <button onClick={() => handleShowModal(category.id)} class="btn btn-primary me-3">Edytuj</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(category.id)} class="btn btn-danger me-3">Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h5>Dodaj kategorię:</h5>
        <form onSubmit={handleSubmit}>
            <div class="d-flex mb-4">
              <div class='d-none'><input type="text" class="form-control" id="category_id" name="category_id" value={formData.id}/></div>
              <div class="row form-outline me-3" style={{width: '10rem'}}>
                  <input type="text" name="name" id="name" class="form-control col-sm" value={formData.name} onChange={handleChange} />
              </div>
              <div class="row form-outline me-3" style={{width: '4rem'}}>
                  <input type="color" name="color" id="color" class="form-control form-control-color input-lg col-sm align-middle" value={formData.color} onChange={handleChange} />  
              </div>  
            <button type="submit" className="btn btn-success me-3">
              Dodaj
            </button>
          </div>
        </form>
      </div>
      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj kategorię</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitEdit}>
            <div class="row form-outline me-3" style={{width: '10rem'}}>
                <input type="text" name="name" id="name" class="form-control col-sm" value={formEditData.name} onChange={handleEditChange} />
            </div>
            <div class="row form-outline me-3" style={{width: '4rem'}}>
                <input type="color" name="color" id="color" class="form-control form-control-color input-lg col-sm align-middle" value={formEditData.color} onChange={handleEditChange} />  
            </div>  
            <Button variant="secondary" onClick={handleCloseModal}>
              Anuluj
            </Button>
            <Button className="btn btn-success me-3" type="submit" >
              Zapisz zmiany
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ModifyCategories;
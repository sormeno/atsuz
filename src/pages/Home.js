
import Timeline from '../Components/Timeline/timeline'; 

const Home = ({ events, categories, setEvents, setCategories }) => {    
    return (
      <div>
        <Timeline  events={events} categories={categories} setEvents={setEvents} setCategories={setCategories}/>
      </div>
    );
  };
  
export default Home;
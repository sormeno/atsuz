import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header/Header';
import Home from './pages/Home';
import AddEvent from './pages/AddEvent';
import ModifyEvent from './pages/ModifyEvent';
import ModifyCategories from './pages/ModifyCategories';
import About from './pages/About';
import Cookies from 'js-cookie';

export default function App() {  

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

      // wydarzenia inicjalne
  const initialEvents = [
    { id: 1, name: 'Trening wytrzymałościowy', description: 'Tempo długiego wybiegania jest oczywiście niższe niż tempo docelowe, tętno nie rośnie aż tak bardzo, a wysiłek nie powinien być przytłaczający. To świetna okazja do odkrywania nowych tras i – w pewnym sensie – wypoczynku dla mięśni. Długie wybiegania powinny być w miarę łatwe technicznie, choć oczywiście w jakimś stopniu odpowiadać charakterowi biegu, w jakim chcesz się specjalizować. Trening wytrzymałości w tej formie przeprowadza się raz w tygodniu. Krótsze biegi w umiarkowanym tempie mogą pojawiać się kilka razy.' , image: 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2023/8/11/ayt1bk0zqirktjvlkjhv/trening-progowy-trener-mikolaj-raczynski', category_id: "5", start_date: '2023-07-06', end_date: '2023-07-16'},
    { id: 2, name: 'Maraton Warszawski', description: 'Maraton Warszawski to rokrocznie prawdziwe święto biegaczy. Jako jeden z nielicznych maratonów na świecie odbywa się nieprzerwanie od 1979 roku! Każda z dotychczasowych edycji Maratonu Warszawskiego ma swoją unikatową historię. Na początku lat 80-tych bieg odbył się pod czujnym okiem wojska i ZOMO, w latach 90-tych pojawiła się pierwsza edycja maratonu ze słowem „Warszawski” w nazwie, a w 2020 roku wydarzenie odbyło się w bezprecedensowej formule przy zachowaniu najwyższego rygoru sanitarnego. Każda odsłona Maratonu jest wyjątkowa, a dla każdego biegacza start to wielkie święto i zwieńczenie długiej drogi.  Dołącz do grona biegaczy, którzy razem z nami piszą maratońską historię i przeżyj swój wyjątkowy dzień w stolicy.' , image: 'https://nnmaratonwarszawski.com/wp-content/uploads/2023/09/fot-Maciej-Kr%C3%BCger230924KRU07574.jpg', category_id: "6", start_date: '2023-09-24', end_date: '2023-09-24'},
    { id: 3, name: 'Regenenracja międzytreningowa', description: 'Odpoczynek po treningu wydaje się czymś oczywistym i niezbędnym dla zachowania równowagi w organizmie, a mimo to wiele osób nie uwzględnia go w swoim planie treningowym. Początkujący sportowcy-amatorzy, licząc na błyskawiczne efekty ćwiczeń i szybką utratę kilogramów, trenują bez wytchnienia dzień po dniu. Tymczasem jest to najgorszy błąd, jaki można popełnić. Bez odpowiedniego czasu na regenerację mięśni nawet najlepszy plan treningowy nie spowoduje, że zbudujemy kondycję i siłę. Osiągnięcie celu, jakim jest smukła, wysportowana sylwetka wymaga przeplatania krótkich okresów wysiłku z dłuższymi okresami wypoczynku i tylko taki schemat treningów jest skuteczny oraz bezpieczny dla zdrowia.' , image: 'https://cdn.galleries.smcloud.net/t/galleries/gf-abgD-tANr-y9dv_odpoczynek-po-treningu-7-rad-jak-regenerowac-organizm-664x442.jpg', category_id: "3", start_date: '2023-05-15', end_date: '2023-06-20'},
    { id: 7, name: 'Trening Siłowy', description: 'Trening siłowy dla biegacza może stanowić świetne urozmaicenie planu treningowego. Jednak czy jest konieczny? Siłownia kojarzy się na ogół z budowaniem dużej masy mięśniowej i podnoszeniem ogromnych ciężarów. Z tego względu większość biegaczy unika jej jak ognia. Dowiedz się, czy biegacze powinni wykonywać ćwiczenia siłowe.' , image: 'https://www.radio.bialystok.pl/src/461/bc31c11dff51598435721dd8748967b1', category_id: "5", start_date: '2023-04-01', end_date: '2023-05-01'},
    { id: 10, name: 'Odpoczynek po biegu', description: 'Pod kątem regeneracji ważne jest to, by uzupełnić płyny tuż po zakończeniu biegania. Najlepiej w niedługim czasie wypić przynajmniej litr wody. Należy robić to powoli, niewielkimi łykami. W czasie intensywnych treningów straty wody są jednak tak duże, że przekładają się na spadki masy ciała.' , image: 'https://megaoutdoor.pl/userdata/public/news/images/130.jpg', category_id: "3", start_date: '2023-09-25', end_date: '2023-10-15'},
  ];

  // kategorie inicjalne
  const initialCategories = [
    { id: "3", name: 'Regeneracja', color: '#47905d'},
    { id: "5", name: 'Trening', color: '#e55757'},
    { id: "6", name: 'Zawody', color: '#7377d3'},
  ];

  useEffect(() => {
    //pobierz kategorie z cookie
    const categoriesCookie = Cookies.get('categoriesCookie');

    if (!categoriesCookie) {
      // inicjalizacja kategorii jesli cookie nie istnieja
      setCategories(initialCategories);
      // zapisanie kategorii w cookie
      Cookies.set('categoriesCookie', JSON.stringify(initialCategories));
    } else {
      setCategories(JSON.parse(categoriesCookie));
    }

    // pobierz wydarzenia z cookie
    const eventCookieKeys = Object.keys(Cookies.get()).filter(key => key.startsWith('eventsCookie_event_'));
    
    // inicjalizacja wydarzen jesli cookie nie istnieja
    if (eventCookieKeys.length === 0) {
      initialEvents.forEach(event => {
        Cookies.set(`eventsCookie_event_${event.id}`, JSON.stringify(event));
      });
    }
    
    // odczytanie danych o wydarzeniach z cookie
    const eventsFromCookies = eventCookieKeys.map(key => {
        const eventCookie = Cookies.get(key);
        return eventCookie ? JSON.parse(eventCookie) : null;
    }).filter(event => event !== null); 

    setEvents(eventsFromCookies);

  }, []);

  return (
    <div className='gradient-custom-5 '>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home events={events} categories={categories} setEvents={setEvents} setCategories={setCategories}/>} />
            <Route path="AddEvent" element={<AddEvent events={events} categories={categories} setEvents={setEvents} setCategories={setCategories}/>} className='btn-menu' />
            <Route path="ModifyCategories" element={<ModifyCategories categories={categories} setCategories={setCategories} events={events} />} />
            <Route path="ModifyEvent" element={<ModifyEvent events={events}  categories={categories} setEvents={setEvents}/>} />
            <Route path="About" element={<About/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

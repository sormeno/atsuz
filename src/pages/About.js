const About = () => {    
    return (
      <div className="container container-width font-color">
        <header>
            <h2>O Stronie</h2>
        </header>
        
        <main>
            <section class="section">
                <h3>Przeznaczenie</h3>
                <p>Strona służy do prowadzenia dziennika treningowo-startowego przez osobę trenującą bieganie w formie osi czasu. Dziennik pozwala na dodwanie, modyfikowanie i usuwanie zdarzeń. Zdarzenia podzielone są na różne kategorie. Istnieje możliwość dodawania, modyfikowania i usuwania kategorii.</p>
            </section>
            
            <section class="section">
                <h3>Jak korzystać ze strony</h3>
                <h5>Strona główna</h5>
                <p>Na stronie głównej znajduje się oś czasu prezentujaca wszystkie zdarzenia posortowane według daty. Po kliknięciu w wybrane zdarzenie pojawia się okienko ze szczegółami. Ponadto w okienku znajdują się przyciski umożliwiające edycję lub usunięcie zdarzenia.<br></br>Nad osią czasu znajdują się przyciski z dostępnymi kategoriami. Wybranie kategorii powoduje wyfiltrowanie odpowiednich zdarzeń.</p>
                <h5>Dodaj wydarzenie</h5>
                <p>Jest to strona służąca dodawaniu nowych zdarzeń. Wszystkie pola są wymagane. W polu "Fotografia wydarzenia" należy podać link (tekst zaczynający się od <i>http://</i> lub <i>https://</i>) </p>
                <h5>Edytuj kategorie</h5>
                <p>Strona umożliwiające dodawanie i modyfikowanie kategorii.<br></br> W celu dodania kategorii należy w wolnym polu na dole listy wpisać nazwę kategorii, wybrać kolor z tzw. color pickera i kliknąć <i>Dodaj</i>. <br></br>W celu edycji kategorii należy kliknąć <i>Edytuj</i> obok nazwy kategorii i wyskakującym okienku dokonać zmian.<br></br>W celu usunięcia kateogrii należy skorzystać z przycisku <i>Usuń</i>. Aby było to możliwe kategoria nie może być przypisana do żadnego wydarzenia.</p>
           </section>
            
            <section class="section">
                <h3>Zastosowane technologie</h3>
                <p>Niniejsza strona <b>HTML</b> powstała z wykorzystaniem frontendowego frameworku <b>React</b>. Ponadto część komponentów <b>CSS</b> pochodzi z framewroku <b>BootStrap</b> (np. oś czasu na stronie głównej). Jest to projekt wyłącznie frontendowy. Wszystkie wprowadzane dane zapisywane są na komputerze klienta w postaci plików <b>cookies</b>.</p>
            </section>
        </main>
      </div>
    );
  };
  
export default About;
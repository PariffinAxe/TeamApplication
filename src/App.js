import './App.css';
import TeamForm from './Containers/TeamForm';

function App() {

  return (
    <>
      <header>
        SCA Canoe Polo Entry Form
      </header>
      <main>
        <div className="vertical-line"/>
        <TeamForm/>
        <div className="vertical-line"/>
      </main>
      <footer>
        Michael Brown
      </footer>
    </>
  );

}

export default App;

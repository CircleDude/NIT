import './CSS/App.css';
import cars from './data.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
       <h3>Самые быстрые автомобили и концепты</h3>
       <Table data={ cars } amountRows="15" pagination={ true } />
    </div>
  );
}

export default App;
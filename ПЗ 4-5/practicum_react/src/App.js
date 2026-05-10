import './CSS/App.css';
import cars from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useState } from "react";

function App() {
  const [filteredData, setFilteredData] = useState(cars);

  return (
    <div className="App">
       <h3>Самые быстрые автомобили и концепты</h3>
       <Chart data={ filteredData } />
       <Table data={ cars } amountRows="15" pagination={ true } setFilteredData={ setFilteredData } />
    </div>
  );
}

export default App;
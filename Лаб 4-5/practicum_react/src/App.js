import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import TaskBlocks from './components/TaskBlocks.js';
import { useState } from "react";

function App() {
  const [filteredData, setFilteredData] = useState(buildings);
  
  return (
    <div className="App">
      <TaskBlocks num={ 3 } />
      <h3>Самые высокие здания и сооружения</h3>
      <Chart data={ filteredData } />
      <Table data={ buildings } amountRows="15" pagination={ true } setFilteredData={ setFilteredData } />
    </div>
  );
}

export default App;
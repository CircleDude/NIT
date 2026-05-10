import { useState, createContext } from "react";
import TaskBigBlocks from "./TaskBigBlocks.js";

export const NumContext = createContext(null);

function TaskBlocks(props) {
    const [num, setNum] = useState(3);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const value = Number(form.blocksNum.value);
        setNum(value);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Количество вложенных блоков: </label>
                    <input name="blocksNum" type="number" />
                    <button type="submit">Изменить</button>
                </p>
            </form>

            <NumContext.Provider value={num}>
                <div className="taskContainer">
                    <TaskBigBlocks num={props.num} />
                </div>
            </NumContext.Provider>
        </>
    );
}

export default TaskBlocks;
import { useContext } from "react";
import { NumContext } from "./TaskBlocks";

function TaskSmallBlocks() {
    const num = useContext(NumContext);

    const blocks = Array.from({ length: Number(num) }, (el, i) => (
        <div className="taskSmallBlock" key={i}></div>
    ));

    return <>{blocks}</>;
}

export default TaskSmallBlocks;
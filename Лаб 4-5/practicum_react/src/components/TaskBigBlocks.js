import TaskSmallBlocks from './TaskSmallBlocks.js';

function TaskBigBlocks(props) {
    const blocks = Array.from({length: Number(props.num)}, (el, i) => 
      <div className="taskBigBlock" key={ i }>
        <TaskSmallBlocks />
      </div>
    );

    return (<>
      { blocks }
    </>);
}

export default TaskBigBlocks;
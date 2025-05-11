import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores";

export const JiraPage = () => {

  //* Don't work. Todo: Update to zustand 5.x
  // const getTaskByStatus = useTaskStore(state => state.getTaskByStatus);
  // const pendingTasks = getTaskByStatus('open');
  // const inProgressTasks = getTaskByStatus('in-progress');
  // const doneTasks = getTaskByStatus('done');


  const pendingTasks = useTaskStore(state => state.getTaskByStatus('open'));
  const inProgressTasks = useTaskStore(state => state.getTaskByStatus('in-progress'));
  const doneTasks = useTaskStore(state => state.getTaskByStatus('done'));

  return (
    <>
      <h1>Tasks</h1>
      <p>State management of objects with zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title='Pending' status='open' tasks={pendingTasks} />
        <JiraTasks title='In Progress' status='in-progress' tasks={inProgressTasks} />
        <JiraTasks title='Done' status='done' tasks={doneTasks} />
      </div>
    </>
  );
};

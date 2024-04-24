import DeveloperTask from './DeveloperTask';

export default function TaskList({ tasks }){
    return (
        tasks.map(task =>
            <DeveloperTask
                key={task.id}
                id={task.id}
                description={task.description}
                status={task.status}
            />
        )
    );
}
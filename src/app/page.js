"use client";


function Home() {
  const { tasks } = useTasks();

  return (
    <div classNameName="flex justify-center">
      {tasks.length === 0 ? (
        <div classNameName="block">
          <h2 classNameName="text-2xl">There are no tasks</h2>
          <VscTasklist size="8rem" />
        </div>
      ) : (
        <div classNameName="w-7/10">
          {tasks.map((task, i) => (
            <TaskCard task={task} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

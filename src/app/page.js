"use client";

import RootLayout from "./layout";


function Home() {
  const { tasks } = useTasks();

  return (
    <div >
      <h1>hola mundo</h1>
      <RootLayout></RootLayout>
    </div>
  );
}

export default Home;

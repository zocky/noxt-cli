export const route = '/tasks';

export const fetch = {
  tasks: 'https://jsonplaceholder.typicode.com/todos'
}

export default function PageTasks({ tasks }, {
  // all components are available here
  Json, PageTask, Sidebar,
  // so are request and response objects
  req, res, params,
  // utils are extendable by your units in ../../units
  utils,
  // use slot(name,key,value) to pass values to the layout
  slot,
}) {
  slot('title', 'main', 'Tasks');
  return (
    <>
      <main>
        <h2>Here are some tasks</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(({ id, title, completed }) => (
              <tr key={id}>
                <td>{id}</td>
                <td><PageTask.Link taskid={id} text={title} /></td>
                <td>{completed ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Here's the data</h2>
        <Json data={tasks} />
      </main>
      <aside>
        <Sidebar />
      </aside>
    </>
  );
}

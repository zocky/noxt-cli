export const route = '/tasks/:taskid';

export const fetch = {
  task: ({ taskid }) => 'https://jsonplaceholder.typicode.com/todos/' + taskid
}

export default function PageIndex({ task, taskid }, {
  // all components are available here
  Json, Sidebar,
  // so are request and response objects
  req, res, params,
  // utils are extendable by your units in ../../units
  utils,
  // use slot(name,value) and slot(name,key,value) to pass values to the layout
  slot,
}) {
  slot('title', 'Task ' + taskid);
  return (
    <article>
      <main>
        <h2>Here is task {taskid}</h2>
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <td>{taskid}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{task.title}</td>
            </tr>
            <tr>
              <th>Completed</th>
              <td>{task.completed}</td>
            </tr>
          </tbody>
        </table>
        <h2>Here's the data</h2>
        <Json data={task} />
      </main>
      <aside>
        <Sidebar />
      </aside>
    </article>
  );
}

export const route = '/tasks/:taskid';

export const fetch = {
  task: ({ taskid }) => 'https://jsonplaceholder.typicode.com/todos/' + taskid,
  user: ({ task }) => 'https://jsonplaceholder.typicode.com/users/' + task.userId
}

export default function PageIndex({ task, user, taskid }, {
  // all components are available here
  Json, Sidebar,
  // so are request and response objects
  req, res, params,
  // utils are extendable by your units in ../../units
  utils,
  // use slot(name,value) and slot(name,key,value) to pass values to the layout
  slot,
}) {
  slot('title', 'main', 'Task ' + taskid);
  return (
    <>
      <main>
        <h2>Here is task {taskid}</h2>
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <td>{taskid}</td>
            </tr>
            <tr>
              <th>User</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{task.title}</td>
            </tr>
            <tr>
              <th>Completed</th>
              <td>{task.completed ? 'Yes' : 'No'}</td>
            </tr>
          </tbody>
        </table>
        <h2>Here's the data</h2>
        <Json data={task} />
        <Json data={user} />
      </main>
      <aside>
        <Sidebar />
      </aside>
    </>
  );
}

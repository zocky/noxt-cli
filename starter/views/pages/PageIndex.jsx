export const route = '/';

export default function PageIndex({ tasks }, {
  // all components are available here
  Json, Sidebar,
  // so are request and response objects
  req, res, params,
  // utils are extendable by your units in ../../units
  utils,
  // use slot(name,value) and slot(name,key,value) to pass values to the layout
  slot,
}) {
  slot('title', 'Welcome to Noxt');
  return (
    <article>
      <main>
        <h2>Here are some tasks</h2>
          <PageTasks.Link text="Tasks" />
      </main>
      <aside>
        <Sidebar />
      </aside>
    </article>
  );
}

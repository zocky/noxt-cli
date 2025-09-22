export const route = '/';

export default function PageIndex({ }, { 
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
        <h2>{utils.greet('user')}</h2>
          Here are some tasks: <PageTasks.Link text="Tasks" />
      </main>
      <aside>
        <Sidebar />
      </aside>
    </article>
  );
}

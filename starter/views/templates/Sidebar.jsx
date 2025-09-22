export default function SideBar({ }, { PageIndex, PageTasks, AlertButton }) {
  return (
    <>
      <nav>
        <img src="/img/favicon.png" id="logo" />
        <ul>
          <li><PageIndex.Link text="Go Home" /></li>
          <li><PageTasks.Link text="Tasks" /></li>
          <li><AlertButton label="Alert" message="Hello" /></li>
        </ul>
      </nav>
    </>
  );
}
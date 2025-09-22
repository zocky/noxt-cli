export default function SideBar({},{ PageIndex, AlertButton }) {
  return (
    <nav>
      <ul>
        <li><PageIndex.Link text="Go Home" /></li>
        <li><AlertButton label="Alert" message="Hello" /></li>
      </ul>
    </nav>
  );
}
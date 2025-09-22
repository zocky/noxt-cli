export default function Json({ data, title= "JSON"}, { DEV }) {
  
  //hide in production
  //if (!DEV) return null;

  let json;
  try {
    json = JSON.stringify(data, null, 2);
  } catch (e) {
    json = String(data);
  }
  return (
    <details>
      <summary>{title}</summary>
      <pre>{json}</pre>
    </details>
  );
}

const jsAlert = `
  function doAlert(button) {
    alert('Noxt says: ' + button.dataset.message);
  }
`;

export default function AlertButton({ label, message },{ slot }) {

  slot('js', 'alert-button', jsAlert);

  return (
    <button onclick="doAlert(this)" data-message={message}>
      {label}
    </button>
  );
}
const jsAlert = `
  function doAlert(button) {
    alert('Noxt says: ' + button.dataset.message);
  }
`;

export default function AlertButton({ label, message }) {
  return (
    <Button onclick="doAlert(this)" data-message={message}>
      {label}
    </Button>
  );
}
import "./Modal.css"
export function Modal({ children }) {
  return (
    <div className="modal-overlay">
      <div className="modal-disable">
        {children}
      </div>
    </div>
  );
}

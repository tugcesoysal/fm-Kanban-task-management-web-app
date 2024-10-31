const Overlay = ({ isVisible, onClick }) => {
  return isVisible ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 overflow-hidden"
      onClick={onClick}
    />
  ) : null;
};

export default Overlay;

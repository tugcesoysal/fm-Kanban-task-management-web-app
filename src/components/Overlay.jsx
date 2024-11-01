const Overlay = ({ isVisible, onClick }) => {
  return isVisible ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full z-40"
      onClick={onClick}
    />
  ) : null;
};

export default Overlay;

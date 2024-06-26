export default function Button({ children, customStyle, onClick }) {
  return (
    <button onClick={onClick} className={`${customStyle}`}>
      {children}
    </button>
  );
}

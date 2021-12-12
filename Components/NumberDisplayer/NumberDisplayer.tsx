type props = {
  value: number;
};

function NumberDisplayer({ value }: props) {
  return (
    <div className="text-center bg-secondary d-inline-flex align-items-center justify-content-center text-center p-1 rounded w-75 bg-opacity-25">
      <span>{value}</span>
    </div>
  );
}

export default NumberDisplayer;

function Block({ value, scaleFactor, width }) {
  const height = value * scaleFactor;

  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: 'lightblue',
        border: '1px solid black',
        margin: '5px',
        display: 'inline-block',
        verticalAlign: 'bottom'
      }}
    >
      {value}
    </div>
  );
}

export default Block;
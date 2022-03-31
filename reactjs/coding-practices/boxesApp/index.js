const Box = (props) => {
  //  Write your code here.
  const { className, message } = props;
  return <div className={className}>{message}</div>;
};

const element = (
  <div className="container">
    <h1 className="heading">Boxes</h1>
    <div class="containerBox">
      <Box className="smallBox" message="small" />
      <Box className="mediumBox" message="medium" />
      <Box className="largeBox" message="large" />
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));

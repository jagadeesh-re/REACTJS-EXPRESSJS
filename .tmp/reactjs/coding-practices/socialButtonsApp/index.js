const Button = (props) => {
  //  Write your code here.
  const { name, className } = props;
  return <button className={className}>{name}</button>;
};

const element = (
  //  Write your code here.
  <div className="container">
    <h1 className="heading">Social Buttons</h1>
    <div className="buttonContainer">
      <Button name="Like" className="like" />
      <Button name="Comment" className="comment" />
      <Button name="share" className="share" />
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));

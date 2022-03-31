const Notification = (props) => {
  const { className, message, src, image } = props;
  return (
    <div className={className}>
      <img src={src} className={image} />
      <p>{message}</p>
    </div>
  );
};

const element = (
  <div className="container">
    <div>
      <h1 class="heading">Notifications</h1>
      <Notification
        className="notification1"
        message="Information Message"
        src="https://assets.ccbp.in/frontend/react-js/primary-icon-img.png"
        image="image"
      />
      <Notification
        className="notification2"
        message="Success Message"
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        image="image"
      />
      <Notification
        className="notification3"
        message="Warning Message"
        src="https://assets.ccbp.in/frontend/react-js/warning-icon-img.png"
        image="image"
      />
      <Notification
        className="notification4"
        message="Error Message"
        src="https://assets.ccbp.in/frontend/react-js/danger-icon-img.png"
        image="image"
      />
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));

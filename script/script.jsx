// script/script.jsx


function App(props) {
  return (
    <div>App</div>
  );
}

const Dispatcher = React.useContext(null);

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);

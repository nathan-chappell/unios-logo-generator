// index.jsx

export {
  Index,
};

function Index(props) {
  const { itemList, callback } = props;

  return (
    <div className="Index">
      {itemList.map((item) => {
        return (
          <div className="IndexItem" key={item.text} onClick={(e) => 
            callback({component:"Index", action:"click", value:item })}
          >{item.text}</div>
        );
      })}
    </div>
  );
}


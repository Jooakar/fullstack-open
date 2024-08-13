const Message = ({ content, type }) => {
  if (content === "") {
    return null;
  }
  return (
    <>
      <p className={"message " + type}>{content}</p>
    </>
  );
};

export default Message;

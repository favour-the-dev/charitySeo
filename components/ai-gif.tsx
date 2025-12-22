function AiGif() {
  return (
    <div
      style={{
        width: "100%",
        height: 0,
        paddingBottom: "75%",
        position: "relative",
      }}
    >
      <iframe
        src="https://giphy.com/embed/5k5vZwRFZR5aZeniqb"
        width="100%"
        height="100%"
        style={{ position: "absolute" }}
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default AiGif;

const BackgroundOverlay = ({ route }) => {
  let overlayStyle = {};

  if (route === '/user') {
    overlayStyle = { backgroundColor: 'rgba(255, 255, 255, 0.6)' };
  } else if (route === '/home') {
    overlayStyle = { backgroundColor: 'rgba(255, 255, 255, 0)' };
  } else {
    overlayStyle = { backgroundColor: 'rgba(255, 255, 255, 0)' };
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // important! so it doesn't block clicks
        zIndex: 0,
        ...overlayStyle,
      }}
    />
  );
};

export default BackgroundOverlay;

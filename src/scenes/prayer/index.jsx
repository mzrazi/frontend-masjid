function Prayer() {
  const iframeStyles = {
    height: '50%',
    width: '80%',
    border: '1px solid #ddd',
    marginLeft: '10%',
    marginTop:'10%',
    backgroundColor: '#7a7f9d',
    scrolling: 'no'
  };

  return (
    
  
    <iframe id="iframe" title="prayerWidget" className="widget-m-top"  src="https://www.islamicfinder.org/prayer-widget/1273874/shafi/3/0/18.0/18.0" style={iframeStyles}> </iframe>
    
  );
}

export default Prayer;

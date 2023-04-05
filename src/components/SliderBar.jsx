export default function SliderBar(props) {
  const clickHandler = (newValue) => {
    props.onClick("masterGain", newValue / 50);
  }

  return (
    <div 
      className={`slider-bar ${props.active ? "active" : ""}`}
      onClick={() => clickHandler(props.value)}
      >
    </div>
  )
}
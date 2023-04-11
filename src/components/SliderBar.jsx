export default function SliderBar(props) {
  return (
    <div 
      className={`slider-bar ${props.active ? "active" : ""}`}
      onClick={() => props.onChange(props.value)}
      onMouseOver={() => props.onChange(props.value)}
      >
    </div>
  )
}
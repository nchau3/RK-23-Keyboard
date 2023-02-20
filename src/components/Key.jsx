export default function Key(props) {
  return (
    <div 
      className={props.whiteKey ? "key key-white" : "key key-black"}>
    </div>
  )
}
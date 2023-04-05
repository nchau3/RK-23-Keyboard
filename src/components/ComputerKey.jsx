export default function ComputerKey(props) {
  return (
    <li className={`computer-key ${props.blackKey ? "black-key" : ""} ${props.whiteKey ? "white-key" : ""}`}>{props.char}</li>
  )
}
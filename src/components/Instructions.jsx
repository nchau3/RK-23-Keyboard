//components
import ComputerKey from "./ComputerKey";

//styles
import "../styles/component-styles/instructions.scss";

export default function Instructions() {
  const getQwertyRows = () => {
    const blackKeys = [2, 4, 5, 7, 8, 9];
    const computerKeyboard = [];

    //tags black and white keys for user
    for (let i = 1; i <= 3; i++) {
      const row = [];
      for (let j = 1; j <= 10; j++) {
        if (i === 1 && blackKeys.includes(j)) {
          row.push({row: i, key: `${i} - ${j}`, blackKey: true});
        } else if (i === 2) {
          row.push({row: i, key: `${i} - ${j}`, whiteKey: true});
        } else {
          row.push({row: i, key: `${i} - ${j}`});
        }
      }
      computerKeyboard.push(row);
    }

    return computerKeyboard.map(row => {
      return (
      <ul key={`row-${row[0].row}`} className={`computer-key-row row-${row[0].row}`}>
        {row.map(key => {
        return (
          <ComputerKey key={key.key} blackKey={key.blackKey} whiteKey={key.whiteKey} />
        )})
        }
      </ul>)
    })
  };

  return (
    <div className="instructions">
      <h3>KEYBOARD CONTROLS</h3>
      {getQwertyRows()}
    </div>
  )
}
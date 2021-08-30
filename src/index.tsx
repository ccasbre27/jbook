import ReactDOM from "react-dom";
import { useState } from "react";

const App = () => {

    const [input, setInput] = useState('');
    const [code, setcode] = useState('');

    const handlerOnClick = () => {
        console.log(input);
    };

    return <div>
        <textarea value={input} onChange={e => setInput(e.target.value)}>
        </textarea>
        <div>
            <button onClick={handlerOnClick}>Submit</button>
            <pre>{code}</pre>
        </div>
    </div>;
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)
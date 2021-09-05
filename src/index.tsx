import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";


const App = () => {

    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const handlerOnClick = async () => {

        if(!ref.current) {
            return;
        }

        const result = await ref.current.build({
            entryPoints: ['index.js'], 
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()]
        });
        console.log(result);
        setCode(result.code);
        
    };

    return (
        <div>
            <textarea value={input} onChange={e => setInput(e.target.value)}>
            </textarea>
            <div>
                <button onClick={handlerOnClick}>Submit</button>
                <pre>{code}</pre>
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)
import { useState } from "react";

export default function PointList({ plotInfos, onDelete, onAdd, onObserverAdd, onObserverDelete }) {
    const [selected, setSelected] = useState(0);
    const [tValue, setTValue] = useState('');
    const [xValue, setXValue] = useState('');
    const [yValue, setYValue] = useState('');

    return (
        <>
            <b>Data</b>
            <br />
            <>
                <label>Choose the observer: </label>
                <select onChange={(e) => setSelected(e.target.value)}>
                    {plotInfos.map((pi, index) => (<option value={index}>Observer {index}</option>))}
                </select>
            </>
            
            <br />
            <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>t (s)</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>x (ls)</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>y (ls)</th>
                    </tr>
                </thead>
                <tbody>
                    {plotInfos[selected].t.map((t, index) => (
                        <tr key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <td>{t}</td>
                            <td>{plotInfos[selected].x[index]}</td>
                            <td>{plotInfos[selected].y[index]}</td>
                            <td>
                                <button onClick={() => onDelete(selected, index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td><input style={{ width: '50px' }} value={tValue} onChange={e => setTValue(e.target.value)} type="number" /></td>
                        <td><input style={{ width: '50px' }} value={xValue} onChange={e => setXValue(e.target.value)} type="number" /></td>
                        <td><input style={{ width: '50px' }} value={yValue} onChange={e => setYValue(e.target.value)} type="number" /></td>
                        <td>
                            <button onClick={() => {
                                onAdd(selected, tValue, xValue, yValue);
                                setTValue('');
                                setXValue('');
                                setYValue('');
                            }}>Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>

            <button onClick={onObserverAdd}>Add Observer</button>
            {selected && <button onClick={() => {onObserverDelete(selected); setSelected(0)}}>Delete Observer</button>}
        </>

    );
}
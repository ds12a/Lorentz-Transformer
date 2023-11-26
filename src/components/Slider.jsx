import React, { useState } from 'react';

export default function Slider({onUpdate, name, max, min=-max, step="0.01", decPoints=4, passedValue=0}) {
    const [value, setValue] = useState(passedValue);

    return (
        <div style={{ gap: '10px', border: '1px solid black', padding: '10px', margin: '10px' }
}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label htmlFor="slide">{name}:</label>
            <input
                id="slide"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => { setValue(parseFloat(e.target.value)); onUpdate(parseFloat(e.target.value))}}
            />
                
        </div>
            <p>Current: <input value={value} type="number" onChange={(e) => { setValue(parseFloat(e.target.value)); onUpdate(parseFloat(e.target.value))}}/> {min === -max?"c":""}</p>
        </div>
    );
}
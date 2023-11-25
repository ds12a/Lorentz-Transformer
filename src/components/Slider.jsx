import React, { useState } from 'react';

export default function Slider({onUpdate, name, max, min=-max, step="0.001", decPoints=3, passedValue=0}) {
    const [value, setValue] = useState(passedValue);

    return (
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
            <p>Current: {value.toFixed(decPoints)} {min === -max?"c":""}</p>
        </div>
    );
}
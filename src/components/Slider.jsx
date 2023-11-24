import React, { useState } from 'react';

export default function Slider({onUpdate, name, max}) {
    const [value, setValue] = useState(0);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label htmlFor="slide">{name}:</label>
            <input
                id="slide"
                type="range"
                min={-max}
                max={max}
                step="0.001"
                value={value}
                onChange={(e) => {setValue(e.target.value); onUpdate(e.target.value)}}
            />
            <p>Current: {value} c</p>
        </div>
    );
}
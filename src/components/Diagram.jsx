import Plot from "react-plotly.js";

export default function Diagram({ plotInfos }) {

    const layout = {
        scene: {
            zaxis: { title: 't' },
            aspectmode: 'data',
            camera: {
                eye: { x: 0, y: -1.25, z: 1.25 }
            }
        },
        uirevision: 'true',
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 10,
            pad: 5
        }, title: false,
        width: '1000'
    }	 

    return (
        <Plot
            data={plotInfos.map((pi, index) => ({
                x: pi.x,
                y: pi.y,
                z: pi.t,
                type: 'scatter3d',
                mode: 'lines+markers',
                name: `Observer ${index}`,
            }))
            }

            

            layout={layout}
/>
    );
}
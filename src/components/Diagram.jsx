import Plot from "react-plotly.js";
import PlotInfo from "../PlotInfo";

export default function Diagram({ passedPlotInfos, detail }) {
    var plotInfos = structuredClone(passedPlotInfos);
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
    };

    const range = (len, start, stop) =>
        Array.from({ length: len }, (_, i) => Number(start) + (Number(stop) - Number(start)) / len * i);
    const mask = (len) =>
        Array.from({ length: len }, (_, i) => (i === 0 ? 12 : 0));

    var markerMask = [];


    var modified = structuredClone(plotInfos);
    for (var i = 0; i < plotInfos.length; i++) {
        var pi = plotInfos[i];
        var newPlotInfo = new PlotInfo([], [], []);
        markerMask.push([]);
        for (var j = 0; j < pi.t.length - 1; j++) {
            newPlotInfo.x.push(...range(detail, pi.x[j], pi.x[j + 1]));
            newPlotInfo.y.push(...range(detail, pi.y[j], pi.y[j + 1]));
            newPlotInfo.t.push(...range(detail, pi.t[j], pi.t[j + 1]));
            markerMask[i].push(...mask(detail))
        }
        if (pi.t.length !== 0) {
            newPlotInfo.x.push(pi.x[pi.t.length - 1]);
            newPlotInfo.y.push(pi.y[pi.t.length - 1]);
            newPlotInfo.t.push(pi.t[pi.t.length - 1]);
            markerMask[i].push(12);
        }

        modified[i] = newPlotInfo;
    }
    plotInfos = modified;

    return (
        <Plot
            data={plotInfos.map((pi, index) => ({
                x: pi.x,
                y: pi.y,
                z: pi.t,
                type: 'scatter3d',
                mode: 'lines+markers',
                name: `Observer ${index}`,
                marker: { size: markerMask.reduce((a, b) => a.length > b.length ? a : b) }
            }))
            }



            layout={layout}
        />
    );
}
// Copyright © 2023 ds12a
import './App.css';
import Diagram from './components/Diagram';
import PlotInfo from './PlotInfo';
import { useState } from 'react';
import Slider from './components/Slider';
import { useEffect } from 'react';
import PointList from './components/PointList';

function App() {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const [restInfo, setRestInfo] = useState(params.has("pi") ? JSON.parse(atob(params.get("pi"))) : [new PlotInfo([0, 1, 2], [0, 0.5, 1], [0, 0, 0]), new PlotInfo([0, 1, 2], [0, 1, 2], [0, 0, 0])]);
  const [plotInfos, setPlotInfos] = useState([]);
  const [velocityX, setVelocityX] = useState(0);
  const [velocityY, setVelocityY] = useState(0);
  const [detail, setDetail] = useState(10);

  useEffect(() => {
    setPlotInfos(computeLorentzTransform(restInfo, velocityX, velocityY));
  }, [velocityX, velocityY, restInfo]);


  return (
    <div className="app-content" >
      <Diagram passedPlotInfos={plotInfos} detail={detail}/>
      <div className="sliders">
        <b>Velocity Controls</b>
        <Slider onUpdate={setVelocityX} max={Math.sqrt(0.99 - velocityY * velocityY)} name={"Vx"} />
        <Slider onUpdate={setVelocityY} max={Math.sqrt(0.99 - velocityX * velocityX)} name={"Vy"} />
        <b>Interpolation</b>
        <Slider onUpdate={setDetail} max={100} min={1} step={1} name={"Interpolated Points"} decPoints={0} passedValue={detail}/>
        <PointList plotInfos={restInfo} onDelete={(plot, index) => {
          var modified = structuredClone(restInfo);
          Object.entries(restInfo[plot]).map(([key, value]) => modified[plot][key].splice(index, 1));
          setRestInfo(modified);
        }
        }
          onAdd={(plot, t, x, y) => {
            var modified = structuredClone(restInfo);
            modified[plot].t.push(t);
            modified[plot].x.push(x);
            modified[plot].y.push(y);
            setRestInfo(modified);
          }}
          onObserverAdd={() => {
            var modified = structuredClone(restInfo);
            modified.push(new PlotInfo([0], [0], [0]));
            setRestInfo(modified);
          }}
          onObserverDelete={(index) => {
            var modified = structuredClone(restInfo);
            modified.splice(index, 1);
            setRestInfo(modified);
          }}
        />
        <br /><br />
        <button onClick={() => { navigator.clipboard.writeText(window.location.href.split('?')[0] + "?pi=" + btoa(JSON.stringify(restInfo))); }}>Copy URL</button>
      </div>
    </div>
  );
}

function computeLorentzTransform(plotInfos, velocityX, velocityY) {
  return plotInfos.map((pi) => {
    var v2 = velocityX * velocityX + velocityY * velocityY;

    if (v2 === 0) {
      return pi;
    }

    var gamma = 1 / Math.sqrt(1 - velocityX * velocityX - velocityY * velocityY);
    var newPlotInfo = new PlotInfo([], [], []);

    for (var i = 0; i < pi.t.length; i++) {
      // Adapted from https://physics.stackexchange.com/a/649049
      var newX = -gamma * velocityX * pi.t[i] + (1 + (gamma - 1) * velocityX * velocityX / v2) * pi.x[i] + (gamma - 1) * velocityX * velocityY / v2 * pi.y[i];
      var newY = -gamma * velocityY * pi.t[i] + (1 + (gamma - 1) * velocityY * velocityY / v2) * pi.y[i] + (gamma - 1) * velocityX * velocityY / v2 * pi.x[i];
      var newT = gamma * (pi.t[i] - velocityX * pi.x[i] - velocityY * pi.y[i]);

      newPlotInfo.x.push(newX);
      newPlotInfo.y.push(newY);
      newPlotInfo.t.push(newT);
    }

    return newPlotInfo;
  });
}

export default App;

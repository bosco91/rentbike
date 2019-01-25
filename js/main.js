import Slider from './slider';
import VeloMap from './map';
import Canvas from './canvas';

window.initMap = () => {
    VeloMap.init();
}

window.addEventListener('load', () => {
    Slider.init();
});

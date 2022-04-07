export class AudioVisuals {

    constructor() {
        this.context = undefined;
        this.analyser = undefined;
        this.frequencyData = undefined;
        this.res = 64;
        this.cachedStream = undefined

        if(typeof AudioContext !== "undefined") {
            this.context = new AudioContext();
        } else {
            alert("AudioContext is not supported on your browser, please use the latest version of Chrome.");
            return;
        }
    
        if(!navigator.mediaDevices.getDisplayMedia) {
            alert("navigator.mediaDevices.getDisplayMedia is not supported on your browser, please use the latest version of Chrome.");
            return;
        }
    }

    resume() {
        this.context.resume().then(() => {
            console.log("Playback resumed successfully");
        });
    }

    createVisualizerData() {
        // Create the analyser
        console.log("createVisualizerData... res=", this.res);
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = this.res;
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

        // Set up the visualisation elements
        //var barSpacingPercent = 100 / this.analyser.frequencyBinCount;
        //return barSpacingPercent;
    }

    getStream() {
        return navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    }
}
import { Component } from 'react';
import './App.css';
import { GIFEncoder } from './GIFEncoder';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            scaleFactor: .25,
            gif: null,
            face: null
        }
        this.side = 1500;
        this.img = null;
    }

    componentDidMount(){
        this.img = new Image();
        this.img.src = './cable.png';
        this.img.onload = () => {
            this.setState({loaded: true});
            this.create();
        }
    }

    create() {
        let encoder = new GIFEncoder();
        encoder.setRepeat(0);
        encoder.setDelay(100);
        encoder.start();
        let canvas = document.createElement('canvas');
        canvas.width = this.side * this.state.scaleFactor;
        canvas.height = this.side * this.state.scaleFactor;
        let context = canvas.getContext('2d');
        this.clear(context, this.state.scaleFactor);
        this.draw(0, context, this.state.scaleFactor);
        encoder.addFrame(context);
        this.clear(context, this.state.scaleFactor);
        this.draw(1, context, this.state.scaleFactor);
        encoder.addFrame(context);
        this.clear(context, this.state.scaleFactor);
        this.draw(2, context, this.state.scaleFactor);
        encoder.addFrame(context);
        this.clear(context, this.state.scaleFactor);
        this.draw(3, context, this.state.scaleFactor);
        encoder.addFrame(context);
        encoder.finish();
        let binaryGif = encoder.stream().getData();
        this.setState({ gif: `data:image/gif;base64,${window.btoa(binaryGif)}`})
    }

    draw(frameNumber, context, scaleFactor) {
        frameNumber = (frameNumber || 0) % 4;
        if(this.state.face){
            context.drawImage(this.state.face, 0, 0, this.state.face.width, this.state.face.height, 732 * scaleFactor, 26 * scaleFactor, 598 * scaleFactor, 598 * scaleFactor);
        }
        context.drawImage(this.img, this.side * frameNumber, 0, this.side, this.side, 0, 0, this.side * scaleFactor, this.side * scaleFactor);
        this.drawUrl(context, scaleFactor);
    }

    drawUrl(context, scaleFactor) {
        context.font = `${80 * scaleFactor}px ComicTypo`;
        context.textAlign = "center";
        context.fillStyle = "rgba(0, 0, 0, .5)";
        context.fillText("recoge cable en progredemente.com/cable", this.side * scaleFactor / 2 , this.side * scaleFactor - 40 * scaleFactor);
    }

    clear(context, scaleFactor) {
        context.fillStyle = "white";
        context.fillRect(0, 0, this.side * scaleFactor, this.side * scaleFactor)
    }

    download() {
        let link = document.createElement('a');
        link.download = 'cable.gif';
        link.href = this.state.gif;
        link.click();
    }

    upload() {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/png, image/jpeg';
        input.onchange = () => {
            let fr = new FileReader();
            fr.addEventListener('load', (e) => {
                let face = new Image();
                face.src = e.target.result;
                face.onload = () => {
                    this.setState({face}, this.create);
                }
            });
            fr.readAsDataURL(input.files[0]);
        }
        input.click();
    }

    render() {
        return (
            <>
                {
                    !this.state.loaded &&
                    <div className="loading">
                        <img src="./favicon.png" alt="Cargando" />
                        Cargando
                    </div>
                }
                {
                    this.state.loaded && this.state.gif &&
                    <div className="app">
                        <div
                            className="title"
                        >
                            <img
                                src="./cable.png"
                                alt="Recoge cable"
                            />
                            <div>por <a href="/" target="_blank">progredemente</a></div>
                        </div>
                        <img
                            src={this.state.gif}
                            alt="gif"
                            className="gif"
                        />
                        <div className="buttons">
                            <div onClick={() => {
                                this.upload()
                            }}>Elegir cara</div>
                            {
                                this.state.face &&
                                <div onClick={() => {
                                    this.download()
                                }}>Descargar</div>
                            }
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default App;

import React, { Component, createRef } from 'react';
import './App.css';
import { GIFEncoder } from './GIFEncoder';
import { Icon } from 'components/Icon';
import { ImageCropperModal } from 'components/ImageCropperModal';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            gif: null,
            face: null,
            crop: null
        }
        this.scaleFactor = .25;
        this.side = 1500;
        this.img = null;
        this.cropperModalRef = createRef();
    }

    componentDidMount(){
        this.img = new Image();
        this.img.src = './cable.png';
        this.img.onload = () => {
            this.setState({loaded: true});
            this.create();
        }
    }

    setCrop(crop) {
        this.setState({crop}, this.create);
    }

    create() {
        let encoder = new GIFEncoder();
        encoder.setRepeat(0);
        encoder.setDelay(100);
        encoder.start();
        let canvas = document.createElement('canvas');
        canvas.width = this.side * this.scaleFactor;
        canvas.height = this.side * this.scaleFactor;
        let context = canvas.getContext('2d');
        this.clear(context);
        this.draw(0, context);
        encoder.addFrame(context);
        this.clear(context);
        this.draw(1, context);
        encoder.addFrame(context);
        this.clear(context);
        this.draw(2, context);
        encoder.addFrame(context);
        this.clear(context);
        this.draw(3, context);
        encoder.addFrame(context);
        this.clear(context);
        this.draw(0, context);
        encoder.addFrame(context);
        this.clear(context);
        this.draw(1, context);
        encoder.addFrame(context);
        this.clear(context);
        this.draw(4, context);
        encoder.addFrame(context);
        this.clear(context);
        this.draw(5, context);
        encoder.addFrame(context);
        
        encoder.finish();
        let binaryGif = encoder.stream().getData();
        this.setState({ gif: `data:image/gif;base64,${window.btoa(binaryGif)}`})
    }

    
    draw(frameNumber, context) {
        frameNumber = (frameNumber || 0) % 6;
        if(this.state.crop){
            if(frameNumber === 2 || frameNumber === 3){
                context.translate((803 + 598 / 2) * this.scaleFactor, (40 + 598 / 2) * this.scaleFactor);
                context.rotate(15 * Math.PI / 180);
                context.drawImage(this.state.crop, 0, 0, this.state.crop.width, this.state.crop.height, -598 / 2 * this.scaleFactor, -598 / 2 * this.scaleFactor, 598 * this.scaleFactor, 598 * this.scaleFactor);
                context.rotate(-15 * Math.PI / 180);
                context.translate(-(803 + 598 / 2) * this.scaleFactor, -(40 + 598 / 2) * this.scaleFactor);
            }
            else if(frameNumber === 4 || frameNumber === 5){
                context.translate((656 + 598 / 2) * this.scaleFactor, (37 + 598 / 2) * this.scaleFactor);
                context.rotate(-15 * Math.PI / 180);
                context.drawImage(this.state.crop, 0, 0, this.state.crop.width, this.state.crop.height, -598 / 2 * this.scaleFactor, -598 / 2 * this.scaleFactor, 598 * this.scaleFactor, 598 * this.scaleFactor);
                context.rotate(15 * Math.PI / 180);
                context.translate(-(656 + 598 / 2) * this.scaleFactor, -(37 + 598 / 2) * this.scaleFactor);
            }
            else {
                context.drawImage(this.state.crop, 0, 0, this.state.crop.width, this.state.crop.height, 732 * this.scaleFactor, 26 * this.scaleFactor, 598 * this.scaleFactor, 598 * this.scaleFactor);
            }
        }
        context.drawImage(this.img, this.side * frameNumber, 0, this.side, this.side, 0, 0, this.side * this.scaleFactor, this.side * this.scaleFactor);
        this.drawUrl(context);
    }

    drawUrl(context) {
        context.font = `${80 * this.scaleFactor}px ComicTypo`;
        context.textAlign = "center";
        context.fillStyle = "rgba(0, 0, 0, .5)";
        context.fillText("recoge cable en progredemente.com/cable", this.side * this.scaleFactor / 2 , this.side * this.scaleFactor - 40 * this.scaleFactor);
    }

    clear(context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, this.side * this.scaleFactor, this.side * this.scaleFactor)
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
                    this.setState({face}, () => {
                        this.cropperModalRef.current.showModal();
                    });
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
                        <img src={`${process.env.RESOURCES_URL}/cable.png`} alt="Cargando" />
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
                            <div
                                className="prg-button"
                                onClick={() => {
                                    this.upload()
                                }}
                            >
                                Elegir&nbsp;cara&nbsp;<Icon icon="F" />
                            </div>
                            {
                                this.state.face &&
                                <>
                                    <div
                                        className="prg-button"
                                        onClick={() => {
                                            this.cropperModalRef.current.showModal();
                                        }}
                                    >
                                        Editar&nbsp;cara&nbsp;<Icon icon="E" />
                                    </div>
                                    <div
                                        className="prg-button download"
                                        onClick={() => {
                                            this.download()
                                        }}
                                    >
                                        Descargar&nbsp;<Icon icon="D" />
                                    </div>
                                </>
                            }
                        </div>
                        {
                            this.state.face && 
                            <ImageCropperModal
                                setCrop={(crop) => this.setCrop(crop)}
                                face={this.state.face}
                                ref={this.cropperModalRef}
                            />
                        }
                    </div>
                }
            </>
        );
    }
}

export default App;

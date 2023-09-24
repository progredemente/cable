import React, { Component, createRef } from 'react';
import { Cropper } from 'react-cropper';
import './App.css';
import { GIFEncoder } from './GIFEncoder';
import 'cropperjs/dist/cropper.css';
import { Icon } from 'components/Icon';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            scaleFactor: .25,
            gif: null,
            face: null,
            crop: null,
            showModal: false
        }
        this.side = 1500;
        this.img = null;
        this.cropperRef = createRef();
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
        this.clear(context, this.state.scaleFactor);
        this.draw(0, context, this.state.scaleFactor);
        encoder.addFrame(context);
        this.clear(context, this.state.scaleFactor);
        this.draw(1, context, this.state.scaleFactor);
        encoder.addFrame(context);
        this.clear(context, this.state.scaleFactor);
        this.draw(4, context, this.state.scaleFactor);
        encoder.addFrame(context);
        this.clear(context, this.state.scaleFactor);
        this.draw(5, context, this.state.scaleFactor);
        encoder.addFrame(context);
        
        encoder.finish();
        let binaryGif = encoder.stream().getData();
        this.setState({ gif: `data:image/gif;base64,${window.btoa(binaryGif)}`})
    }

    
    draw(frameNumber, context, scaleFactor) {
        frameNumber = (frameNumber || 0) % 6;
        if(this.state.crop){
            if(frameNumber === 2 || frameNumber === 3){
                context.translate((803 + 598 / 2) * scaleFactor, (40 + 598 / 2) * scaleFactor);
                context.rotate(15 * Math.PI / 180);
                context.drawImage(this.state.crop, 0, 0, this.state.crop.width, this.state.crop.height, -598 / 2 * scaleFactor, -598 / 2 * scaleFactor, 598 * scaleFactor, 598 * scaleFactor);
                context.rotate(-15 * Math.PI / 180);
                context.translate(-(803 + 598 / 2) * scaleFactor, -(40 + 598 / 2) * scaleFactor);
            }
            else if(frameNumber === 4 || frameNumber === 5){
                context.translate((656 + 598 / 2) * scaleFactor, (37 + 598 / 2) * scaleFactor);
                context.rotate(-15 * Math.PI / 180);
                context.drawImage(this.state.crop, 0, 0, this.state.crop.width, this.state.crop.height, -598 / 2 * scaleFactor, -598 / 2 * scaleFactor, 598 * scaleFactor, 598 * scaleFactor);
                context.rotate(15 * Math.PI / 180);
                context.translate(-(656 + 598 / 2) * scaleFactor, -(37 + 598 / 2) * scaleFactor);
            }
            else {
                context.drawImage(this.state.crop, 0, 0, this.state.crop.width, this.state.crop.height, 732 * scaleFactor, 26 * scaleFactor, 598 * scaleFactor, 598 * scaleFactor);
            }
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
                    this.setState({face, showModal: true});
                }
            });
            fr.readAsDataURL(input.files[0]);
        }
        input.click();
    }

    hideModal = () => {
        let crop = new Image();
        crop.src = this.cropperRef.current.cropper.getCroppedCanvas().toDataURL();
        crop.onload = () => {
            this.setState({crop, showModal: false}, this.create);
        }
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
                                className="button"
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
                                        className="button"
                                        onClick={() => {
                                            this.setState({showModal: true});
                                        }}
                                    >
                                        Editar&nbsp;cara&nbsp;<Icon icon="E" />
                                    </div>
                                    <div
                                        className="button download"
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
                            <div
                                className={`modal${this.state.showModal ? "": " hidden"}`}
                                onClick={this.hideModal}
                                onMouseUp={() => {
                                    return false;
                                }}
                            >
                                <div
                                    className="modal-container"
                                    onClick={(evt) => {
                                        evt.stopPropagation();
                                    }}
                                >
                                    <div className="modal-title">Recortar imagen</div>
                                    <Cropper
                                        src={this.state.face.src}
                                        aspectRatio={1}
                                        style={{height: this.state.face.height * Math.min(this.state.face.width, window.innerWidth - 40) / this.state.face.width, width: Math.min(this.state.face.width, window.innerWidth - 40)}}
                                        zoomable={false}
                                        ref={this.cropperRef}
                                    />
                                    <div
                                        className="button"
                                        onClick={this.hideModal}
                                    >
                                        Aceptar
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </>
        );
    }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import { GIFer } from 'components/GIFer';


class App extends Component {

    create(encoder, context, image, customImage, scaleFactor, side, clear) {
        encoder.setRepeat(0);
        encoder.setDelay(100);
        clear(context);
        this.draw(0, context, image, customImage, scaleFactor, side);
        encoder.addFrame(context);
        clear(context);
        this.draw(1, context, image, customImage, scaleFactor, side);
        encoder.addFrame(context);
        clear(context);
        this.draw(2, context, image, customImage, scaleFactor, side);
        encoder.addFrame(context);
        clear(context);
        this.draw(3, context, image, customImage, scaleFactor, side);
        encoder.addFrame(context);
        clear(context);
        this.draw(0, context, image, customImage, scaleFactor, side);
        encoder.addFrame(context);
        clear(context);
        this.draw(1, context, image, customImage, scaleFactor, side);
        encoder.addFrame(context);
        clear(context);
        this.draw(4, context, image, customImage, scaleFactor, side);
        encoder.addFrame(context);
        clear(context);
        this.draw(5, context, image, customImage, scaleFactor, side);
        encoder.addFrame(context);
    }

    
    draw(frameNumber, context, image, customImage, scaleFactor, side) {
        frameNumber = (frameNumber || 0) % 6;
        if(customImage){
            if(frameNumber === 2 || frameNumber === 3){
                context.translate((803 + 598 / 2) * scaleFactor, (40 + 598 / 2) * scaleFactor);
                context.rotate(15 * Math.PI / 180);
                context.drawImage(customImage, 0, 0, customImage.width, customImage.height, -598 / 2 * scaleFactor, -598 / 2 * scaleFactor, 598 * scaleFactor, 598 * scaleFactor);
                context.rotate(-15 * Math.PI / 180);
                context.translate(-(803 + 598 / 2) * scaleFactor, -(40 + 598 / 2) * scaleFactor);
            }
            else if(frameNumber === 4 || frameNumber === 5){
                context.translate((656 + 598 / 2) * scaleFactor, (37 + 598 / 2) * scaleFactor);
                context.rotate(-15 * Math.PI / 180);
                context.drawImage(customImage, 0, 0, customImage.width, customImage.height, -598 / 2 * scaleFactor, -598 / 2 * scaleFactor, 598 * scaleFactor, 598 * scaleFactor);
                context.rotate(15 * Math.PI / 180);
                context.translate(-(656 + 598 / 2) * scaleFactor, -(37 + 598 / 2) * scaleFactor);
            }
            else {
                context.drawImage(customImage, 0, 0, customImage.width, customImage.height, 732 * scaleFactor, 26 * scaleFactor, 598 * scaleFactor, 598 * scaleFactor);
            }
        }
        context.drawImage(image, side * frameNumber, 0, side, side, 0, 0, side * scaleFactor, side * scaleFactor);
        this.drawUrl(context, scaleFactor, side);
    }

    drawUrl(context, scaleFactor, side) {
        context.font = `${80 * scaleFactor}px ComicTypo`;
        context.textAlign = "center";
        context.fillStyle = "rgba(0, 0, 0, .5)";
        context.fillText("recoge cable en progredemente.com/cable", side * scaleFactor / 2 , side * scaleFactor - 40 * scaleFactor);
    }

    render() {
        return (
                <GIFer
                    appId="cable"
                    loadingImageUrl={`${process.env.RESOURCES_URL}/cable.png`}
                    sourceImageUrl="./cable.png"
                    title='Recoge Cable'
                    create={this.create.bind(this)}

                    lang='es'
                    loadButtonText='Elegir&nbsp;cara'
                    withCropper={true}
                    editButtonText='Editar&nbsp;cara&nbsp;'
                    defaultImgs={[
                        './ana_pardo_de_vera.jpg',
                        './montero.jpg',
                        './maestre.jpg'
                    ]}
                    
                />
        );
    }
}

export default App;

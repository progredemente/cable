export function create(encoder, context, image, customImage, scaleFactor, side, clear) {
    encoder.setRepeat(0);
    encoder.setDelay(100);
    [0, 1, 2, 3, 0, 1, 4, 5].map((n) => {
        clear(context);
        draw(n, context, image, customImage, scaleFactor, side);
        encoder.addFrame(context);
    })
}

export function draw(frameNumber, context, image, customImage, scaleFactor, side) {
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
    drawUrl(context, scaleFactor, side);
}

export function drawUrl(context, scaleFactor, side) {
    context.font = `${80 * scaleFactor}px ComicTypo`;
    context.textAlign = "center";
    context.fillStyle = "rgba(0, 0, 0, .5)";
    context.fillText("recoge cable en progredemente.com/cable", side * scaleFactor / 2 , side * scaleFactor - 40 * scaleFactor);
}
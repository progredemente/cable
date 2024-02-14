import React, { Component } from 'react';
import './App.css';
import { GIFer } from 'components/GIFer';
import { create, draw, drawUrl } from './create';


class App extends Component {

    

    render() {
        return (
                <GIFer
                    appId="cable"
                    loadingImageUrl={`${process.env.RESOURCES_URL}/cable.png`}
                    sourceImageUrl="./cable.png"
                    title='Recoge Cable'
                    create={create}
                    deps={[draw, drawUrl]}
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

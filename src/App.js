import logo from './logo.svg';
import './App.css';
import Phaser from "phaser/dist/phaser-arcade-physics.min"
import {useEffect} from "react";

// UI
let UIScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function UIScene() {
            Phaser.Scene.call(this, {key: 'UIScene', active: true});
            this.score = 0;
        },
    create: function () {
        //  Our Text object to display the Score
        let info = this.add.text(10, 10, 'Score: 0', {font: '48px Arial', fill: '#ff0000'});
        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('GameScene');
    }
});

// GAME SCENES
let GameScene = new Phaser.Class({
    Extends: Phaser.Scene,
});
GameScene.prototype.create = function() {
    this.add.image(400, 300, 'sky');
    let particles = this.add.particles('red');
    let emitter = particles.createEmitter({
        speed: 10,
        scale: {start: 0.5, end: 0},
        blendMode: 'ADD'
    });
    let logo = this.physics.add.image(400, 100, 'logo');
    logo.setVelocity(300, 300);
    logo.setBounce(0.995, 0.990);
    logo.setCollideWorldBounds(true);
    emitter.startFollow(logo);
};
GameScene.prototype.preload = function() {
    this.load.setBaseURL(window.location.origin);
    this.load.image('sky', 'assets/logo512.png');
    this.load.image('logo', 'assets/logo192.png');
    this.load.image('red', 'assets/logo192.png');
};


function App() {
    useEffect(() => {
        let parent = window.document.getElementById("game");
        let game;
        let config;
        if(parent){
            config = {
                parent: parent,
                // Game size
                width: parent.clientWidth,
                height: parent.clientHeight,
                scale: {
                    // Or set parent divId here
                    parent: parent,
                    mode: Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                    zoom: 1,  // Size of game canvas = game size * zoom
                },
                type: Phaser.AUTO,
                backgroundColor: '#000000',
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: {y: 200}
                    }
                },
                scene: [
                    GameScene, UIScene
                ]
            };
            game = new Phaser.Game(config);
        }
        return () => {
            if(game){
                game.destroy(true, false);
            }
        }
    }, [])
    return (
        <div id={"game"}>

        </div>
    );
}

export default App;

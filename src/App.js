import logo from './logo.svg';
import './App.css';
import Phaser from "phaser/dist/phaser-arcade-physics.min"
import {useEffect} from "react";

function TextPlayer(props) {
    const play = (text) => {
        if ('speechSynthesis' in window) {
            // Speech Synthesis supported 🎉
            var msg = new SpeechSynthesisUtterance();
            msg.text = text;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(msg);
        } else {
            // Speech Synthesis Not Supported 😣
            alert("Sorry, your browser doesn't support text to speech!");
        }
    }
    return <button onClick={() => {
        play(props.text)
    }}>{props.text}</button>;
}

var UIScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function UIScene() {
            Phaser.Scene.call(this, {key: 'UIScene', active: true});

            this.score = 0;
        },
    create: function () {
        //  Our Text object to display the Score
        var info = this.add.text(10, 10, 'Score: 0', {font: '48px Arial', fill: '#ff0000'});
        //  Grab a reference to the Game Scene
        var ourGame = this.scene.get('GameScene');
        //  Listen for events from it
        /*ourGame.events.on('addScore', function () {
            this.score += 10;
            info.setText('Score: ' + this.score);
        }, this);*/
    }

});

function preload() {
    this.load.setBaseURL(window.location.origin);

    this.load.image('sky', 'assets/logo512.png');
    this.load.image('logo', 'assets/logo192.png');

    this.load.image('red', 'assets/logo192.png');
}

function create() {
    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 10,
        scale: {start: 0.5, end: 0},
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(300000, 300000);
    logo.setBounce(0.995, 0.990);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}

var GameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    preload: preload,
    create: create
});


function App() {
    useEffect(() => {
        let config = {
            type: Phaser.AUTO,
            width: 600,
            height: 500,
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

        let game = new Phaser.Game(config);
        return () => {
            game.destroy(true, false);
        }
    }, [])
    return (
        <div className="App">
            <TextPlayer text={"This is cultural appropriation."}></TextPlayer>
            <TextPlayer text={"I feel unconfortable."}></TextPlayer>
            <TextPlayer text={"I feel the uncomfort."}></TextPlayer>
            <TextPlayer text={"fuck off you nasty bastard."}></TextPlayer>
        </div>
    );
}

export default App;

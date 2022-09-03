export function TextPlayer(props) {
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
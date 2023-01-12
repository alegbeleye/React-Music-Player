import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() { 
  let songs = [
  {index:0, artist:"Dua Lipa", source:"https://m4a-64.jango.com/15/54/52/1554527792809241624.m4a", cover:"https://artist1.cdn107.com/c96/c965305563560b124462f5609760d499_lg.jpg"},
  {index:1,artist:"Miley Cyrus", source:"https://m4a-64.jango.com/16/79/22/1679228996511998056.m4a", cover:"https://album1.cdn107.com/46/32/46323f482ff4208d18ffca2138f08a89_xl.jpg"},
  {index:2,artist:"Justin Bieber", source:"https://m4a-64.jango.com/17/81/40/178140813020795606.m4a", cover:"https://artist1.cdn107.com/257/25709ac7ef0edf7b577e1de027529b4f_xl.jpg"},
  {index:3,artist:"Kygo", source:"https://m4a-64.jango.com/14/65/24/1465242786432736255.m4a", cover:"https://artist1.cdn107.com/3f4/3f46e6746c407c513c7bb8820170050f_xl.jpg?i=1"}
]

  const [currentAudio, setCurrentAudio] = useState(songs[0]);
  const [audioDuration, setAudioDuration] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [showNav, setShowNav] = useState(false);

  let audio = useRef(new Audio(currentAudio.source))

  const [currentAudioTime, setCurrentAudioTime] = useState(audio.current.currentTime);

  useEffect(()=>{
    setTimeout(updateCurrentTime, 200);
  })

  const pauseOrPlay = () => {
    isPlay ? audio.current.pause() : audio.current.play();
    setIsPlay(!isPlay);

    return;
  }

  const updateCurrentTime = () =>{
    setCurrentAudioTime(audio.current.currentTime);
    setAudioDuration(audio.current.duration);
  }

  const setMenu = () => {
    setShowNav(!showNav);
    return;
  }

  const previous = () => {
    let nxt = currentAudio.index !== 0 ? songs[currentAudio.index-1]:songs[songs.length-1];
    changeAudio(nxt);
  }

  const next = () => {
    let nxt = currentAudio.index === songs.length-1 ? songs[0]:songs[currentAudio.index+1];
    changeAudio(nxt);
  }

  const changeAudio = async (val) => {
    setCurrentAudio(val);
    audio.current.src = val.source
    audio.current.load();
    if(!isPlay) setIsPlay(!isPlay);
    audio.current.play();
    return;
  }

  const handleSliderChange = (e)=>{
    audio.current.currentTime = e.target.value;
    updateCurrentTime();
  }

  const audioTimeConverter = (time) => {
    var seconds = Math.floor(time%60);
    var minutes = Math.floor(time/60);
    var hours = Math.floor(time/(60*60));

    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div className="App">
      <div className='menu-control'>
      <span class="material-symbols-outlined nav-button" style={{color:showNav ? 'black' :'black'}} onClick={setMenu}>
        {showNav?'close':'menu'}
      </span>
      </div>
      <h1 className='header'>💠 * LANRE MUSIC PLAYER * 💠</h1>
      <div className={showNav ? 'menu-nav':'menu-nav-hide'}>
        {songs.map((val, idx)=> <p onClick={()=>changeAudio(val)} className={showNav ? 'menu-content':'menu-content-hidden'}>{val.artist}</p>)}
      </div>
      <div className='audio-container'>
      <div className='audio-display-container'> 
        <div className='cd-cover' style={{backgroundImage:`url(${currentAudio.cover})`, backgroundSize:"cover"}}>
        </div>
        <div className='spinning-cd'></div>
      </div>  
        <div className='audio-controls clickable'>
          <h1>{currentAudio.artist}</h1>
          <div className='audio-controls sliders'>
          <label className='timer-label' for="audio">{audioTimeConverter(currentAudioTime)}</label>
            <input className='audio-slider' type="range" min="0" max = {audio.current.duration} onChange={handleSliderChange} value={currentAudioTime}/>
          <label className='timer-label' for="audio">{audioTimeConverter(audioDuration)}</label>
          </div>
            <span class="material-symbols-outlined audio-button" onClick={previous}>skip_previous</span>
            <span class="material-symbols-outlined audio-button" onClick={pauseOrPlay}>{isPlay ? 'pause':'play_arrow'}</span>
            <span class="material-symbols-outlined audio-button" onClick={next}>skip_next</span>
          </div>
      </div>
    </div>
  );
}

export default App;

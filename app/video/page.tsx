"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect} from 'react';
import convertSeconds from '../utilFunctions/convertSeconds';
import { PlayFill, ChevronDoubleRight, ChevronDoubleLeft, PauseFill, VolumeUpFill, Fullscreen, ArrowLeft, FullscreenExit, VolumeMute} from 'react-bootstrap-icons';
export default function Page() {
  //get value from url
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  if (url === null) {
    router.push('/');
    return null;
  }

  //refernce variable
  const videoRef=useRef(null);
  const videoplayerRef=useRef(null);
  
  //state variables
  const [Play,setPlay]=useState(false);
  const [fullscreen,setFullscreen]=useState(false);
  const [Mute,setMute]=useState(true);
  const [Duration,setDuration]=useState("00:00:00");
  const [CurrentTime, setCurrentTime]=useState("00:00:00");
  const [PlaybackRate, setPlaybackRate]=useState(1);
  const timerRef = useRef(null);
  const playbackOptions=[0.25,0.5,0.75,1,1.25,1.5,1.75,2]

  // start and stop timer of video
  const startTimer = () => {
    if(timerRef){
      timerRef.current = setInterval(() => {
        const video = videoRef.current;
        if (video) {
          if (video.currentTime < video.duration) {
            var date_format=convertSeconds(Math.ceil(video.currentTime))
            setCurrentTime(date_format);
          } else {
            var date_format=convertSeconds(Math.ceil(video.duration))
            setCurrentTime(date_format);
            stopTimer();
          }
        }
      }, 1000);
    } 
  };
  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  //full screen mode
  const handlefullscreen=()=>{
    const videoplayer=videoplayerRef.current
    if(videoplayer){
      if(!fullscreen){
        videoplayer.requestFullscreen();
      }
      else{
        document.exitFullscreen();
      }
    }
    setFullscreen(!fullscreen)
  }

  //handle play
  const handleplay=()=>{
    setPlay(!Play)   
  }

  //play action change and all variable dependent on it
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (!Play) {
        video.play();
        startTimer();
      } else {
        video.pause();
        stopTimer();
      }
    }
  }, [Play]);

  //to get duration of video on refreshing the page
  useEffect(() => { 
    const video=videoRef.current;
      if(video){
        var date_format=convertSeconds(Math.ceil(video.duration))
        setDuration(date_format);
      }
  }, []);

  //to load meta data at start
  const handleLoadedMetadata=()=>{
    const video=videoRef.current;
    if(video){
      var date_format=convertSeconds(Math.ceil(video.duration))
      setDuration(date_format);
    }
  }

  //playback rate
  const handlePlaybackRate=(event)=>{
    const video=videoRef.current;
    if(video){
      video.playbackRate=event.target.value;
    }
    setPlaybackRate(event.target.value);
  }
  
  return (
    <div ref={videoplayerRef} className='flex flex-col bg-black justify-center h-screen'>
      <video muted={Mute} 
          ref={videoRef}
          className="h-full"
          onLoadedMetadata={handleLoadedMetadata}
          onClick={handleplay}>
        <source src={url} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      <button className='text-2xl py-2 fixed top-8 left-48'onClick={()=>{ router.push('/')}}>
            <div className='flex items-center'>
              <ArrowLeft/><p className='text-xl mx-4'>Title</p>
            </div>
      </button>
      <div className='fixed bottom-0 w-full mb-8'>
        {(CurrentTime==="NaN:NaN:NaN"||Duration==="NaN:NaN:NaN")?<p className='mx-48 mb-2'></p>:<p className='mx-48 mb-2'>{CurrentTime} / {Duration}</p>}
        <div className='flex  justify-between mx-48'>
          <div className='flex justify-between w-1/4'>
            <button className='text-2xl'onClick={handleplay}><ChevronDoubleLeft/></button>
            <button className='text-6xl' onClick={handleplay}>{Play?<PlayFill/>:<PauseFill/>}</button>
            <button className='text-2xl' onClick={handleplay}><ChevronDoubleRight/></button>
            <button className='text-2xl'onClick={()=>{setMute(!Mute)}}>{Mute?<VolumeMute/>:<VolumeUpFill/>}</button>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center'>
              <select defaultValue={1} className='text-xs rounded outline-0 bg-transparent mx-14 py-1 cursor-pointer border ' onChange={handlePlaybackRate}>
                  {playbackOptions.map((option) => (
                    <option className='bg-neutral-800' key={option} value={option}>
                      {option}x
                    </option>
                  ))}
              </select>
              <button className='text-xl'onClick={handlefullscreen}>{fullscreen?<FullscreenExit/>:<Fullscreen/>}</button> 
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

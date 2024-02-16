"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect} from 'react';
import convertSeconds from '../utilFunctions/convertSeconds';
import { PlayFill, ChevronDoubleRight, ChevronDoubleLeft, PauseFill, VolumeUpFill, Fullscreen, ArrowLeft, FullscreenExit, VolumeMute} from 'react-bootstrap-icons';
export default function Page() {

  //refernce variable
  const videoRef=useRef(null);
  const videoplayerRef=useRef(null);
  const timerRef = useRef(null);
  const showtimeRef = useRef(null);
  const centertimeRef = useRef(null);
  
  
  //state variables
  const [Play,setPlay]=useState(false);
  const [fullscreen,setFullscreen]=useState(false);
  const [Mute,setMute]=useState(true);
  const [Duration,setDuration]=useState("00:00:00");
  const [CurrentTime, setCurrentTime]=useState("00:00:00");
  const [PlaybackRate, setPlaybackRate]=useState(1);
  const [ControlsVisible,setControlsVisible]=useState(false);
  const [CenterIcon,setCenterIcon]=useState(false);
  const [CenterTag,setCenterTag]=useState(<PlayFill/>)
  const [Vol,setVol]=useState(100);
  const [SeekVal,setSeekVal]=useState(0.0);
  const [ShowVolbar,setShowVolbar]=useState(false);
  const playbackOptions=[0.25,0.5,0.75,1,1.25,1.5,1.75,2]


  // start and stop timer of video
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      const video = videoRef.current;
      if (video) {
        setSeekVal((Math.ceil(video.currentTime)/Math.ceil(video.duration))*100)
        if (video.currentTime < video.duration) {
          var date_format=convertSeconds(Math.ceil(video.currentTime))
          setCurrentTime(date_format);
        } else {
          var date_format=convertSeconds(Math.ceil(video.duration))
          setCurrentTime(date_format);
          setPlay(!Play)
        }
      }
    }, 1000); 
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
        setCenterTag(<PlayFill/>)
        startTimer();
      } else {
        video.pause();
        setCenterTag(<PauseFill/>)
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
    setCenterTag(<p className='text-5xl'>{event.target.value}x</p>)
    setPlaybackRate(event.target.value);
  }

  // change volume
  const handlevolume=(event)=>{
    const video=videoRef.current
    if(video){
      const vol=parseFloat(event.target.value)
      video.volume=vol;
      setVol(vol)
      setMute(vol===0.0)
      if(vol===0.0){
        setCenterTag(<VolumeMute/>)
      }
      
    }
  }

  // change seek
  const handleseek=(event)=>{
    const video=videoRef.current
    if(video){
      const seek=parseFloat(event.target.value)
      setSeekVal(seek)
      const currentseek=(video.duration)*(seek/100)
      video.currentTime=currentseek 
    }
  }

  //to hide controls on no mouse movement
  const showControls=()=>{
    setControlsVisible(true);
    clearTimeout(showtimeRef.current)
    showtimeRef.current=setTimeout(() => {
      setControlsVisible(false);
    }, 5000);
  }

  //to show icons on the center of the page
  useEffect(() => { 
    setCenterIcon(true)
    clearTimeout(centertimeRef.current)
    centertimeRef.current=setTimeout(() => {
      setCenterIcon(false);
    }, 500)
  }, [CenterTag]);

  //get value from url
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  if (url === null) {
    router.push('/');
    return null;
  }
  
  return (
    <div ref={videoplayerRef} 
    className='flex flex-col bg-black justify-center h-screen'
    onMouseMove={showControls}
    onClick={showControls}
    >
      <video muted={Mute} 
          ref={videoRef}
          className="h-full"
          onLoadedMetadata={handleLoadedMetadata}
          onClick={handleplay}>
        <source src={url} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>      
      <div className={`fixed bottom-0 w-full`}>
        {/* black shadow on top controls */}
        <div className={`fixed -top-24 w-screen bg-black h-48 blur-2xl bg-opacity-70  duration-700 ease-in-out ${ControlsVisible?"translate-y-0":"-translate-y-40"}`}></div>
        <button className={`text-2xl w-full px-48 py-12 fixed top-0 left-0  duration-700 ease-in-out ${ControlsVisible?"translate-y-0":"-translate-y-40"}`} 
              onClick={()=>{ router.push('/')}}>
                <div className='flex items-center'>
                  <ArrowLeft/><p className='text-xl mx-4'>Title</p>
                </div>
        </button>
        {/* center icons */}
        <div className={`text-8xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-scale duration-500 ${CenterIcon ? 'scale-100' : 'scale-0'}`} onClick={handleplay}>{CenterTag}</div>
        {/* black shadow on controls */}
        <div className={`fixed -bottom-24 w-screen bg-black h-48 blur-2xl bg-opacity-70  duration-700 ease-in-out ${ControlsVisible?"translate-y-0":"translate-y-40"}`}></div>
        
        <div className={`py-4 mx-48 duration-700 ease-in-out ${ControlsVisible?"translate-y-0":"translate-y-40"}`}>  
          <div className="mb-2">
            <input className='w-full h-1 cursor-pointer' 
                   type="range" 
                   value={SeekVal} 
                   onChange={handleseek} />
            <p>{(CurrentTime==="NaN:NaN:NaN"||Duration==="NaN:NaN:NaN")?'':`${CurrentTime} / ${Duration}`}</p>
          </div>
          <div className='flex  justify-between'>
            <div className='flex justify-between w-1/3'>
              <button className='text-2xl'onClick={()=>{videoRef.current.currentTime=videoRef.current.currentTime-10; setCenterTag(<ChevronDoubleLeft className='text-6xl'/>)}}><ChevronDoubleLeft/></button>
              <button className='text-6xl' onClick={handleplay}>{Play?<PlayFill/>:<PauseFill/>}</button>
              <button className='text-2xl' onClick={()=>{videoRef.current.currentTime=videoRef.current.currentTime+10; setCenterTag(<ChevronDoubleRight className='text-6xl'/>)}}><ChevronDoubleRight/></button>
              <div className='flex items-center' onMouseEnter={()=>setShowVolbar(true)} onMouseLeave={()=>setShowVolbar(false)}>
                <button className='text-2xl'onClick={()=>{setMute(!Mute);  Mute?setCenterTag(<VolumeUpFill/>):setCenterTag(<VolumeMute/>)}}>{Mute?<VolumeMute/>:<VolumeUpFill/>}</button>
                <input className={`ml-2 w-20 h-0.5 cursor-pointer transition-scale duration-700 ease-in-out origin-left ${ShowVolbar?"scale-x-100":"scale-x-0"}`} 
                    type="range" 
                    value={Mute?0:Vol} 
                    onChange={handlevolume} 
                    min={0} 
                    max={1} 
                    step={0.01} />
              </div>  
            </div>
            <div className='flex items-center'>
              <div className='flex items-center'>
                <select defaultValue={PlaybackRate} className='text-sm s outline-0 bg-transparent mx-14 py-1 cursor-pointer' onChange={handlePlaybackRate}>
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
    </div>
  );
};

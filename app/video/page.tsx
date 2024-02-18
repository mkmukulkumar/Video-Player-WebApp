"use client"

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect, Suspense} from 'react';
import convertSeconds from '../utilFunctions/convertSeconds';
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store';
import { PlayFill, ChevronDoubleRight, ChevronDoubleLeft, PauseFill, VolumeUpFill, Fullscreen, ArrowLeft, FullscreenExit, VolumeMute, ChevronRight} from 'react-bootstrap-icons';
import { useAppSelector } from "@/redux/store";
import { addtoPlaylist } from '@/redux/features/playlistslice';
export default function Page() {

  const playlist=useAppSelector((state)=>state.playlist.value) 
  const dispatch=useDispatch<AppDispatch>();
  // reference variables
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoplayerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const showtimeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const centertimeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // state variables
  const [Play, setPlay] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [Mute, setMute] = useState<boolean>(true);
  const [Duration, setDuration] = useState<string>("00:00:00");
  const [CurrentTime, setCurrentTime] = useState<string>("00:00:00");
  const [PlaybackRate, setPlaybackRate] = useState<number>(1);
  const [ControlsVisible, setControlsVisible] = useState<boolean>(true);
  const [CenterIcon, setCenterIcon] = useState<boolean>(false);
  const [CenterTag, setCenterTag] = useState<JSX.Element>(<PlayFill />);
  const [Vol, setVol] = useState<number>(100);
  const [SeekVal, setSeekVal] = useState<number>(0.0);
  const [ShowVolbar, setShowVolbar] = useState<boolean>(false);
  const [ShowPlaylist,setShowPlaylist]=useState<boolean>(true)
  const playbackOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];


  // start and stop timer of video
  const startTimer = () => {
    if(timerRef){
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
            setPlay(false)
            dispatch(addtoPlaylist(playlist[0]))
          }
        }
      }, 1000); 
  }
  };
  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
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
  // to play from playlist
  useEffect(() => {
    if (videoRef.current && playlist.length > 0 && playlist[0].sources.length > 0) {
      videoRef.current.load();
    }
  }, [playlist]);
  
  //if no data in playlist
  const router = useRouter();
  useEffect(() => {
    if (playlist.length <= 0) {
      router.push('/');
    }
  }, [playlist, router]);

  //play action change and all variable dependent on it
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (!Play) {
        video.play();
        setCenterTag(<PlayFill/>)
        startTimer();
      } 
      else {
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
  const handlePlaybackRate=(event: React.ChangeEvent<HTMLSelectElement>)=>{
    const video=videoRef.current;
    if(video){
      video.playbackRate=parseFloat(event.target.value);
    }
    setCenterTag(<p className='text-5xl'>{event.target.value}x</p>)
    setPlaybackRate(parseFloat(event.target.value));
  }

  // change volume
  const handlevolume=(event: { target: { value: string; };})=>{
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
  const handleseek=(event: { target: { value: string; }; })=>{
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
    if (showtimeRef.current !== null) {
      clearInterval(showtimeRef.current);
    }
    showtimeRef.current=setTimeout(() => {
      setControlsVisible(false);
    }, 5000);
  }

  //to show icons on the center of the page
  useEffect(() => { 
    setCenterIcon(true)
    if (centertimeRef.current !== null) {
      clearTimeout(centertimeRef.current)
    }
    centertimeRef.current=setTimeout(() => {
      setCenterIcon(false);
    }, 500)
  }, [CenterTag]);

  //handle reverse
  const handlereverse=()=>{
    const video=videoRef.current
    if(video){
      video.currentTime=video.currentTime-10;
      setSeekVal((Math.ceil(video.currentTime)/Math.ceil(video.duration))*100)
      setCenterTag(<ChevronDoubleLeft className='text-6xl'/>)
    }
  }
  
  //handle forward
  const handleforward=()=>{
    const video=videoRef.current
    if(video){
      video.currentTime=video.currentTime+10;
      setSeekVal((Math.ceil(video.currentTime)/Math.ceil(video.duration))*100)
      setCenterTag(<ChevronDoubleRight className='text-6xl'/>)
    }
  }

  // add shortcuts for player
  useEffect(() => {
    console.log("run")
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        handleplay();
      }
      if (event.key === 'f'||event.key === 'F') {
        handlefullscreen();
      }
      else if (event.key === 'ArrowRight') {
        handleforward();
        showControls();
      }
      else if (event.key === 'ArrowLeft') {
        handlereverse();
        showControls();
      }
      else if (event.key === 'm'||event.key === 'M') {
        setMute(!Mute)
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handlereverse,handleplay,handleforward,handlereverse,handlefullscreen,Mute]);

  
  

  return (
      
      <div>
        <div  ref={videoplayerRef} 
              className='flex flex-col bg-black justify-center h-screen'
              onMouseMove={showControls}
              onClick={showControls}
              >     
          <Suspense fallback={<div>Loading...</div>}>     
              <video muted={Mute} 
                  ref={videoRef}
                  className="h-full"
                  onLoadedMetadata={handleLoadedMetadata}
                  onClick={handleplay}
                  autoPlay
                  >
                  {playlist.length > 0 ? (
                    <source src={playlist[0].sources[0]} type="video/mp4"/>
                  ) : (
                    <p>Your playlist is empty</p>
                  )}
                Your browser does not support the video tag.
              </video>      
              <div className={`fixed bottom-0 w-full`}>
                {/* black shadow on top controls */}
                <div className={`fixed -top-24 w-screen bg-black h-48 blur-2xl bg-opacity-70  duration-700 ease-in-out ${ControlsVisible?"translate-y-0":"-translate-y-40"}`}></div>
                <button className={`text-2xl w-full px-2 md:px-10 xl:px-48 lg:px-28 py-12 fixed top-0 left-0  duration-700 ease-in-out ${ControlsVisible?"translate-y-0":"-translate-y-40"}`} 
                      onClick={()=>{ router.push('/')}}>
                        <div className='flex items-center'>
                        <ArrowLeft/>
                        {playlist.length > 0 ? (
                          <p className='text-sm xl:text-lg lg:text-lg mx-4'>{playlist[0].title}</p>
                        ) : (
                          <p>Your playlist is empty</p>
                        )}
                          
                        </div>
                </button>
                {/* center icons */}
                <div className={`text-8xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-scale duration-500 ${CenterIcon ? 'scale-100' : 'scale-0'}`} onClick={handleplay}>{CenterTag}</div>
                {/* black shadow on controls */}
                <div className={`fixed -bottom-24 w-screen bg-black h-48 blur-2xl bg-opacity-70  duration-700 ease-in-out ${ControlsVisible?"translate-y-0":"translate-y-40"}`}></div>
                
                <div className={`py-4 mx-2 md:mx-10 xl:mx-48 lg:mx-28 duration-700 ease-in-out ${ControlsVisible?"translate-y-0":"translate-y-40"}`}>  
                  <div className="mb-2">
                    <input className='w-full h-1 cursor-pointer' 
                          type="range" 
                          value={SeekVal} 
                          onChange={handleseek} />
                    <p>{(CurrentTime==="NaN:NaN:NaN"||Duration==="NaN:NaN:NaN")?'':`${CurrentTime} / ${Duration}`}</p>
                  </div>
                  <div className='flex  justify-between'>
                    <div className='flex justify-between lg:w-1/3 md:w-1/2 w-3/4'>
                      <button className='text-2xl' onClick={handlereverse}><ChevronDoubleLeft/></button>
                      <button className='text-6xl' onClick={handleplay}>{Play?<PlayFill/>:<PauseFill/>}</button>
                      <button className='text-2xl' onClick={handleforward}><ChevronDoubleRight/></button>
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
                        <select defaultValue={PlaybackRate} className='text-sm s outline-0 bg-transparent sm:mx-14 mx-2 py-1 cursor-pointer' onChange={handlePlaybackRate}>
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
          </Suspense> 
        </div>

        <div className={`fixed top-0 h-screen flex flex-row  duration-700 ease-in-out ${ShowPlaylist?"md:-translate-x-96 -translate-x-64":"md:translate-x-0"}`}>                      
          <div className='bg-neutral-900 p-3 bg-opacity-80 md:w-96 w-64 overflow-scroll scrollbar-hide'>
            <div className='my-4 sticky flex items-center cursor-pointer' onClick={()=>{setShowPlaylist(!ShowPlaylist)}}>
              <ArrowLeft/><p className='ml-2 text-sm xl:text-lg lg:text-lg'>My Playlist</p>
            </div>
            <div>
              {playlist.map((item)=>
                  <div className={`p-1 mb-1 flex bg-opacity-40 bg-neutral-900 rounded p-1 hover:bg-neutral-800 transform transition-transform ease-in-out duration-300 hover:drop-shadow-2xl`} 
                  key={item.title}
                  onClick={()=>dispatch(addtoPlaylist(item))}
                  >
                      <div className="w-24">
                          <img className="object-cover rounded-lg" 
                              src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${item.thumb}`} 
                              alt={item.title} 
                              />
                      </div>     
                      <div className={`ml-2 flex justify-between  items-center`}>
                          <div className={`flex flex-col 'm-1'`}>
                              <p className="text-xs font-medium" >{item.title}</p>   
                              <p className='text-xs text-neutral-400'>{item.subtitle}</p>
                          </div>
                      </div>
                  </div>                 
                  )}
              </div> 
              
          </div>
          <div className={`h-screen text-3xl items-center flex cursor-pointer`} onClick={()=>{setShowPlaylist(!ShowPlaylist)}}><ChevronRight/></div>
        </div>
      </div>
  );
};

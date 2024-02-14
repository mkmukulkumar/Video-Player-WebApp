"use client"
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect} from 'react';
import { PlayFill, ChevronDoubleRight, ChevronDoubleLeft, PauseFill, VolumeUpFill, Fullscreen, ArrowLeft, FullscreenExit} from 'react-bootstrap-icons';
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoRef=useRef(null);
  const url = searchParams.get('url');
  if (url === null) {
    router.push('/');
    return null;
  }
  const [Play,setPlay]=useState(false);
  const [fullscreen,setFullscreen]=useState(true);
  const handleplay=()=>{
    setPlay(!Play)   
  }
  const handlefullscreen=()=>{
    setFullscreen(!fullscreen)
  }
  useEffect(() => {
    const video=videoRef.current;
    if(video){
      if(!Play)
        video.play();
      else
        video.pause();
    }
  }, [Play]);
  return (
    <div className='flex flex-col bg-black justify-center'>
      <video ref={videoRef} className="h-screen">
        <source
          src={url}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <button className='text-2xl py-2 fixed top-8 left-48'onClick={()=>router.push('/')}>
            <div className='flex items-center'>
              <ArrowLeft/><text className='text-xl mx-4'>Title</text>
            </div>
      </button>
      
      <div className='fixed bottom-0 w-full mb-8'>
        <div className='flex  justify-between mx-48'>
          <div className='flex justify-between w-1/4'>
            <button className='text-2xl'onClick={handleplay}><ChevronDoubleLeft/></button>
            <button className='text-6xl' onClick={handleplay}>{Play?<PlayFill/>:<PauseFill/>}</button>
            <button className='text-2xl' onClick={handleplay}><ChevronDoubleRight/></button>
            <button className='text-2xl'onClick={handleplay}><VolumeUpFill/></button>
          </div>
            <button className='text-xl'onClick={handlefullscreen}>{fullscreen?<FullscreenExit/>:<Fullscreen/>}</button>
        </div>
      </div>  
    </div>
  );
};

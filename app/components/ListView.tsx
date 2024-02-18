import Link from 'next/link';
import React, { useState } from 'react';
import {ChevronLeft, FileEarmarkPlus, Grid, List, Trash} from 'react-bootstrap-icons';
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store';
import { addtoPlaylist, removefromPlaylist } from '@/redux/features/playlistslice';
import { useAppSelector } from "@/redux/store";


interface ListItem{
    description: string;
    sources: string[];
    subtitle: string;
    thumb: string;
    title: string;
  }

interface ListViewProps {
  data: ListItem[];
  search: string;
}

export default function ListView({data, search}:ListViewProps) {
  //state variables
  const dispatch=useDispatch<AppDispatch>();
  const [toggleViewMode,setToggleViewMode]=useState(true)
  const playlist=useAppSelector((state)=>state.playlist.value)  
  return (
      <div className='w-full '> 
      {/* My Playlist list */}
      {/* if searching then dont' show playlist */}
      {search==""?
        <div className={`mt-5 px-2 md:px-10 xl:px-48 lg:px-28`}>
          <p className='text-xs md:text-sm xl:text-lg lg:text-lg'>My Playlist</p>
              <div className={`pl-4 py-8 flex justify-start overflow-scroll  gap-x-2 scrollbar-hide items-center`}>
              <p className='text-4xl pr-8' ><ChevronLeft/></p>
                {playlist.map((item)=>
                <div className={`bg-neutral-900 rounded p-1 hover:bg-neutral-800 transform transition-transform ease-in-out duration-300 hover:z-10 hover:scale-125 hover:drop-shadow-2xl`} 
                key={item.title}
                >
                  <Link href={{pathname:'/video'}} className={`flex flex-col p-1`}>
                    <div className="w-28 md:w-36 xl:w-64 lg:w-48"> 
                        <img className="object-cover rounded-lg" 
                            src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${item.thumb}`} 
                            alt={item.title} 
                            />
                    </div> 
                  </Link>     
                    <div className={`flex justify-between  items-center`}>
                      <Link href={{pathname:'/video'}}>
                        <div className={`flex flex-col 'm-1'`}>
                            <p className="xl:text-sm text-xs font-medium" >{item.title}</p>   
                            <p className='text-xs text-neutral-400'>{item.subtitle}</p>
                        </div>
                      </Link>
                      <p className="cursor-pointer text-sm md:text-lg xl:px-2 py-1 px-0 " onClick={()=>dispatch(removefromPlaylist(item))}><Trash/></p> 
                    </div>
                </div>                
                )}
              </div> 
        </div>:<div></div>
      }
      {/* Grid/ List Layout changer */}
        <div className={`flex justify-between mx-2 md:mx-10 xl:mx-48 lg:mx-28 mb-10 ${search===""?'':'mt-5'}`}>
          <p className={`text-xs md:text-sm xl:text-lg lg:text-lg ${search===""?'visible':'invisible'}`} >Recommended</p>
          <div className='flex'>        
            <button
              className={`flex p-1 font-bold text-white ${toggleViewMode?'bg-red-500':'bg-red-800'} hover:bg-red-700`}
              onClick={()=>setToggleViewMode(true)}
              > 
                <Grid/>
            </button>
            <button
              className={`flex p-1 font-bold text-white ${toggleViewMode?'bg-red-800':'bg-red-500'} hover:bg-red-700`}
              onClick={()=>setToggleViewMode(false)}
              > 
              <List/>
            </button>
          </div>   
        </div>  
        {/* Recommended List */}
        <ul className={`list-none grid ${toggleViewMode?'md:grid-cols-4 grid-cols-3  gap-y-8 gap-x-2':'grid-cols-1 gap-2'} mx-2 md:mx-10 xl:mx-48 lg:mx-28 `}>
          {data.map((item) => (
              <li className={`bg-neutral-900 rounded p-1 hover:bg-neutral-800 transform transition-transform ease-in-out duration-300 hover:z-10 ${toggleViewMode?"hover:scale-125":"flex hover:scale-105"} hover:drop-shadow-2xl`} 
                key={item.title}
                onClick={()=>dispatch(addtoPlaylist(item))}
                >
                  <Link href={{pathname:'/video'}} className={`flex items-center ${toggleViewMode?"flex-col":"flex-row"} basis-1/4 p-1`}>
                    <div>
                        <img className="object-cover rounded-lg" 
                              src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${item.thumb}`} 
                              alt={item.title} 
                              />
                    </div> 
                  </Link>     
                  <div className={`flex justify-between basis-3/4 ${toggleViewMode?'items-center':'item-start'}`}>
                    <Link href={{pathname:'/video'}}>
                      <div className={`flex flex-col  ${toggleViewMode?'m-1':'mx-5 my-6'}`}>
                          <p className="xl:text-sm text-xs font-medium" >{item.title}</p>   
                          <p className='text-xs text-neutral-400'>{item.subtitle}</p>
                          {toggleViewMode?'':<p className='text-xs  font-thin mt-3'>{item.description}</p>}
                      </div>
                    </Link>
                    <p className="cursor-pointer text-sm md:text-lg xl:px-2 py-1 px-0" ><FileEarmarkPlus/></p> 
                  </div>
              </li>
          ))}
        </ul> 
      </div>
    );
  };
  
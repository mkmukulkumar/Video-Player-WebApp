import Link from 'next/link';
import React, { useState } from 'react';
import { Draggable } from "react-drag-reorder";
import {ChevronLeft, Grid, List, ThreeDotsVertical} from 'react-bootstrap-icons';
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
  //view mode state
  const [toggleViewMode,setToggleViewMode]=useState(true)
  const [Data,setData]=useState(data);
  return (
      <div className='w-full '> 
      {search==""?
        <div className={`px-48 my-10 ${search===""?'visible':'invisible'}`}>
          <p className='text-lg'>Recommended{search}</p>
              <ul className={`pl-4 list-none py-5 flex w-full overflow-scroll gap-x-2 scrollbar-hide items-center`}>
              <p className='text-4xl pr-8'><ChevronLeft/></p>
                <Draggable>
                {Data.map((item) => (
                    <li className={`bg-neutral-900 rounded p-1 hover:bg-neutral-800 transform origin-right transition-transform ease-in-out duration-300 ${toggleViewMode?"hover:scale-125":"hover:scale-105"} hover:drop-shadow-2xl`} 
                        key={item.title}>
                          <Link href={{pathname:'/video', query:{url:item.sources[0]}}} className={`flex flex-col p-1`}>
                            <div className="w-56">
                                <img className="object-cover rounded-lg" 
                                    src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${item.thumb}`} 
                                    alt={item.title} 
                                    />
                            </div> 
                            <div className={`flex justify-between items-center`}>
                              <div className={`flex flex-col m-1`}>
                                  <p className="text-sm font-medium">{item.title}</p>   
                                  <p className='text-xs text-neutral-400'>{item.subtitle}</p>
                              </div>
                              <p><ThreeDotsVertical/></p> 
                            </div>
                          </Link>   
                    </li>
                ))}
                </Draggable>
              </ul> 
        </div>:<div></div>
      }
        <div className='flex justify-between mx-48 my-5'>
          <p className='text-lg'>Trending</p>
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
        <ul className={`list-none grid ${toggleViewMode?'grid-cols-4 gap-y-8 gap-x-2':'grid-cols-1 gap-2'} mx-48`}>
          {data.map((item) => (
              <li className={`bg-neutral-900 rounded p-1 hover:bg-neutral-800 transform transition-transform ease-in-out duration-300 hover:z-10 ${toggleViewMode?"hover:scale-125":"hover:scale-105"} hover:drop-shadow-2xl`} 
                  key={item.title}>
                    <Link href={{pathname:'/video', query:{url:item.sources[0]}}} className={`flex ${toggleViewMode?"flex-col":"flex-row"} p-1`}>
                      <div className="basis-1/4">
                          <img className="object-cover rounded-lg" 
                               src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${item.thumb}`} 
                               alt={item.title} 
                               />
                      </div> 
                      <div className={`flex justify-between basis-3/4 ${toggleViewMode?'items-center':'item-start'}`}>
                        <div className={`flex flex-col  ${toggleViewMode?'m-1':'mx-5 my-6'}`}>
                            <p className="text-sm font-medium">{item.title}</p>   
                            <p className='text-xs text-neutral-400'>{item.subtitle}</p>
                            {toggleViewMode?'':<p className='text-xs  font-thin mt-3'>{item.description}</p>}
                        </div>
                        <p><ThreeDotsVertical/></p> 
                      </div>
                    </Link>   
              </li>
          ))}
        </ul> 
      </div>
    );
  };
  
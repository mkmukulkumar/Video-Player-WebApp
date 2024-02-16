import Link from 'next/link';
import React, { useState } from 'react';
import {Grid, List, Option, ThreeDots, ThreeDotsVertical} from 'react-bootstrap-icons';
interface ListItem{
    description: string;
    sources: string[];
    subtitle: string;
    thumb: string;
    title: string;
  }

interface ListViewProps {
  data: ListItem[];
}

export default function ListView({data}:ListViewProps) {
  //view mode state
  const [toggleViewMode,setToggleViewMode]=useState(true)

  return (
      <div> 
        <div className='flex justify-end mx-48 my-2'>
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
        <ul className={`list-none grid ${toggleViewMode?'grid-cols-4 gap-y-8 gap-x-2':'grid-cols-1 gap-2'} mx-48`}>
          {data.map((item) => (
              <li className={`bg-neutral-900 rounded p-1 hover:bg-neutral-800 transform transition-transform ease-in-out duration-300 hover:z-10 hover:${toggleViewMode?"scale-125":"scale-105"} hover:drop-shadow-2xl`} 
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
  
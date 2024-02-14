import Link from 'next/link';
import React, { useState } from 'react';
import {Grid, List} from 'react-bootstrap-icons';
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
        <ul className={`list-none grid gap-5 ${toggleViewMode?'grid-cols-4':'grid-cols-1'} mx-48`}>
          {data.map((item) => (
              <li className="bg-neutral-900 p-1  hover:bg-neutral-900 transform transition-transform ease-in-out duration-300 hover:scale-105" 
                  key={item.title}>
                    <Link href={{pathname:'/video', query:{url:item.sources[0]}}} className={`flex ${toggleViewMode?"flex-col":"flex-row"} p-1`}>
                      <div className="basis-1/4">
                          <img className="object-cover" src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${item.thumb}`} alt={item.title} />
                      </div> 
                      <div className={`flex flex-col basis-3/4 ${toggleViewMode?'m-1':'mx-5 my-6'}`}>
                          <p className="text-sm font-bold">{item.title}</p>   
                          <p className='text-xs mt-1'>{item.subtitle}</p>
                          {toggleViewMode?'':<p className='text-xs font-thin mt-3'>{item.description}</p>}
                      </div>  
                    </Link>   
              </li>
          ))}
        </ul>
      </div>
    );
  };
  
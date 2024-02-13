import React from 'react';

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
    return (
      <ul className="list-none space-y-5 mx-48">
        {data.map((item) => (
            <li className="bg-stone-950 p-1 hover:bg-stone-900 transform transition-transform ease-in-out duration-300 hover:scale-105" key={item.title}>
                <a href={item.sources[0]} className="flex flex-row p-1">
                <div className="basis-1/4">
                    <img className="object-cover" src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${item.thumb}`} alt={item.title} />
                </div> 
                <div className="flex flex-col basis-3/4 justify-center mx-10">
                    <p className="text-sm font-bold">{item.title}</p>   
                    <p className='text-xs mt-1'>{item.subtitle}</p>
                    <p className='text-xs font-thin mt-3'>{item.description}</p>  
                </div>  
                </a>    
            </li>
        ))}
      </ul>
    );
  };
  
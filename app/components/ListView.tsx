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

export default function ListView({ data }:ListViewProps) {
    return (
      <ul className="list-disc space-y-10">
        {data.map((item) => (
          <li className="bg-violet-800 flex flex-row" key={item.title}>
            <a className="bg-yellow-800 basis-1/4" href={item.sources[0]}>
                <img src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${item.thumb}`} alt={item.title} />
            </a> 
            <div className="flex flex-col basis-3/4 justify-center mx-10">
                <p className="text-xl">{item.title}</p>   
                <p className='text-lg'>{item.subtitle}</p>
                <p className='text-sm'>{item.description}</p>  
            </div>      
          </li>
        ))}
      </ul>
    );
  };
  
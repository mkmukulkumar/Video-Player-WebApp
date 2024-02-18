# Video Player WebApp
A Video Player application to play videos and manage playlist

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Lighthouse Score](#lighthouse-score)
- [Features you might have missed](#features-you-might-have-missed)

## Introduction
This web application is built using Next and Redux on Typescript to create a video player. It allows users to search and play videos, manage a playlist, and toggle between grid and list views.  
Vercel Hosted link: [https://video-player-web-app.vercel.app/](https://video-player-web-app.vercel.app/)

## Features

1. **Video Player Component**
    - No External library used
    - Play/Pause Toggle
    - Seek functionality
    - Current time and duration display
    - Autoplay
    - Speed Selector
    - +/- 10 sec skip dedicated buttons
    - Fullscreen mode
    - Mute option
    - 0-100 Volume control visible on hovering volume button
    - Controls hide after 5-sec inactiveness
    - Black tint on controls for better visibility
    - Transparent Playlist Panel on left side
         - Shown on clicking Cheron Right button and closed by clicking it again or by clicking My Playlist at the top   
         - Playlist data is from the Redux Store and shows all your added videos
         - Thumbnail Preview
         - Remove from playlist functionality
         - No Song in playlist case handled
2. **Playlist Component**
    - Playlist management (add, remove)
    - Horizontally scrollable playlist
    - Play and load the video by clicking on the video
    - Search and filter videos
    - Toggle between grid and list views
    - Thumbnail Preview
3. **Redux for state management**
    - Used redux to store data of playlist
4. **Styling**
    - Used Tailwind CSS
    - Made reusable components
5. **Additional Features**
    - Responsive
    - Keyboard shortcuts added
        - Space for Play/Pause
        - 'M' for mute
        - 'Right Arrow' key for skip +10sec
        - 'Left Arrow' key for skip -10sec
        - 'F' for Fullscreen Enable/Exit
    - Hosted on Vercel

## Folder structure
VideoPlayer/  
|-- app/   
|--|-- components/  
|--|-- |-- ListView.tsx  
|--|--- utilFunctions/  
|--|-- |-- convertSeconds.tsx  
|--|--- video/  
|--|--- |-- page.tsx  
|--|--- videoData/  
|--|--- |-- videodata.tsx  
|-- page.tsx  
|-- layout.tsx  
|-- redux/  
|--|--- features/  
|--|--- |-- playlistslice.ts  
|--|--- |-- provider.tsx  
|------ store.ts  

## Getting Started
To setup the project locally
1. Clone the repository
```bash
git clone https://github.com/mkmukulkumar/video-player-webapp.git
```
2. Change to project directory
```bash
cd videoplayer
```
3. Install dependencies 
```bash
npm install @reduxjs/toolkit@^2.2.1 bootstrap-icons@^1.11.3 next@14.1.0 react@^18 react-bootstrap-icons@^1.10.3 react-dom@^18 react-drag-reorder@^1.2.0 react-draggable@^4.4.6 react-redux@^9.1.0 tailwind-scrollbar-hide@^1.1.7
```
4. Start the development server 
```bash
npm run dev 
```
5. Visit the [http//localhost:300](http://localhost:3000/)


   
## Lighthouse Score  
![Screenshot 2024-02-18 134408](https://github.com/mkmukulkumar/Video-Player-WebApp/assets/61122533/33b7b8d4-0271-48b2-9885-20f0cd588791)

## Features you might have missed
**On List Screen**
![Screenshot 2024-02-18 142340](https://github.com/mkmukulkumar/Video-Player-WebApp/assets/61122533/c0d6c2f7-5931-44fa-bfb7-46801f35aa67)

**On Video screen**
![Screenshot 2024-02-18 143104](https://github.com/mkmukulkumar/Video-Player-WebApp/assets/61122533/1f739b71-9dcb-47b4-bf6c-1c53ab875503)



  

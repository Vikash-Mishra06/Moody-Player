import React, { useState } from 'react'

const MoodSongs = () => {

    const [songs, setSongs] = useState([
        {
            title: "Happy Song 1",
            artist: "Artist A",
            url: "https://example.com/happy1.mp3",
        },
        {
            title: "Neutral Song 2",
            artist: "Artist A",
            url: "https://example.com/happy1.mp3",
        },
    ])

    return (
        <div>
            <h1>Recommended Songs</h1>
            {songs.map((song, index) => (
                <div key={index} className='flex flex-col gap-2 p-4 border-b border-gray-700'>
                    <h2 className='text-xl font-semibold'>{song.title}</h2>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-300'>{song.artist}</p>

                        <div className='flex items-center gap-4'>
                            <span className='py-2 px-4 active:bg-[#1c1c1c] rounded-full text-sm md:text-xl border border-gray-400 cursor-pointer'><i class="ri-play-large-fill"></i></span>
                            <span className='py-2 px-4 active:bg-[#1c1c1c] rounded-full text-sm md:text-xl border border-gray-400 cursor-pointer'><i class="ri-pause-large-line"></i></span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MoodSongs
import React, { useState } from 'react'
import FacialExpression from './components/FacialExpression'
import MoodSongs from './components/Songs'

const App = () => {
  const [songs, setSongs] = useState([
        
    ])
  return (
    <div className='px-10 py-10'>
      <FacialExpression setSongs={setSongs} />
      <MoodSongs songs={songs} />
    </div>
  )
}

export default App

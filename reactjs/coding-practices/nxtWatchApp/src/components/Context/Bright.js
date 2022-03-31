import React from 'react'

const Bright = React.createContext({
  light: true,
  videos: '',
  changeBright: () => {},
  savedVideos: () => {},
})

export default Bright

import React from 'react';
import ColorList from './ColorList';

const Main = ({children}) => {
  return (
    <div>
      <h1 className='title'>PALETTABLE</h1>
      <div className='main-container'>
        <ColorList />
      </div>
    </div>
  )
}

export default Main;

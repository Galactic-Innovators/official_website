import React from 'react'
import { Spinner } from 'react-bootstrap'
import { reuleaux } from 'ldrs'


// Default values shown



function Loader() {
  
  reuleaux.register()
    return (
      //   <Spinner animation="border" role="status" style={{height:'100px',width:'100px',margin:'auto',display:'block'}}>
      //   <span className="sr-only">Loading...</span>
      // </Spinner>
      <div style={{ height: '100px', width: '100px', margin: 'auto', display: 'block' }}>
            
      <l-reuleaux
      size="80"
      stroke="10"
      stroke-length="0.15"
      bg-opacity="0.1"
      speed="1.2" 
      color="#882e2a" 
    ></l-reuleaux>
         </div>

    )
}

export default Loader

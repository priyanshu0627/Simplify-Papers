import { type } from 'os';
import React from 'react';

type props = {
  isLoading : Boolean
}

const Loader = (props : props) => {
  if(!props.isLoading) return null;
  return (
    <div id="loader" className="">
      <img src="https://react-pdf.org/images/logo.png" alt="loader" className="" />
      <p>Loading...</p>
    </div>
  )
}

export default Loader

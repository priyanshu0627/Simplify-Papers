import React from 'react';

type Props = {
  isLoading: Boolean;
};

const Loader = (props: Props) => {
  if (!props.isLoading) return null;
  return (
    <div id="loader" className="">
      <img
        src="https://react-pdf.org/images/logo.png"
        alt="loader"
        className=""
      />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;

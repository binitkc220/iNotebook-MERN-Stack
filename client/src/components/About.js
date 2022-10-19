import React from 'react';

export default function About() {
  return (
    <div className='container my-3'>
      <div className="d-flex justify-content-center my-4">
        <div className="fit-content">
          <div className="typed-out">Welcome to iNotebook !</div>
        </div>
      </div>
      <h2 className="text-dark my-3"><b>About</b></h2>
      <h4 className="text-dark text-justify m-4">iNotebook - A Cloud Notebook is a web based app developed and designed using MERN Stack i.e, MERN Stack comprises of 4 technologies namely: MongoDB, Express, React and Node.js. It is a full login based web app. One can signup and login to use iNotebook. Users can save, edit and delete their notes after logging into their account. Notes saved by a user are private and not accessible to other accounts. Users data are fully secure. Anyone can use and enjoy using this webapp :)</h4>
      <br />
      <h3 className="text-dark text-justify m-4"><b>Source Code:</b></h3>
      <a className="link-dark" href="https://github.com/binitkc220/iNotebook-MERN-Stack" target="_blank" rel="noopener noreferrer">
        <h4 className="text-dark text-justify m-4">iNotebook-MERN-Stack</h4>
      </a>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import { OutlinedInput, Button } from '@mui/material';
import QuestionCard from './QuestionCard';
import { QuestionsData } from './QuestionsData';

function PDFSideBar({onFileChange} : any) {
  // const [questionsData, setQuestionsData] = useState([]);
  useEffect(() => {
    // set questions data from the api here
  }, [])
  

  return (
    <div className='flex flex-col justify-start p-1 m-4 rounded-lg bg-white text-black h-screen'>
      {/* <section className='flex justify-center'>
        <div className='my-4 py-4 bg-white rounded-lg w-9/12'>
          <label className='m-1' htmlFor="file">Load from file:</label>{" "}
          <input className='m-1' onChange={onFileChange} type="file" />
        </div>
      </section> */}
      <section className='flex justify-around'>
        <Button className='text-white bg-theme-green flex-auto m-1' sx={{background: '#45815a'}} size="large" variant="contained">Ask a Question</Button>
        <OutlinedInput className='flex-auto m-1' placeholder='Search these discussion'/>
      </section>
      <section className='overflow-auto '>
        {QuestionsData?.map((questionData: any) => (
          <QuestionCard {...questionData} />
        ))}
      </section>
    </div>
  )
}

export default PDFSideBar;
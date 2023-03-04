import React from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Button from '@mui/material/Button';

function QuestionCard(props: any) {
  return props && (
    <div className='flex bg-theme-grey rounded border-zinc-600 p-2 m-2'>
      <section className='flex flex-col	justify-between'>
        <div>
          <div className='flex items-center	justify-around	'>
            <div className='text-xs'>
              {props.upVotes}
            </div>
            <ArrowDropUpIcon />
          </div>
          <div className='flex items-center	justify-around	'>
            <div className='text-xs'>
              {props.downVotes}
            </div>
            <ArrowDropDownIcon />
          </div>
          <div className='flex items-center	justify-around	'>
            <div className='text-xs'>
              {props.random}
            </div>
            <QuestionMarkIcon />
          </div>
        </div>
        <div>
          <Button size="small" variant="contained" sx={{background: '#45815a', fontSize: '8px'}} className='m-1'>summary</Button>
        </div>
      </section>
      <section className='flex-auto'>
        <div className='text-lg	mb-2'>{props.question}</div>
        <div className='flex items-center'>
          <div className='text-xs text-gray-700'>
            asked by
          </div>
          <Button size="small" variant="contained" sx={{background: '#45815a', fontSize: '8px'}} className='m-1'>{props.askedBy}</Button>
        </div>
        <div className='flex items-center'>
          <div className='text-xs text-gray-700'>
            last activity {props.lastActivityTime} mins ago by 
          </div>
          <Button size="small" variant="contained" sx={{background: '#45815a', fontSize: '8px'}} className='m-1'>{props.askedBy}</Button>
        </div>
        <div>
          {props?.tags?.map((tag: string) => (
            <Button size="small" variant="contained" sx={{background: '#45815a', fontSize: '8px'}} className='m-1'>{tag}</Button>
          ))}
        </div>
      </section>
      <section className='flex flex-col	justify-between'>
        <BookmarkIcon />
        <ShareIcon />
      </section>
    </div>
  )
}

export default QuestionCard;
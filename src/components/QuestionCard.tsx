import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';

function QuestionCard(props: any) {
  const {
    upVotes,
    downVotes,
    random,
    question,
    askedBy,
    lastActivityPerson,
    lastActivityTime,
    tags,
  } = props;

  const [bookmark, setBookmark] = useState(false);
  const [upVote, setUpVote] = useState(upVotes);
  const [downVote, setDownVote] = useState(downVotes);
  const [flag, setFlag] = useState(0);
  const handleShareProject = () => {
    console.log('here');
    setBookmark(!bookmark);
  };

  const handleUpVote = () => {
    setUpVote(upVote + 1);
  };

  const handleDownVote = () => {
    if (downVote - 1 >= 1) {
      setDownVote(downVote - 1);
    }
  };

  const handleFlag = () => {
    setFlag(flag + 1);
  };

  useEffect(() => {
    // set bookmark state
    // set upvote
    // set downVote
    // set flag
  }, [upVote, downVote, flag]);

  return (
    props && (
      <div className="m-2 flex rounded border-zinc-600 bg-theme-grey p-2">
        <section className="flex flex-col	justify-between">
          <div>
            <div className="flex items-center	justify-around	">
              <div className="text-xs">{upVote}</div>
              <ArrowDropUpIcon
                fontSize="large"
                className="text-theme-green"
                onClick={handleUpVote}
              />
            </div>
            <div className="flex items-center	justify-around	">
              <div className="text-xs">{downVote}</div>
              <ArrowDropDownIcon
                fontSize="large"
                className="text-theme-green"
                onClick={handleDownVote}
              />
            </div>
            <div className="flex items-center	justify-around	">
              <div className="text-xs">{random}</div>
              <QuestionMarkIcon
                className="text-theme-green"
                onClick={handleFlag}
              />
            </div>
          </div>
          <div>
            <Button
              size="small"
              variant="contained"
              sx={{ background: '#45815a', fontSize: '8px' }}
              className="m-1"
            >
              summary
            </Button>
          </div>
        </section>
        <section className="flex-auto">
          <div className="mb-2	text-lg">{question}</div>
          <div className="flex items-center">
            <div className="text-xs text-gray-700">asked by</div>
            <Button
              size="small"
              variant="contained"
              sx={{ background: '#45815a', fontSize: '8px' }}
              className="m-1"
            >
              {askedBy}
            </Button>
          </div>
          <div className="flex items-center">
            <div className="text-xs text-gray-700">
              last activity {lastActivityTime} mins ago by
            </div>
            <Button
              size="small"
              variant="contained"
              sx={{ background: '#45815a', fontSize: '8px' }}
              className="m-1"
            >
              {lastActivityPerson}
            </Button>
          </div>
          <div>
            {tags?.map((tag: string, index: number) => (
              <Button
                key={index}
                size="small"
                variant="contained"
                sx={{ background: '#45815a', fontSize: '8px' }}
                className="m-1"
              >
                {tag}
              </Button>
            ))}
          </div>
        </section>
        <section className="flex flex-col	justify-between">
          {bookmark ? (
            <BookmarkIcon
              className="text-theme-green"
              onClick={handleShareProject}
            />
          ) : (
            <BookmarkBorderIcon
              className="text-theme-green"
              onClick={handleShareProject}
            />
          )}
          <ShareIcon className="text-theme-green" />
        </section>
      </div>
    )
  );
}

export default QuestionCard;

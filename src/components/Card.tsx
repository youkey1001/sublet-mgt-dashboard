import React from 'react';
import "styles/Card.css";

type Props = {
  id: number;
  contents: {
    title: string;
    memo?: string;
  },
}

const Card: React.VFC<Props> = ({ contents }) => {
  return (
    <div className="card">
      <div className="contents">
        <p className="title">{contents.title}</p>
        <p className="memo">{contents.memo}</p>
      </div>
    </div>
  );
};

export default Card;

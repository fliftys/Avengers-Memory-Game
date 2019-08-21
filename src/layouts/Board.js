import React from 'react';
import '../styles/Board.scss';

import Card from '../components/Card';

const Board = props => {

  const cards = props.cards.map(card => (
    <Card key={Math.floor(Math.random()*100000)}
          id={card.id}
          url={card.url} 
          isDiscovered={card.isDiscovered}
          click={props.click}
          enable={card.enable}
          />
  ));


  
  return(
    <>
      {cards}
    </>
  )
}

export default Board;
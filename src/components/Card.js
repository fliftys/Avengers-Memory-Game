import React from "react";
import "../styles/Card.scss";

import bgImg from '../img/logo.jpg';

const backgroundStyle = {
    background: `url(${bgImg}) no-repeat center center/cover`,
    backgroundColor: '#eb1c24',
    backgroundSize: '100%'
}

const Card = props => {
  const imgStyles = ["card__img"];
  if (props.isDiscovered) imgStyles.push("card__img--show");
  
  const boxStyles = ["card"];
  if(!props.enable) boxStyles.push('card--disabled')

  const cardWrapper = (
    <div onClick={() => props.click(props.id)} className="card__card-wrapper">
      <img className={imgStyles.join(" ")} src={props.url} alt="w" />
    </div>
  );

  return (<div className={boxStyles.join(" ")} style={backgroundStyle}>
   {props.enable && cardWrapper}
  </div>);
};

export default Card;

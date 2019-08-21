import React, { Component } from "react";
import "../styles/Game.scss";

import Header from "./Header";
import Board from "./Board";
import Footer from "./Footer";

class Game extends Component {
  state = {
    cards: [],
    isFirstMove: true,
    isRoundOver: true,
    currentChoice: {
      name: '',
      id: ''    
    },
    count: 0
  };

  fetchData = async () => {
    try {
      const response = await fetch("/data/cards.json");
      const result = await response.json();
      this.prepareData(result);
    } catch (error) {
      console.log(`Error in fetchData: ${error}`);
    }
  };

  prepareData = data => {
    // copy objects
    const tab1 = JSON.stringify(data);
    const tab2 = JSON.stringify(data);
    let cards = [...JSON.parse(tab1),...JSON.parse(tab2)];
   
    // Shuffle xD
    for (let i = 0; i < cards.length; i++) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
    }

    cards = cards.map(card => {
      const id = Math.floor(Math.random()*1000000);
      card.id = `id${id}`;
      return card;
    });

    this.setState({ cards });
  };

  hideCards = () => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1)
      }, 2000);
    })
    .then(res => {
      const cards = [...this.state.cards];
      cards.forEach(card => card.isDiscovered = false);
      this.setState({
        cards,
        isRoundOver: true,
        currentChoice: {name: '', id: ''}
      });

    })


  }

  removeCards = (id1, id2) => {

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1000);
    })
    .then(res => {
      const cards = [...this.state.cards];
      cards.filter(card => {
        if(card.id === id1 || card.id === id2){
          card.enable = false;
        }
        return card;
      });
    });

  }

  handleClick = id => {

    if(this.state.isRoundOver){
      const cards = [...this.state.cards];
      const index = cards.findIndex(card => card.id === id);
      const name = cards[index].name;
      cards[index].isDiscovered = true;

      if(name === this.state.currentChoice.name && id !== this.state.currentChoice.id){
        // Name cards is the same, and ids are different*
        this.removeCards(id, this.state.currentChoice.id);
      }

      this.setState((state) => ({
        cards,
        isFirstMove: !state.isFirstMove,
        isRoundOver: state.isFirstMove,
        currentChoice: state.isFirstMove ? {id, name} : state.currentChoice,
        count: !state.isFirstMove ? state.count + 1 : state.count
      }))
  
      if(!this.state.isFirstMove){
        this.hideCards();
      }


    }



  };

  componentDidMount() {
    this.fetchData();
  }

  render() {

    const isEnable = this.state.cards.findIndex(card => card.enable);
    let win;
    if(isEnable === -1 && this.state.count > 0){
      win = (<h2>Wygrałeś w {this.state.count} rundzie</h2>);
    }

    return (
      <div className="game">
        <div className="container">
          <header className="header">
            <Header />
            {win}
          </header>
          <main className="board">
            <Board cards={this.state.cards} click={this.handleClick} />
          </main>
          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </div>
    );
  }
}

export default Game;

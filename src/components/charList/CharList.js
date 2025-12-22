import { Component } from "react";
import "./charList.scss";
import MarvelServic from "../../services/MarvelServic";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
  };

  marvelServic = new MarvelServic();

  componentDidMount() {
    this.marvelServic.getAllCharacters().then((chars) => {
      this.setState({
        chars,
        loading: false,
      });
    });
  }

  render() {
    const { chars } = this.state;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {chars.map((char) => (
            <li
              className="char__item"
              key={char.id}
              onClick={() => this.props.onCharSelected(char.id)}
            >
              <img src={char.thumbnail} alt={char.name} />
              <div className="char__name">{char.name}</div>
            </li>
          ))}
        </ul>

        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;

import { Component } from "react";
import MarvelServic from "../../services/MarvelServic";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spiner/Spiner";

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  marvelServic = new MarvelServic();

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };
  onError = (err) => {
    this.setState({ loading: false, error: true });
    console.error("Error loading character:", err);
  };
  updateChar = () => {
    const id = Math.floor(Math.random() * (20 - 1) + 1);
    this.onCharLoading();
    this.setState({ loading: true, error: false });

    this.marvelServic
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };
  render() {
    const { char, loading, error } = this.state;

    return (
      <div className="randomchar">
        {error ? (
          <ErrorMessage />
        ) : loading ? (
          <Spinner />
        ) : (
          <View char={char} />
        )}

        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button
            className="button button__main"
            onClick={this.updateChar}
            disabled={loading}
          >
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  return (
    <div>
      <div className="randomchar__block">
        <img
          src={thumbnail}
          alt="Random character"
          className="randomchar__img"
        />
        <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <p className="randomchar__descr">{description}</p>
          <div className="randomchar__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;

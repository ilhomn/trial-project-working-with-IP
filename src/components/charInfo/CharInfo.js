import { Component } from "react";
import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";
import MarvelServic from "../../services/MarvelServic";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelServic = new MarvelServic();

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) return;

    this.setState({ loading: true, error: false });

    this.marvelServic
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = !char && !loading && !error ? <Skeleton /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = char && !loading && !error ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />

        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a
              href={homepage}
              className="button button__main"
              target="_blank"
              rel="noreferrer"
            >
              <div className="inner">homepage</div>
            </a>
            <a
              href={wiki}
              className="button button__secondary"
              target="_blank"
              rel="noreferrer"
            >
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>

      <div className="char__descr">
        {description || "Description is not available"}
      </div>

      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0 ? (
          <li className="char__comics-item">No comics available</li>
        ) : (
          comics.slice(0, 10).map((item, i) => (
            <li className="char__comics-item" key={i}>
              {item}
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default CharInfo;

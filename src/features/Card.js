import dogImage from '../assets/siby.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

function Card({ dog }) {
  function dogAge() {
    const age = Math.floor(
      (new Date() - new Date(dog.birthdate).getTime()) / 3.15576e10,
    );
    let descr;
    switch (age) {
      case 1:
        descr = 'rok';
        break;
      case 2:
        descr = 'roky';
        break;
      case 3:
        descr = 'roky';
        break;
      case 4:
        descr = 'roky';
        break;
      default:
        descr = 'let';
    }
    return `${age} ${descr}`;
  }

  const favIcon =
    dog.favourite === 1 ? (
      <FavoriteIcon sx={{ color: 'indianred' }} />
    ) : (
      <FavoriteBorderIcon />
    );
  const genderIcon =
    dog.gender === 'Male' ? (
      <MaleIcon sx={{ color: 'dodgerblue' }} />
    ) : (
      <FemaleIcon sx={{ color: 'hotpink' }} />
    );

  return (
    <div className="card-container">
      <img src={dogImage} alt={dog.name} />
      <div className="age">{dogAge()}</div>
      <div className="info">
        <span className="name">{dog.name}</span>
        <span className="favIcon">{favIcon}</span>
      </div>
      <div className="info">
        <span>{dog.address.city}</span>
        <div className="info">
          <span>{genderIcon}</span>
          <span>{dog.gender}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;

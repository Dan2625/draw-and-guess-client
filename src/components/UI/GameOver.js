import { useNavigate } from 'react-router-dom';
import Button from './Button';
// import classes from './GameOver.module.css';

const GameOver = ({
  guessUserName,
  drawerUserName,
  gameId,
  gameDuration,
  startedTime,
  points,
}) => {
  const navigate = useNavigate();
  const backToHomePage = () => {
    navigate('/');
  };
  return (
    <div>
      <div>{guessUserName}</div>
      <div>{drawerUserName}</div>
      <div>{gameDuration}</div>
      <div>{gameId}</div>
      <div>{startedTime}</div>
      <div>{points}</div>

      <Button onClick={backToHomePage}>Move To Homepage</Button>
    </div>
  );
};

export default GameOver;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import classes from './WelcomePage.module.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  //const [usernameIsValid, setUsernameIsValid] = useState();
  const checkNameIsValid = () => {
    const isValidName = userName.trim().length > 1;
    if (!isValidName) console.log('Name is not valid!');
    return isValidName;
  };

  const handleDrawSubmit = (e) => {
    if (!checkNameIsValid()) return;
    console.log('handleDrawSubmit');
    e.preventDefault();
    navigate('/drawer', { state: { userName } });
  };

  const handleGuessSubmit = (e) => {
    if (!checkNameIsValid()) return;
    e.preventDefault();
    navigate('/guessing', { state: { userName } });
  };

  return (
    <Card className={classes.login}>
      <form>
        <h2>Log in to Play</h2>
        <div
          className={`${classes.control}`}
          /* className={`${classes.control} ${
            usernameIsValid === false ? classes.invalid : ''
          }`} */
        >
          <input
            type="text"
            minLength={3}
            name="username"
            id="username"
            value={userName}
            placeholder="Username..."
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <Button onClick={handleDrawSubmit} className={classes.btn}>
            DRAW
          </Button>
          <Button onClick={handleGuessSubmit} className={classes.btn}>
            GUESS
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default WelcomePage;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import GameOver from '../components/UI/GameOver';
import SOCKET_TYPES from '../utils';

const GuessingPage = ({ activeSocket }) => {
  const location = useLocation();
  const [socket, setSocket] = useState(undefined);
  const [canvas, setCanvas] = useState('');
  const [gameState, setGameState] = useState(false);
  const [guessingWord, setGuessingWord] = useState('');
  const [gameInfo, setGameInfo] = useState({
    drawerUserName: '',
    guessUserName: '',
    gameId: '',
    startedTime: '',
  });
  const userName = location.state.userName;

  useEffect(() => {
    const newSocket = socketIO.connect(
      'https://draw-and-guess-serv.herokuapp.com/'
    );
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit('guessUser', {
      type: 'guess',
      userName,
    });
    setSocket(socket);
    socket.on(SOCKET_TYPES.CONNECTED, (data) => {
      setGameState(SOCKET_TYPES.CONNECTED);
    });
    socket.on(SOCKET_TYPES.MATCHED, (data) => {
      console.log('waiting for the partner choose a word', data);
      setGameState(SOCKET_TYPES.MATCHED);
      setGameInfo({
        drawerUserName: data.drawerUserName,
        guessUserName: data.guessUserName,
        gameId: data.gameId,
        startedTime: data.startedTime,
      });
    });
    socket.on(SOCKET_TYPES.GAME_STARTED, (data) => {
      console.log('game started', data);
      setGameState(SOCKET_TYPES.GAME_STARTED);
    });

    socket.on(SOCKET_TYPES.WAITING_FOR_PLAYER_TO_JOIN, (data) => {
      console.log('WAITING', data);
      setGameState(SOCKET_TYPES.WAITING_FOR_PLAYER_TO_JOIN);
    });

    socket.on(SOCKET_TYPES.GAME_FINISHED, (data) => {
      console.log('GAME_FINISHED', data);
      const { gameDuration, points } = data;
      setGameState(SOCKET_TYPES.GAME_FINISHED);
      setGameInfo({ ...gameInfo, gameDuration, points });
      socket.disconnect();
    });

    //gussing evetns
    socket.on(SOCKET_TYPES.CANVAS_UPDATED, (data) => {
      console.log('UPDATED');
      setCanvas(data.canvas);
      setGameState(SOCKET_TYPES.CANVAS_UPDATED);
    });
    socket.on(SOCKET_TYPES.GUSSING_INCORRECT, (data) => {
      console.log('GUSSING_INCORRECT');
    });
  }, [socket, userName]);

  const checkWord = (data) => {
    socket.emit(SOCKET_TYPES.GUSSING_WORD, {
      guessingWord,
    });
  };

  const renderPage = () => {
    if (gameState === SOCKET_TYPES.WAITING_FOR_PLAYER_TO_JOIN) {
      return <div>Waiting for a user to start the game</div>;
    }
    if (gameState === SOCKET_TYPES.GAME_STARTED) {
      return (
        <div>
          <Card>
            <div style={{ width: 1080 / 2, height: 1920 / 2 }}>
              <img />
            </div>
          </Card>
        </div>
      );
    }
    if (gameState === SOCKET_TYPES.MATCHED) {
      return (
        <div>
          {' '}
          Hello {userName} waiting for {gameInfo.drawerUserName} choose a word
        </div>
      );
    }
    if (gameState === SOCKET_TYPES.GAME_FINISHED) {
      return <GameOver {...gameInfo} />;
    }
    return <div>bla</div>;
  };
  const onGussingWordChange = (e) => setGuessingWord(e.target.value);
  return (
    <div>
      {gameState === SOCKET_TYPES.CANVAS_UPDATED ? (
        <div>
          <Card>
            <div style={{ width: 1080 / 2, height: 1920 / 2 }}>
              <img
                src={canvas}
                alt={'canvas'}
                width={1080 / 2}
                height={1920 / 2}
              />
            </div>
          </Card>
          <input
            type="text"
            name="answer"
            id="answer"
            value={guessingWord}
            onChange={onGussingWordChange}
          />
          <Button onClick={checkWord}>Check</Button>
        </div>
      ) : (
        renderPage()
      )}
    </div>
  );
};

export default GuessingPage;

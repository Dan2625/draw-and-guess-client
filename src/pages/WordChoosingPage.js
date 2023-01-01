import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import socketIO from 'socket.io-client';
import randomWords from 'random-words';
import Button from '../components/UI/Button';
import SOCKET_TYPES from '../utils';
import DrawingCanvas from './DrawingCanvas';
import classes from './WordChoosing.module.css';
import GameOver from '../components/UI/GameOver';

const WordChoosingPage = ({ activeSocket }) => {
  const location = useLocation();
  const [easyWord, setEasyWord] = useState('');
  const [mediumWord, setMediumWord] = useState('');
  const [hardWord, setHardWord] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedWord, setSelectedWord] = useState('');
  const [socket, setSocket] = useState(undefined);
  const [gameState, setGameState] = useState(false);
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
    if (socket) {
      console.log('drawing is working');
      //handle socket connection failure

      socket.emit('drawerUser', {
        type: 'drawer',
        userName,
      });
      setSocket(socket);
      socket.on(SOCKET_TYPES.CONNECTED, (data) => {
        setGameState(SOCKET_TYPES.CONNECTED);
      });
      socket.on(SOCKET_TYPES.MATCHED, (data) => {
        console.log('choose a word', data);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    setEasyWord(randomWords({ exactly: 1, maxLength: 3 }));
    setMediumWord(randomWords({ exactly: 1, maxLength: 5 }));
    setHardWord(randomWords({ exactly: 1, maxLength: 8 }));
  }, []);

  const chooseWordHandler = (data) => {
    const selectedWord = data[0];
    const difficullty = data[1];
    setSelectedWord(selectedWord);
    socket.emit(SOCKET_TYPES.WORD_SELECTED, {
      selectedWord,
      difficullty,
    });
  };

  const onCanvasChange = (data) => {
    socket.emit(SOCKET_TYPES.CANVAS_UPDATED, {
      canvas: data,
    });
  };

  const renderPage = () => {
    if (gameState === SOCKET_TYPES.WAITING_FOR_PLAYER_TO_JOIN) {
      return <div>Waiting for a user to join the game</div>;
    }
    if (gameState === SOCKET_TYPES.MATCHED) {
      return (
        <div>
          <h2>Choose a Word:</h2>
          <ul>
            <div>
              <li>
                <h3>{easyWord} - 1 point</h3>
                <Button
                  className={classes.btn}
                  onClick={() => chooseWordHandler(easyWord, 'easy')}
                >
                  Choose
                </Button>
              </li>
            </div>
            <div>
              <li>
                <h3>{mediumWord} - 3 points</h3>
                <Button
                  className={classes.btn}
                  onClick={() => chooseWordHandler(mediumWord, 'medium')}
                >
                  Choose
                </Button>
              </li>
            </div>
            <div>
              <li>
                <h3>{hardWord} - 5 points</h3>
                <Button
                  className={classes.btn}
                  onClick={() => chooseWordHandler(hardWord, 'hard')}
                >
                  Choose
                </Button>
              </li>
            </div>
          </ul>
        </div>
      );
    }
    if (gameState === SOCKET_TYPES.GAME_STARTED) {
      return <DrawingCanvas onCanvasChange={onCanvasChange} />;
    }
    if (gameState === SOCKET_TYPES.GAME_FINISHED) {
      return <GameOver {...gameInfo} />;
    }
    return <div>bla</div>;
  };
  return renderPage();
};

export default WordChoosingPage;

Guess and Draw game:

The project was built with react and node.js, using express, socket-io, canvas, and randomWords library.

When a user opens the game he needs to enter his name to start to play and choose a role (drawer/guesser), the data stored at the Server, and is id stored in an array that contains only the IDs of the users, I used in two arrays, one for each role.

Then he will wait until another user logged in with a different role, if a user (at this time) will log in with the same rule he will wait too and will be the second in line, and so on.

When there's a match between users, the game's continue, the Server will provide data about the session(gameId, userNames, currentTime).
The Drawer will continue to the next view and need to choose a word to draw.
After he clicked the data sent to the server and the game's started.

Drawer sent to a canvas, Guesser sent to an image that updates every time when the user stops to draw(onMouseUp, onTouchEnd).

Guesser can guess imiediatly when Drawer starts to draw , he has as many attempts as he want, when he succeeds they both will get a message with the duration time of the session and the score.

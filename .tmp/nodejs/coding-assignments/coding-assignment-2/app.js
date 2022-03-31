const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "twitterClone.db");
const jwt = require("jsonwebtoken");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        request.username = payload.username;
        next();
      }
    });
  }
};
//register
app.post("/register/", async (request, response) => {
  const { name, username, password, gender } = request.body;
  const hashedPassword = await bcrypt.hash(request.body.password, 10);
  const selectUserQuery = `select * from user where username= '${username}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    if (password.length < 6) {
      response.status(400);
      response.send("Password is too short");
    }
    if (password.length > 6) {
      const createUserQuery = `
                    INSERT INTO 
                        user (name, username,password, gender) 
                    VALUES 
                        (
                        
                        '${name}',
                        '${username}',
                        '${hashedPassword}', 
                        '${gender}'
                        )`;
      const dbResponse = await db.run(createUserQuery);

      response.send("User created successfully");
    }
  } else {
    response.status(400);
    response.send("User already exists");
  }
}); //login
app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const selectUserQuery = `SELECT * FROM user WHERE username = '${username}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid user");
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched === true) {
      const payload = {
        username: username,
      };
      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
      response.send({ jwtToken });
    } else {
      response.status(400);
      response.send("Invalid password");
    }
  }
});
app.get("/user/tweets/feed/", authenticateToken, async (request, response) => {
  const { username } = request;
  console.log(username);
  const idOfUserQuery = `select user_id from user where username='${username}'`;
  const idOfUser = await db.get(idOfUserQuery);
  const userFollowingTweets = `select username,tweet,tweet.date_time as dateTime from (tweet join follower on following_user_id=tweet.user_id) as t1 join user on tweet.user_id = user.user_id where follower_user_id=${idOfUser.user_id} order by dateTime desc limit 4; `;
  const tweetsResult = await db.all(userFollowingTweets);
  response.send(tweetsResult);
});
app.get("/user/following/", authenticateToken, async (request, response) => {
  const { username } = request;
  console.log(username);
  const idOfUserQuery = `select user_id from user where username='${username}'`;
  const idOfUser = await db.get(idOfUserQuery);
  const listOfFollowers = `select name from user join follower on user.user_id=following_user_id where follower_user_id=${idOfUser.user_id};`;
  const result = await db.all(listOfFollowers);
  response.send(result);
});
app.get("/user/followers/", authenticateToken, async (request, response) => {
  const { username } = request;
  console.log(username);
  const idOfUserQuery = `select user_id from user where username='${username}'`;
  const idOfUser = await db.get(idOfUserQuery);
  const listOfFollowers = `select name from user join follower on user.user_id=follower_user_id where following_user_id=${idOfUser.user_id};`;
  const result = await db.all(listOfFollowers);
  response.send(result);
});

app.get("/tweets/:tweetId/", authenticateToken, async (request, response) => {
  const { username } = request;
  const { tweetId } = request.params;
  console.log(username);
  const idOfUserQuery = `select user_id from user where username='${username}'`;
  const idOfUser = await db.get(idOfUserQuery);
  const listOfFollowers = `select * from ((select tweet, count(like_id) as likes from (follower join tweet on following_user_id=tweet.user_id) as t1 join like on t1.tweet_id=like.tweet_id where t1.follower_user_id=${idOfUser.user_id} and like.tweet_id=${tweetId} group by like.tweet_id)
natural join
(select tweet, count(reply_id) as replies ,tweet.date_time as dateTime from (follower join tweet on following_user_id=tweet.user_id) as t1 join reply on t1.tweet_id=reply.tweet_id where t1.follower_user_id=${idOfUser.user_id} and reply.tweet_id=${tweetId} group by reply.tweet_id));
;`;
  const result = await db.get(listOfFollowers);
  if (result == undefined) {
    response.status(401);
    response.send("Invalid Request");
  } else {
    response.send(result);
  }
});
app.get(
  "/tweets/:tweetId/likes/",
  authenticateToken,
  async (request, response) => {
    const { username } = request;
    const { tweetId } = request.params;
    console.log(username);
    const idOfUserQuery = `select user_id from user where username='${username}'`;
    const idOfUser = await db.get(idOfUserQuery);

    const names = `select username from user natural join 
    (select * from (select like.user_id as user_Id from 
        (follower join tweet on following_user_id=tweet.user_id)
         as t1 join like on t1.tweet_id=like.tweet_id where t1.follower_user_id=${idOfUser.user_id} and like.tweet_id=${tweetId}));`;
    const result = await db.all(names);
    if (result[0] == undefined) {
      response.status("401");
      response.send("Invalid Request");
    } else {
      let likes = [];

      for (let x of result) {
        likes.push(x.username);
      }

      response.send({ likes });
    }
  }
);
app.get(
  "/tweets/:tweetId/replies/",
  authenticateToken,
  async (request, response) => {
    const { username } = request;
    const { tweetId } = request.params;
    console.log(username);
    const idOfUserQuery = `select user_id from user where username='${username}'`;
    const idOfUser = await db.get(idOfUserQuery);

    const names = `select name,reply from user natural join (select * from (select reply ,reply.user_id as user_Id from (follower join tweet on following_user_id=tweet.user_id)as t1 join reply on t1.tweet_id=reply.tweet_id where t1.follower_user_id=${idOfUser.user_id} and tweet.tweet_id=${tweetId}));`;
    const result = await db.all(names);
    if (result[0] == undefined) {
      response.status("401");
      response.send("Invalid Request");
    } else {
      let replies = [];

      for (let x of result) {
        replies.push({ name: x.name, reply: x.reply });
      }

      response.send({ replies });
    }
  }
);
app.get("/user/tweets/", authenticateToken, async (request, response) => {
  const { username } = request;

  console.log(username);
  const idOfUserQuery = `select user_id from user where username='${username}'`;
  const idOfUser = await db.get(idOfUserQuery);
  const listOfFollowers = `select * from ((select tweet,count(like_id) as likes from tweet join like on tweet.tweet_id=like.tweet_id where tweet.user_id=${idOfUser.user_id} group by like.tweet_id)
natural join
(select tweet,count(reply_id) as replies ,tweet.date_time as dateTime from tweet join reply on tweet.tweet_id=reply.tweet_id where tweet.user_id=${idOfUser.user_id} group by reply.tweet_id))
`;
  const result = await db.all(listOfFollowers);
  if (result[0] == undefined) {
    response.status(401);
    response.send("Invalid Request");
  } else {
    response.send(result);
  }
});
app.post("/user/tweets/", authenticateToken, async (request, response) => {
  const { username } = request;
  const { tweet } = request.body;
  console.log(username);
  const idOfUserQuery = `select user_id from user where username='${username}'`;
  const idOfUser = await db.get(idOfUserQuery);

  const insertTweetQuery = ` insert into tweet(tweet,user_id)values('${tweet}',${idOfUser.user_id}); `;
  await db.run(insertTweetQuery);
  response.send("Created a Tweet");
});
app.delete(
  "/tweets/:tweetId/",
  authenticateToken,
  async (request, response) => {
    const { tweetId } = request.params;
    const { username } = request;
    const idOfUserQuery = `select user_id from user where username='${username}'`;
    const idOfUser = await db.get(idOfUserQuery);
    const tweetIdRetrieve = `select tweet_id from tweet join follower on tweet.user_id=following_user_id where following_user_id=${idOfUser.user_id} and tweet_id=${tweetId};`;
    tweetIdRetrieveResult = await db.get(tweetIdRetrieve);
    if (tweetIdRetrieveResult == undefined) {
      response.status(401);
      response.send("Invalid Request");
    } else {
      const del = `delete from tweet where tweet_id=${tweetId};`;
      await db.run(del);
      response.send("Tweet Removed");
    }
  }
);
module.exports = app;

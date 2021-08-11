import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';

import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { fetchAllUsers } from '../../actions/user.action';
var socket = io.connect('http://localhost:8000');
/**
* @author
* @function Home
**/


const Home = (props) => {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(auth.user);
  const [opponentUser, selectOpponentUser] = useState(undefined);
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [groupMessage, setGroupMessage] = useState({});
  const opponentUserRef = useRef(null);

  const sortNames = (username1, username2) => {
    return [username1, username2].sort().join("-");
  }

  // useEffects
  useEffect(() => {
    dispatch(fetchAllUsers())

    socket.on('oppenents', (users) => {
      console.log("opponents users", { users });
      opponentUserRef.current = currentUser;

    })
    socket.on("new_message", (data) => {
      console.log("opponent msg >>>>>>>>>>>", data)


      setGroupMessage(prevGroupMessage => {

        const messages = prevGroupMessage;
        const key = sortNames(data.sender, data.receiver);
        if (key in messages) {
          messages[key] = [...messages[key], data];
        } else {
          messages[key] = [data];
        }
        return { ...messages };
      })
    })
  }, []);
  console.log("groupMessage  ertyurtyui", groupMessage);



  const handleSelectedOpponentUser = (user) => {

    console.log("oppenents ", opponentUser);
    socket.emit('oppnents', opponentUser);
    const a = Math.floor(Math.random() * 8) + '.png'
    setAvatar(a);
    selectOpponentUser(user)
  }
  const renderUserLists = () => {
    return user.usersList && user.usersList.map((user) => {
      return <Container fluid className="userBox" onClick={() => handleSelectedOpponentUser(user)}>
        <div className="image">
          <img src="/users/1.png" alt="user" />
        </div>
        <div className="otherDetails">
          {`${user.firstName} ${user.lastName}`}
        </div>
      </Container>
    });
  }

  const renderChats = () => {
    return opponentUser && opponentUser.chats && opponentUser.chats.map(chat => {
      return <p>{chat.message}</p>
    });
  }


  // send message 

  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      sender: currentUser,
      receiver: opponentUser,
      message,
      avatar
    };
    socket.emit("send_message", data);
    console.log("-->", message);

    const key = sortNames(currentUser, opponentUser);

    if (key in groupMessage) {
      groupMessage[key].push(data);
    } else {
      groupMessage[key] = [data];
    }
    setMessage({ ...groupMessage });
    console.log("groupmessage", { ...groupMessage });

    // chat with ajahangeer with asgar
    //  [jahangeer-asgar] => [m1,m2,m3]

  }

  const messages = groupMessage ? groupMessage[sortNames(currentUser, opponentUser)] : null;
  console.log(" message lentht ", messages)


  return (
    <Layout>
      <Container style={{ marginTop: '1rem' }} className="text-center">

        <Container fluid className="chatContainer">
          <Row className="chatHeader" >
            <Col lg={3} md={3} sm={3} xs={3} className="left">
              <img src="/assets/chat.png" alt="" /><span><b>My Chat Application</b><br />{auth.user.fullName}</span>
            </Col>
            <Col lg={9} md={9} sm={9} xs={9} className="right">
              {opponentUser && <span><b>{`${opponentUser.firstName} ${opponentUser.lastName}`} </b>
                <br /><small>{opponentUser.status}</small></span>}
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={3} sm={3} xs={3} className="userListContainer">
              {renderUserLists()}
            </Col>
            <Col lg={9} md={9} sm={9} xs={9} className="chatBox">
              {/* <Container fluid className="displayChats">
                  
              {/* </Container> */}
              <div className="message-area">


                <div>
                  <div className="left-side-msg">
                    <div className="user-pic">
                      <img src="/users/1.png" alt="user" />
                    </div>
                    <div className="message-text">
                      {renderChats()}
                    </div>
                  </div>
                </div>
                {/* {
                   messages.length() > 0  ? messages.map((msg,index) =>(
                    <div className="push-right" key={index}>
                    <div className="right-side-msg">
                      <div className="user-pic">
                        <img src={`/users/${msg.avatar}`} alt="user" />
                      </div>
                      <div className="message-text">
                        {msg.message}
                      </div>
                    </div>
                  </div>
                   ))
                   : null } */}

              </div>

              <form className="message-control" onSubmit={sendMessage}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type Something...." />
                <button>
                  <img src="/assets/send.png" alt="send"/>
                  <span style={{ display: 'inline-block' }}>Send</span>
                </button>
              </form>


            </Col>
          </Row>
        </Container>

        {/* show all availble user */}
        {/* select user and switch to chat */}

      </Container>

    </Layout>
  )

}

export default Home
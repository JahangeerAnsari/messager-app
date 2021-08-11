import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';

import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
// import { fetchAllUsers, getConversationsAction } from '../../actions/user.action';
import { getConversationsAction } from '../../actions/user.action';
import Axios from "../../Axios";
const socket = io.connect('http://localhost:8000');

// socket.disconnect()
/**
* @author
* @function Home
**/


const Home = (props) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(auth.user);
  const [opponentUser, selectOpponentUser] = useState(undefined);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  // useEffects
  useEffect(() => {
    console.log("====> hom epage ")
    // dispatch(fetchAllUsers())
    // fetchAllUsers();
    socket.emit("get_all_users");
    socket.on("new_message", (data) => {
      selectOpponentUser(old => {
        if (old && (old._id === data.data.receiverId || old._id === data.data.senderId)) {
          if(old.chats) {
            old.chats = [...old.chats, data.data];
          }
          else {
            old.chats = [data.data];
          }
          return old;
        }
        return old;
      });
      // setChats(oldChats => {

      //   console.log("----------------> [...oldChats, ...newO.chats] ::::::: ", [...oldChats, data.data])

      //   // selectOpponentUser(old => {
      //   //   console.log("opponentUser old >>>>>>>>>>>", old);
      //   //   if (old._id === data.data.receiverId || old._id === data.data.senderId) {
      //   //     old.chats = [...oldChats, data.data];
      //   //     console.log("new opponentUser old >>>>>>>>>>>", old);
      //   //     return old;
      //   //   }
      //   //   return old;
      //   // });


      //   return [...oldChats, data.data];
      //   // return [...oldChats];
      // });
      // selectOpponentUser(old => {
      //   console.log('=====>************ old opp user : ', old._id, data.data.senderId, data.data.receiverId, old._id === data.data.receiverId, old,);


      //   if (old._id === data.data.receiverId || old._id === data.data.senderId) {
      //     let newO;
      //     if (old.chats) {
      //       newO = { ...old, chats: [...old.chats, data.data] }
      //       // console.log('=====>************ newO: ', JSON.stringify(newO))
      //     }
      //     else {
      //       newO = { ...old, chats: [data.data] }
      //       // console.log('=====> %%%%%%%%%% newO: ', JSON.stringify(newO))
      //     }
      //     if (newO) {
      //       // console.log("----------------> new chats ::::::: ", newO.chats)
      //       setChats(oldChats => {
      //         console.log("----------------> [...oldChats, ...newO.chats] ::::::: ", [...oldChats, data.data])
      //         return [...oldChats, data.data];
      //         // return [...oldChats];
      //       });
      //       // console.log("-----> updated new chats : ", chats)
      //     }
      //     // return newO;
      //   }
      //   return old;
      // });
    });

    socket.on("return_all_users", (data) => {
      setUsers(data.users);
    });


  }, []);


  const handleSelectedOpponentUser = (user) => {
    console.log("====> handle select op user....", user, auth.user._id, user._id, user)
    // selectOpponentUser(user)
    getConversations(auth.user._id, user._id, user);
  }
  const renderUserLists = () => {
    return users && users.map((user, i) => {
      return <Container key={i} fluid className="userBox" onClick={() => handleSelectedOpponentUser(user)}>
        <div className="image">
          <img src="/users/1.png" alt="user" />
        </div>
        <div className="otherDetails">
          {`${user.firstName} ${user.lastName}`}
        </div>
      </Container>
    });
  }

  // const renderChats = () => {
  //   console.log("--------> render-----------------");
  //   return chats && chats.map((chat, i) => {
  //     return <p key={i}>{chat.message}</p>
  //   });
  // }
  const renderChats = () => {
    return opponentUser && opponentUser.chats && opponentUser.chats.map((chat,i) => {
      return <p key={i}>{opponentUser.chats.length}{chat.message}</p>
    });
  }
  // const renderCurrentChats = () => {
    
  //   return currentUser && currentUser.chats && currentUser.chats.map((chat,i) => {
  //     console.log("currentUser.chats : +++", JSON.stringify(currentUser.chats))
  //     return <p key={i}>{currentUser.chats.length}{JSON.stringify(chat.message)}</p>
  //   });
   
  // }
  


  // send message 

  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      sender: currentUser._id,
      receiver: opponentUser._id,
      message
    };
    socket.emit("send_message", data);

  }
  const getConversations = async (senderId, receiverId, user) => {
    if (senderId && receiverId) {
      const url = `/conversations/${senderId}/${receiverId}`
      const res = await Axios.get(url);
      if (res.status === 200) {
        // setChats(res.data.chats)
        if(user) {
          const userChats = user.chats ? user.chats : [];
          selectOpponentUser({...user, chats: [...userChats, ...res.data.chats]})
        }
        // const userChats = user.chats ? user.chats : [];
        // if (user._id === receiverId || old._id === senderId) {
        //   selectOpponentUser({...user, chats: [...userChats, ...res.data.chats]})
        // }
        // selectOpponentUser(old => {
        //   console.log("************ opponentUser old >>>>>>>>>>>", old);
        //   if (old._id === receiverId || old._id === senderId) {
        //     if(old.chats)
        //       old.chats = [...old.chats, ...res.data.chats];
        //     else
        //       old.chats = [...res.data.chats];
        //     console.log("************  new opponentUser old >>>>>>>>>>>", JSON.stringify(old));
        //     return old;
        //   }
        //   return old;
        // });
      }
    }
  }

  return (
    <Layout>
      <Container style={{ marginTop: '1rem' }} className="text-center">

        <Container fluid className="chatContainer">
          <Row className="chatHeader" >
            <Col lg={3} md={3} sm={3} xs={3} className="left">
              <img src="/assets/chat.png" alt="" /><span><b>My Chat Application</b><br />{auth.user.firstName} {auth.user.lastName}</span>
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
                  <div className="push-right">
                  <div className="right-side-msg">
                    <div className="user-pic">
                      <img src="/users/1.png" alt="user" />
                    </div>
                    <div className="message-text">
                      {/* {renderCurrentChats()} */}
                    </div>
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
                  <img src="/assets/send.png" alt="send" />
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
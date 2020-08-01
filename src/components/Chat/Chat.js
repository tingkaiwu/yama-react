/*eslint-disable*/
import React, { Component, useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";

//chat
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';

import imagine1 from "assets/img/sidebar-1.jpg";
import imagine2 from "assets/img/sidebar-2.jpg";
import imagine3 from "assets/img/sidebar-3.jpg";
import imagine4 from "assets/img/sidebar-4.jpg";

import Button from "components/CustomButtons/Button.js";

//chat
const Messages = props => props.data.map(m => m[0] !== '' ? (<li><strong>{m[0]}</strong> : <div className="innermsg">{m[1]}</div></li>) : (<li className="update">{m[1]}</li>));
const Online = props => props.data.map(m => <li id={m[0]}>{m[1]}</li>)

export default function Chat(props) {
  const [classes, setClasses] = React.useState("dropdown show");
  const [bg_checked, setBg_checked] = React.useState(true);
  const [bgImage, setBgImage] = React.useState(props.bgImage);

  //chat
  const [id, setId] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [room, setRoom] = useState('');
  const [input, setInput] = useState('');
  const [socket] = useSocket('https://open-chat-naostsaecf.now.sh');
  socket.connect();
  const [messages, setMessages] = useImmer([]);
  const [online, setOnline] = useImmer([]);
  useEffect(() => {
    socket.on('message que', (nick, message) => {
      setMessages(draft => {
        draft.push([nick, message])
      })
    });

    socket.on('update', message => setMessages(draft => {
      draft.push(['', message]);
    }))

    socket.on('people-list', people => {
      let newState = [];
      for (let person in people) {
        newState.push([people[person].id, people[person].nick]);
      }
      setOnline(draft => { draft.push(...newState) });
      console.log(online)
    });

    socket.on('add-person', (nick, id) => {
      setOnline(draft => {
        draft.push([id, nick])
      })
    })

    socket.on('remove-person', id => {
      setOnline(draft => draft.filter(m => m[0] !== id))
    })

    socket.on('chat message', (nick, message) => {
      setMessages(draft => { draft.push([nick, message]) })
    })
  }, 0);

  const handleSubmit = e => {
    e.preventDefault();
    if (!nameInput) {
      return alert("Name can't be empty");
    }
    setId(nameInput);
    socket.emit("join", nameInput, room);
  };

  const handleSend = e => {
    e.preventDefault();
    if (input !== '') {
      socket.emit('chat message', input, room);
      setInput('');
    }
  }
  //chat

  const handleClick = () => {
    props.handleChatClick();
  };

  return (
    <div
      className={classnames("chat fixed-plugin", {
        "rtl-fixed-plugin": props.rtlActive
      })}
    >
      <div id="fixedPluginClasses" className={props.chatClasses}>
        <div onClick={handleClick}>
          <i className="fa fa-commenting fa-2x" />
        </div>
        {id ? (
          <ul className="dropdown-menu">
            <Messages data={messages} />
            <li id="sendform">
              <form onSubmit={e => handleSend(e)}>
                <input id="m" onChange={e => setInput(e.target.value.trim())}/><button type="submit">Send</button>
              </form>
            </li>
          </ul>
        ) : (
          <div className="dropdown-menu">
            <form onSubmit={event => handleSubmit(event)}>
              <input id="name" onChange={e => setNameInput(e.target.value.trim())} required placeholder="What is your name .." /><br />
              <input id="room" onChange={e => setRoom(e.target.value.trim())} placeholder="What is your room .." /><br />
              <button type="submit">Submit</button>
            </form>
          </div>
        )};
      </div>
    </div>
  );
}

Chat.propTypes = {
  bgImage: PropTypes.string,
  handleChatClick: PropTypes.func,
  rtlActive: PropTypes.bool,
  chatClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func
};

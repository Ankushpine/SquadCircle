import React, { useContext, useEffect, useState } from "react";
import style from "../Styles/Chat.module.css";
import { IoIosSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { barContext } from "../Context/barContext";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_PORT;

const Chat = () => {
  const { authUser, messages, setMessages } = useContext(AuthContext);
  const { showBar, setShowBar, emojiPicer, setEmojiPicer, text, setText } =
    useContext(barContext);

  const onClickBar = () => {
    setShowBar(!showBar);
  };

  const onClickEmoji = () => {
    setEmojiPicer(!emojiPicer);
  };

  const convertTimeStamp = (timestamp) =>{
    let dateObj = new Date(timestamp);

    dateObj.setUTCHours(dateObj.getUTCHours() + 5); 
    dateObj.setUTCMinutes(dateObj.getUTCMinutes() + 30); 
  
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();

    let formattedTime = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
    return formattedTime;
  }

  const onClickLike = async (Msgid) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { authorization: `Bearer ${token}` };
      await axios.post(`${serverUrl}/api/user/likemessages/${authUser.id}`,{ messageId: Msgid },{ headers });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    async function fetchMessages() {
      const token = localStorage.getItem("token");

      try {
        const headers = { authorization: `Bearer ${token}` };
        const messagesFetched = await axios.get(`${serverUrl}/api/user/getmessages`,{ headers });
        const messages = messagesFetched.data;
        setMessages(messages);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchMessages();
  }, []);

  async function postMessages() {
    if (text != "") {
      try {
        const token = localStorage.getItem("token");
        const headers = { authorization: `Bearer ${token}` };
        await axios.post(`${serverUrl}/api/user/postmessages/${authUser.id}`,{ message: text },{ headers });
      } catch (error) {
        console.log(error);
      } finally {
        setText("");
      }
    }
  }

  return (
    <>
      <div className={style.ChatContainer}>
        <div className={style.ChatContainerHead}>
          <FaBars className={style.BarIcon} onClick={onClickBar} />
          <div className={style.Heading}>
            <p>Innovation hub</p>
            <span>Group to discuss new project ideas</span>
          </div>
        </div>

        <div className={style.ChatArea}>
          {messages.length > 0 &&
            messages.map((ele, id) => (
              <div key={id} className={style.ChatDiv}>
                <div className={style.ChatInfo}>
                  <span className={style.ChatImgDiv}>
                    <div className={style.ChatImg}>
                      <img src={ele.user?.image} />
                    </div>
                  </span>
                  <span className={style.ChatName}>{ele.user.name}</span>
                  <span className={style.ChatTime}>{convertTimeStamp(ele.createdAt)}</span>
                </div>

                <div className={style.ChatText}>
                  {ele.message}
                  <span className={ele.likes.length > 0? style.ChatLikeActive : style.ChatLikeInActive} >
                    <AiFillLike
                      className={style.ChatLikebtn}
                      onClick={() => onClickLike(ele._id)}
                    />
                    {ele.likes.length > 0 && (
                      <span>{Number(ele.likes.length)}</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
        </div>

        <div className={style.TextArea}>
          <div className={style.TextContent}>
            <MdOutlineEmojiEmotions
              className={style.ImojiIcon}
              onClick={onClickEmoji}
            />

            <input
              className={style.TextMessage}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter the message...."
            />
          </div>

          <div className={style.SendIconDiv} onClick={postMessages}>
            <IoIosSend className={style.SendIcon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;

import React, { useState } from "react";
import { Chat, Sidebar } from "../Components";
import style from "../Styles/MainChat.module.css";
import { barContext } from "../Context/barContext";
import EmojiPicker from "emoji-picker-react";

const MainChat = () => {
  const [showBar, setShowBar] = useState(false);
  const [emojiPicer, setEmojiPicer] = useState(false);
  const [text, setText] = useState("");

  const onEmojiClick = (a) => {
    setText((pre) => pre + a.emoji);
  };

  return (
    <>
      <div className={style.MainChat}>
        <barContext.Provider
          value={{
            showBar,
            setShowBar,
            emojiPicer,
            setEmojiPicer,
            text,
            setText
          }}
        >
          <Sidebar />
          <div className={emojiPicer ?  style.EmojiPickerUp : style.EmojiPickerDown }>
            <EmojiPicker 
            width={250} 
            height={390} 
            theme="dark" 
            open={emojiPicer}
            onEmojiClick={onEmojiClick}
            
            />
          </div>
          <Chat />
        </barContext.Provider>
      </div>
    </>
  );
};

export default MainChat;

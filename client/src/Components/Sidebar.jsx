import React, { useContext } from "react";
import style from "../Styles/Sidebar.module.css";
import { MdEmail } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { barContext } from "../Context/barContext";
import useLogout from "../Hooks/useLogout";
import { AuthContext } from "../Context/AuthContext";

const Sidebar = () => {
  const { authUser } = useContext(AuthContext);
  const { loading, logout } = useLogout();
  const { showBar, setShowBar } = useContext(barContext);

  const onClickBar = () => {
    setShowBar(!showBar);
  };

  return (
    <div className={showBar ? style.SidebarMob : style.Sidebar}>
      <div className={style.Heading}>
        <FaBars className={style.BarIcon} onClick={onClickBar} />
        SquadCircle
      </div>
      <div className={style.UserInfo}>
        <div className={style.UserImage}>
          <img src={authUser.image} alt="" />
        </div>
        <div className={style.UserName}>{authUser.name}</div>
        <div className={style.UserEmail}>
          <MdEmail className={style.EmailIcon} />
          {authUser.email}
        </div>
      </div>

      <div className={style.SquadCircleInfo}>
        Welcome to SqualCircle, the dynamic group chat experience where every
        individual can freely share their ideas and collaborate with others.
      </div>

      <div className={style.LogOutButtonDiv}>
        <button className={style.LogOutButton} onClick={logout}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

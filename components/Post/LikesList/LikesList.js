import { useEffect, useRef, useState } from "react";
import styles from "./likesList.module.css";
import LikesListUser from "./LikesListUser/LikesListUser";

export default function LikesList() {
  const ref = useRef();

  const [showLikesList, setShowLikesList] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowLikesList(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <span
      ref={ref}
      className={styles.likes}
      onClick={() => setShowLikesList(true)}
    >
      5 likes
      {showLikesList && (
        <div className={styles.container}>
          <div className={styles.likesContainer}>
            <PlaceHolder />
            {/* <LikesListUser />
            <LikesListUser /> */}
          </div>
        </div>
      )}
    </span>
  );
}

export const PlaceHolder = () => {
  var list = [];

  for (var i = 0; i < 4; i++)
    list.push(
      <div key={i} className={styles.item}>
        <div className={styles.circle}></div>
        <div className={styles.line}></div>
      </div>
    );

  return <div className={styles.loadingContainer}>{list}</div>;
};

// import React, { useState } from "react";
// import { List, Popup, Image } from "semantic-ui-react";
// import catchErrors from "../../../utils/catchErrors";
// import Router from "next/router";
// import { LikesPlaceHolder } from "../../Layout/PlaceHolderGroup";
// import { Axios } from "../../../utils/postActions";

// function LikesList({ postId, trigger }) {
//   const [likesList, setLikesList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const getLikesList = async () => {
//     setLoading(true);
//     try {
//       const res = await Axios.get(`/like/${postId}`);
//       setLikesList(res.data);
//     } catch (error) {
//       alert(catchErrors(error));
//     }
//     setLoading(false);
//   };

//   return (
//     <Popup
//       on="click"
//       onClose={() => setLikesList([])}
//       onOpen={getLikesList}
//       popperDependencies={[likesList]}
//       trigger={trigger}
//       wide
//     >
//       {loading ? (
//         <LikesPlaceHolder />
//       ) : (
//         <>
//           {likesList.length > 0 && (
//             <div
//               style={{
//                 overflow: "auto",
//                 maxHeight: "15rem",
//                 height: "15rem",
//                 minWidth: "210px"
//               }}
//             >
//               <List selection size="large">
//                 {likesList.map(like => (
//                   <List.Item key={like._id}>
//                     <Image avatar src={like.user.profilePicUrl} />

//                     <List.Content>
//                       <List.Header
//                         onClick={() => Router.push(`/${like.user.username}`)}
//                         as="a"
//                         content={like.user.name}
//                       />
//                     </List.Content>
//                   </List.Item>
//                 ))}
//               </List>
//             </div>
//           )}
//         </>
//       )}
//     </Popup>
//   );
// }

// export default LikesList;

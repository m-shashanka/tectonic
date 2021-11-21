import React, { useState } from "react";
import styles from "./messageInputField.module.css";

export default function MessageInputField({socket,user,messagesWith}) {
  
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () =>{
    if(loading || !text || text.trim().length === 0)
      return;
    // setLoading(true);
    // setLoading(false);
  }

  return (
    <div className={styles.yourMessage}>
      <input
        type="text"
        placeholder="Send Message"
        name="message"
        value={text}
        onChange={e=>setText(e.target.value)}
      />
      <img src="/send.png" alt="send" onClick={handleSubmit}/>
    </div>
  );
}

// import React, { useState } from "react";
// import { Form, Segment } from "semantic-ui-react";

// function MessageInputField({ sendMsg }) {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   return (
//     <div style={{ position: "sticky", bottom: "0" }}>
//       <Segment secondary color="teal" attached="bottom">
//         <Form
//           reply
//           onSubmit={e => {
//             e.preventDefault();
//             sendMsg(text);
//             setText("");
//           }}
//         >
//           <Form.Input
//             size="large"
//             placeholder="Send New Message"
//             value={text}
//             onChange={e => setText(e.target.value)}
//             action={{
//               color: "blue",
//               icon: "telegram plane",
//               disabled: text === "",
//               loading: loading
//             }}
//           />
//         </Form>
//       </Segment>
//     </div>
//   );
// }

// export default MessageInputField;

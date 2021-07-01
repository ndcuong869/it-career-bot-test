import Widget from "rasa-webchat";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";

export default function CustomWidget() {
  const webchatRef = useRef(null);
  const payload = "/greet";

  const channel = new BroadcastChannel("app-data");
  channel.addEventListener("message", (event) => {
    if (event.data.is_login === true) {
      const user_id = event.data.user_id;
      console.log('user id: ' + user_id)
      if (webchatRef.current && webchatRef.current.sendMessage) {
        webchatRef.current.sendMessage('/greetWithName{"user_id": \"'+ user_id + '\"}');
        console.log("send message");
      }
    }
  });

  return (
    <Widget
      ref={webchatRef}
      initPayload={payload}
      socketUrl={"http://localhost:5005"}
      customData={{ language: "en" }}
      title="IT Career Bot"
      subtitle="Powered by FIT-HCMUS"
      showFullScreenButton={true}
      showMessageDate={false}
      profileAvatar="https://i.ibb.co/wQqdKPf/chatbot-icon.png"
    />
  );
}

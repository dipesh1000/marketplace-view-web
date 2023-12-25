import * as pusherDetails from "../../utils/pusher";
import Pusher from "pusher-js";
import Store from "../../redux/store";
import { pusherUserNotifications } from "./redux/Action";
import { addChatList, addMessage } from "../chat/redux/Action";
import {
  fetchAddedUsers,
  fetchRemovedUsers,
  fetchSubscribedUsers,
} from "../../redux/Online/Action";

export const pusherBind = (userId, token) => {
  const options = {
    broadcaster: "pusher",
    key: pusherDetails.pusherAppId,
    cluster: pusherDetails.pusherAppCluster,
    forceTLS: false,
    //authEndpoint is your apiUrl + /broadcasting/auth
    authEndpoint: pusherDetails.authEndpoint,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  };
  if (userId) {
    const pusher = new Pusher(pusherDetails.pusherAppId, options);

    var channel = pusher.subscribe("private-user-notification." + userId);
    channel.bind(
      "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
      (data) => {
        //   const exists = checkNotificationExists(data, userNotifications);
        if (true) {
          Store.dispatch(pusherUserNotifications(data));
          // dispatch(showMessageIcon());
        }
      }
    );
    var chatChannel = pusher.subscribe("private-chat." + userId);
    chatChannel.bind(
      "Notification\\Events\\NewChatMessage",

      (data) => {
        const store = Store.getState();
        const { user } = store.auth;
        console.info(data);
        //   const exists = checkNotificationExists(data, userNotifications);
        if (true) {
          Store.dispatch(addChatList(data, user?.id));
          Store.dispatch(addMessage(data));

          // dispatch(showMessageIcon());
        }
      }
    );

    var presenceChannel = pusher.subscribe("presence-onlineuser");
    presenceChannel.bind("pusher:subscription_succeeded", (members) => {
      Store.dispatch(fetchSubscribedUsers(members));
    });

    presenceChannel.bind("pusher:member_added", (member) => {
      Store.dispatch(fetchAddedUsers(member));
    });

    presenceChannel.bind("pusher:member_removed", (member) => {
      Store.dispatch(fetchRemovedUsers(member));
    });
  }
};

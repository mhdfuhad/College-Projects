import { useState, useContext, useEffect } from "react";
import { stringAvatar } from "../../utils";
import { UserDataContext } from "../../../../context/userDataContext";
import {
  createCameraVideoTrack,
  createMicrophoneAudioTrack,
  createClient,
  AgoraVideoPlayer,
} from "agora-rtc-react";
import axios from "axios";

// Styling
import {
  CallEnd,
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
} from "@mui/icons-material";
import { Stack, Typography, Avatar, Dialog, IconButton } from "@mui/material";
import "./CallWindow.css";

const useAudio = createMicrophoneAudioTrack();
const useVideo = createCameraVideoTrack();
const useClient = createClient({ mode: "rtc", codec: "vp8" });

function CallWindow({ onClose, userInfo, host, video }) {
  const { userData } = useContext(UserDataContext);
  const [trackState, setTrackState] = useState({ video: video, audio: true });
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();

  const { ready: readyVideo, track: trackVideo } = useVideo();
  const { ready: readyMic, track: trackMic } = useAudio();

  const getToken = async (channel) => {
    const response = await axios.get(
      process.env.REACT_APP_SUBMERGE_API_ENDPOINT + "api/rtcToken",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },

        params: {
          channelName: channel,
          uid: userData._id,
        },
      }
    );

    return response.data.key;
  };

  useEffect(() => {
    const init = async (name) => {
      const token = await getToken(name);
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video" && video) {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }

        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }

        if (mediaType === "video" && video) {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(
          "3c9f9c5e04d64d65811f5852d2d18568",
          name,
          token,
          userData._id
        );
      } catch (error) {
        console.log(error);
      }

      if (trackMic) await client.publish([trackMic]);

      if (trackVideo) await client.publish([trackVideo]);

      console.log("publish");
      setStart(true);
    };

    if (video && readyVideo) {
      if (readyMic && trackMic && readyVideo && trackVideo) {
        try {
          init(host);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (readyMic && trackMic) {
        try {
          init(host);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [host, client, readyMic, readyVideo]);

  const mute = async (type) => {
    if (type === "audio") {
      await trackMic.setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await trackVideo.setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    if (trackMic) trackMic.close();
    if (trackVideo) trackVideo.close();
    setStart(false);
    onClose();
  };

  return (
    <Dialog fullScreen open={start} onClose={onClose}>
      <Stack
        sx={{ height: "90vh", backgroundColor: "black", paddingTop: 4 }}
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        {start && (
          <>
            {trackState.video ? (
              <>
                {trackVideo ? (
                  <Stack className="userBox">
                    <AgoraVideoPlayer
                      videoTrack={trackVideo}
                      className="video"
                    />
                    <Typography fontSize={20} fontWeight="500" color="white">
                      {userData.firstName + " " + userData.lastName}
                    </Typography>
                  </Stack>
                ) : (
                  <>
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      className="userBox"
                    >
                      <AgoraVideoPlayer videoTrack={trackMic} />
                      <Avatar
                        {...stringAvatar(
                          userData.firstName + " " + userData.lastName
                        )}
                        sx={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          mb: 2,
                        }}
                      />
                      <Typography fontSize={20} fontWeight="500" color="white">
                        {userData.firstName + " " + userData.lastName}
                      </Typography>
                    </Stack>
                  </>
                )}
              </>
            ) : (
              <>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  className="userBox"
                >
                  <Avatar
                    {...stringAvatar(
                      userData.firstName + " " + userData.lastName
                    )}
                    sx={{ width: 60, height: 60, objectFit: "cover", mb: 2 }}
                  />
                  <Typography fontSize={20} fontWeight="500" color="white">
                    {userData.firstName + " " + userData.lastName}
                  </Typography>
                </Stack>
              </>
            )}
          </>
        )}
        {users.length > 0 ? (
          users.map((usr) => {
            return usr.videoTrack ? (
              <>
                <Stack className="userBox" key={usr.uid}>
                  <AgoraVideoPlayer
                    videoTrack={usr.videoTrack}
                    className="video"
                  />
                  <Typography fontSize={20} fontWeight="500" color="white">
                    {userInfo.name}
                  </Typography>
                </Stack>
              </>
            ) : (
              <>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  className="userBox"
                >
                  <Avatar
                    {...stringAvatar(userInfo.name)}
                    sx={{ width: 60, height: 60, objectFit: "cover", mb: 2 }}
                  />
                  <Typography fontSize={20} fontWeight="500" color="white">
                    {userInfo.name}
                  </Typography>
                </Stack>
              </>
            );
          })
        ) : (
          <>
            <Stack
              justifyContent="center"
              alignItems="center"
              className="userBox"
            >
              <Avatar
                {...stringAvatar(userInfo.name)}
                sx={{ width: 60, height: 60, objectFit: "cover", mb: 2 }}
              />
              <Typography fontSize={20} fontWeight="500" color="white">
                {userInfo.name}
              </Typography>
            </Stack>
          </>
        )}
      </Stack>

      <Stack
        sx={{ height: "10vh", bgcolor: "#202020" }}
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          sx={{ width: "30vw" }}
          direction="row"
          justifyContent="space-around"
        >
          {video && (
            <IconButton
              style={{ backgroundColor: "#181818" }}
              onClick={() => mute("video")}
            >
              {!trackState.video ? (
                <Videocam fontSize="large" sx={{ color: "#fff" }} />
              ) : (
                <VideocamOff fontSize="large" sx={{ color: "#fff" }} />
              )}
            </IconButton>
          )}
          <IconButton
            style={{ backgroundColor: "#181818" }}
            onClick={() => mute("audio")}
          >
            {trackState.audio ? (
              <Mic fontSize="large" sx={{ color: "#fff" }} />
            ) : (
              <MicOff fontSize="large" sx={{ color: "#fff" }} />
            )}
          </IconButton>
          <IconButton
            style={{ backgroundColor: "#CC0000" }}
            onClick={() => {
              leaveChannel();
            }}
          >
            <CallEnd fontSize="large" sx={{ color: "#fff" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default CallWindow;

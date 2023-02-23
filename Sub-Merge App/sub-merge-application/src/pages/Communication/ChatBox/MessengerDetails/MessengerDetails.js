import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../utils";
import Container from "@mui/material/Container";
import AddMemberModal from "./AddMemberModal";
import axios from "axios";

export default function MessengerDetails({ users, curr, setGr, frList }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const removeMember = (id) => {
    axios
      .delete(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/communication/group/member/" +
          curr.id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          data: {
            participant: id,
          },
        }
      )
      .then((res) => {
        setGr(users.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const leaveGroup = (id) => {
    axios
      .delete(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/communication/group/leave/" +
          curr.id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          data: {
            participant: id,
          },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box marginTop={5} overflow={"auto"} marginLeft={5}>
      {curr.group && (
        <Stack direction={"row"} spacing={10} marginBottom={6} marginLeft={15}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#22C55E",
              textTransform: "none",
              width: "40%",
            }}
            onClick={() => setOpen(true)}
          >
            Add Member
          </Button>
          <AddMemberModal
            open={open}
            onClose={handleClose}
            friendsList={frList}
            group={curr}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#22C55E",
              textTransform: "none",
              width: "40%",
            }}
            onClick={() => leaveGroup(localStorage.getItem("id"))}
          >
            Leave Group Chat
          </Button>
        </Stack>
      )}

      <Container>
        <Box marginTop={5} marginBottom={10}>
          <Typography
            component="h3"
            variant="h3"
            color="text.primary"
            gutterBottom
            marginBottom={2}
          >
            Members
          </Typography>

          {users?.map((user, index) => (
            <Stack
              direction="row"
              alignItems="center"
              key={index}
              marginBottom={2}
            >
              <Avatar
                {...stringAvatar(user.name)}
                sx={{ width: 60, height: 60, objectFit: "cover" }}
              />

              <Box marginLeft={2} width={"50%"}>
                {user.name}
              </Box>

              {curr.group && curr.host === localStorage.getItem("id") && (
                <>
                  {user.id !== curr.host && (
                    <Stack direction={"column"} width={"50%"}>
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                      >
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#22C55E",
                            textTransform: "none",
                          }}
                          onClick={() => removeMember(user.id)}
                        >
                          Remove Member
                        </Button>
                      </Box>
                    </Stack>
                  )}
                </>
              )}
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

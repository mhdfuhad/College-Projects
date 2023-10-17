// Material UI
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import Form from "react-bootstrap/Form";

export default function LanguageFilter({ language }) {
  const handleOnChange = (event) => {
    language.setLanguageState(event.target.value);
  };

  return (
    <Box
      sx={{
        pb: 2,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Typography variant="h5" gutterBottom>
          Language
        </Typography>
        <Form.Select style={{ width: "max-content" }} onChange={handleOnChange}>
          <option value="">Any</option>
          <option value="ar">Arabic</option>
          <option value="zh">Chinese</option>
          <option value="cs">Czech</option>
          <option value="da">Danish</option>
          <option value="nl">Dutch</option>
          <option value="en">English</option>
          <option value="fi">Finnish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="el">Greek</option>
          <option value="he">Hebrew</option>
          <option value="hi">Hindi</option>
          <option value="hu">Hungarian</option>
          <option value="is">Icelandic</option>
          <option value="id">Indonesian</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="no">Norwegian</option>
          <option value="pl">Polish</option>
          <option value="pt">Portuguese</option>
          <option value="ro">Romanian</option>
          <option value="ru">Russian</option>
          <option value="es">Spanish</option>
          <option value="sw">Swahili</option>
          <option value="sv">Swedish</option>
          <option value="th">Thai</option>
          <option value="tr">Turkish</option>
          <option value="vi">Vietnamese</option>
        </Form.Select>
      </Stack>
    </Box>
  );
}

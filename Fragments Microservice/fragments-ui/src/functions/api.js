// src/api.js

// fragments microservice API, defaults to localhost:8080
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user, expand) {
  console.log("Requesting user fragments data...");
  try {
    const res = await fetch(
      expand === false
        ? `${apiUrl}/v1/fragments`
        : `${apiUrl}/v1/fragments?expand=1`,
      {
        // Generate headers with the proper Authorization bearer token to pass
        headers: user.authorizationHeaders(),
      }
    );
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", { data });
    return data;
  } catch (err) {
    console.error("Unable to call GET /v1/fragment", { err });
  }
}

export async function getFragment(user, fragmentID, expand, ext) {
  console.log("Requesting fragment data...");
  try {
    const res = await fetch(
      expand === false
        ? `${apiUrl}/v1/fragments/${fragmentID}` + (ext ? `${ext}` : "")
        : `${apiUrl}/v1/fragments/${fragmentID}/info`,
      {
        // Generate headers with the proper Authorization bearer token to pass
        headers: user.authorizationHeaders(),
      }
    );
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const type = res.headers.get("Content-Type");
    let data;

    if (type.includes("application/json")) {
      data = await res.json();
    } else if (type.includes("text")) {
      data = await res.text();
    } else {
      data = await res.blob();
    }

    console.log("Got fragment data", { data });
    return data;
  } catch (err) {
    if (err.message.includes("404")) {
      return "404";
    }
    console.error("Unable to call GET /v1/fragment", { err });
  }
}

export async function saveFragment(user, body, type) {
  console.log("Saving fragment...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "POST",
      headers: user.authorizationHeaders(type),
      body: body,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Saved fragment", { data });
    return data;
  } catch (err) {
    console.error("Unable to call POST /v1/fragment", { err });
  }
}

export async function updateFragment(user, fragmentID, body, type) {
  console.log("Updating fragment...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentID}`, {
      method: "PUT",
      headers: user.authorizationHeaders(type),
      body: body,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Updated fragment", { data });
    return data;
  } catch (err) {
    console.error("Unable to call PUT /v1/fragment", { err });
  }
}

export async function deleteFragment(user, fragmentID) {
  console.log("Deleting fragment...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentID}`, {
      method: "DELETE",
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Deleted fragment", { data });
    return data;
  } catch (err) {
    console.error("Unable to call DELETE /v1/fragment", { err });
  }
}

// Prefix url string for api calls
app.constant("endPoint", {
  api: 'http://localhost:8000',
  resourceApi: 'http://localhost:8000\:8000',
  cdn: 'http://staging.dirtyrottenrides.netdna-cdn.com'
});

app.constant("imgPlaceholder", "components/com_community/assets/user.png");

// Location for session information within sessionStorage
// Related to authentication & session
app.constant("sessionStore", "_starqle_session");

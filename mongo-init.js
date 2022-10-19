db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [
    {
      role: "readWrite",
      db: "monitorDam",
    },
  ],
});

db.createCollection("user_profiles", (err, res) => {
  if (err) throw err;
});
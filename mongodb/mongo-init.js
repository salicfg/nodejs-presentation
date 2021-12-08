db.auth('admin', 'password123')
db = db.getSiblingDB('nodejsdemo')
db.createUser(
  {
    user: "pontuser",
    pwd: "pontuser123",
    roles: [
      {
        role: "readWrite",
        db: "nodejsdemo"
      }
    ]
  }
);
db.user.insert({name: "init",})
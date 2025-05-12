db = db.getSiblingDB('booking-app');

for (let i = 1; i <= 1000; i++) {
  db.user.insert({
    email: `user${i}@email.com`,
    password: '$2b$10$0HfBknL9SnCP9Q6M8G2zOute4EFDKdZwS1wPayePyySwzppesXSm2', // 12345
  });
}

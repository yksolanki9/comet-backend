module.exports = {
  async up(db, client) {
    await db.collection("notes").createIndex({ userId: 1 });
  },

  async down(db, client) {
    await db.collection("notes").dropIndex({ userId: 1 });
  },
};

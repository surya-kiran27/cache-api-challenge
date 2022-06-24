function checkIfEntryExpired(entry) {
  return entry.expiresAt < Date.now();
}

module.exports = checkIfEntryExpired;

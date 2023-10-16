const workingHours = [];
for (let hour = 8; hour < 17; hour++) {
  for (let minute = 0; minute < 60; minute += 15) {
    if (minute === 15 && hour !== 16) {
      workingHours.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    } else {
      workingHours.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  }
}

module.exports = workingHours;

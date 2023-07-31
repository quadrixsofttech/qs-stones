const cron = require('node-cron');
const mongoose = require('mongoose');
const User = require('./models/user.model');

const cronUpdateVacation = cron.schedule('0 0 1 7 *', async () => {
  try {
    const currentYear = new Date().getFullYear();

    await User.updateMany(
      {
        vacation: {
          $not: {
            $elemMatch: { year: currentYear + 1 },
          },
        },
      },
      {
        $addToSet: {
          vacation: {
            year: currentYear + 1,
            vacationDays: 20,
            usedDays: 0,
          },
        },
      }
    );
  } catch (error) {
    console.error('Error updating vacation days:', error.message);
  }
});

function startCronJobs() {
  cronUpdateVacation.start();
}

module.exports = { startCronJobs };

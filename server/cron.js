const cron = require('node-cron');
const mongoose = require('mongoose');
const User = require('./models/user.model');

const cronUpdateVacation = cron.schedule('0 0 1 7 *', async () => {
  try {
    const currentYear = new Date().getFullYear();

    const usersToUpdate = await User.find({
      vacation: {
        $not: {
          $elemMatch: { year: currentYear + 1 },
        },
      },
    });

    for (const user of usersToUpdate) {
      //Create function that will calculate newVacationDays based on rules of days increase
      const newVacationDays = user.startingVacationDays + 1;

      await User.updateOne(
        { _id: user._id },
        {
          $addToSet: {
            vacation: {
              year: currentYear + 1,
              vacationDays: newVacationDays,
              usedDays: 0,
              initialVacationDays: newVacationDays,
            },
          },
        }
      );
    }
  } catch (error) {
    console.error('Error updating vacation days:', error.message);
  }
});

function startCronJobs() {
  cronUpdateVacation.start();
}

module.exports = { startCronJobs };

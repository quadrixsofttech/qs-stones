const employees = {
  id: 1,
  workingToday: 22,
  awayOrRemote: 10,
  percentIncrease: 15.38,
  percentDecrease: 7.88,
  requests: [
    {
      type: 'vacation',
      time: '2023-04-03 11:58',
      user: {
        name: 'Milos Stosic',
        role: 'ADMIN',
      },
      requestedDates: [
        '2023-04-04',
        '2023-04-10',
        '2023-05-02',
        '2023-05-05',
        '2023-05-20',
        '2023-05-20',
      ],
      status: 'pending',
    },
    {
      type: 'remote',
      time: '2023-04-03 11:58',
      user: {
        name: 'Milos Stosic',
        role: 'ADMIN',
      },
      requestedDates: ['2023-04-04', '2023-04-04'],
      status: 'rejected',
      response:
        'Ne moze jer bi trebalo da budes u kancelariji jer imamo bitan sastanak sa klijentima i trebalo bi da prisustvujes',
    },
    {
      type: 'remote',
      time: '2023-04-03 11:58',
      user: {
        name: 'Milos Stosic',
        role: 'ADMIN',
      },
      requestedDates: ['2023-04-04', '2023-04-04'],
      status: 'approved',
      response:
        'Ne moze',
    },
  ],
};

export default employees;

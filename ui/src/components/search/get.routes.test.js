export default {
  query: {
    depart: "MEMPHIS",
    arrive: "CHATTANOOGA"
  },

  input: [
    {id: null, origin: "MEMPHIS", destination: "KNOXVILLE", flightTime: 2, offset: 2},
    {id: null, origin: "MEMPHIS", destination: "CHATTANOOGA", flightTime: 2, offset: 4},
    {id: null, origin: "KNOXVILLE", destination: "CHATTANOOGA", flightTime: 3, offset: 9},
    {id: null, origin: "CHATTANOOGA", destination: "MEMPHIS", flightTime: 1, offset: 9},
    {id: null, origin: "NASHVILLE", destination: "KNOXVILLE", flightTime: 3, offset: 18}
  ],

  expected: [
    [
      {id: null, origin: "MEMPHIS", destination: "CHATTANOOGA", flightTime: 2, offset: 4}
    ],[
      {id: null, origin: "MEMPHIS", destination: "KNOXVILLE", flightTime: 2, offset: 2},
      {id: null, origin: "KNOXVILLE", destination: "CHATTANOOGA", flightTime: 3, offset: 9}
    ]
  ]
}
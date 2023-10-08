var osu = require('node-os-utils')
var cpu = osu.cpu
var mem = osu.mem

exports.cpuUsage = (req, res, next) => {
  cpu.usage()
    .then(cpuPercentage => {
      console.log(cpuPercentage) // 10.38
      res.status(200).send(`${cpuPercentage}`);
    })
}

exports.memUsage = (req, res, next) => {
  mem.info()
    .then(info => {
      console.log(info)
      res.status(200).send(`${JSON.stringify(info)}`);
    })
}

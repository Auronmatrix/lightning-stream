module.exports = {
  sleep: (ms) => {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  },
  logbreak: (title) => {
    console.log(title ? '\n========================== ' + title + ' ==========================\n' : '\n======================================================================\n')
  }
}

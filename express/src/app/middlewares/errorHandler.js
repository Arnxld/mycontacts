module.exports = (error, request, response, next) => {
  console.log('Error handler: ', error)
  response.sendStatus(500)
}

const chalk = require("chalk")

require("gh-pages").publish("dist", (err) => {
  if (err) throw new Error(err)
  console.log(chalk.green("Published to gh-pages ^_^"))
})

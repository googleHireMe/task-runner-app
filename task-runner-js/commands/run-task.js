const Tree = require('../tools/tree');

module.exports = async function runTask(task, awailableTasks, handleOutputMessage) {
  const settings = { handleOutputMessage: handleOutputMessage, handleOutputError: handleOutputMessage };
  const tree = new Tree(task, awailableTasks, settings);
  return await tree.executeRootCommand();
}
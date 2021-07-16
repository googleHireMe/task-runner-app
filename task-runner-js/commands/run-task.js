const Tree = require('../tools/tree');

module.exports = async function runTask(task, awailableTasks, handleOutputMessage, handleOutputError) {
  const settings = { handleOutputMessage: handleOutputMessage, handleOutputError };
  const tree = new Tree(task, awailableTasks, settings);
  return await tree.executeRootCommand();
}
const simpleGit = require('simple-git')()

const Git = {};

// Git methods to Access Read only Properties of local repository

Git.getFullLog = function(){
  simpleGit.log(function(err, log) {
      console.log(log);
  })
}

Git.getLatestLogMessage = function(){
  simpleGit.log(function(err, log) {
      console.log(log.latest);
  })
}

Git.getCurrentBranch = function(){
  simpleGit.status(function(err, status){
    console.log(status.current);
  })
}

Git.getAllBranchNames = function(){
  simpleGit.branch(function(err, branches){
    console.log(branches.all); //returns an array
  })
}

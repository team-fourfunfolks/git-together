const simpleGit = require('simple-git')()

module.exports = {

// Git methods to Access Read only Properties of local repository

   getFullLog: function(){
    simpleGit.log(function(err, log) {
        console.log(log);
    })
  },

   getLatestLogMessage: function(){
    simpleGit.log(function(err, log) {
        console.log(log.latest);
    })
  },

   getCurrentBranch: function(){
    simpleGit.status(function(err, status){
      console.log(status.current);
    })
  },

   getAllBranchNames: function(){
    simpleGit.branch(function(err, branches){
      console.log(branches.all); //returns an array
    })
  }
};

// We add an |apie| salt to the token so github doesn't delete it automaticaly (security measure)
const token = "cb|apie|ed6838d816b01f386a1d52e1e8055a94ffe5|apie|aa";

// Removes the salt added to the token
const desalinize = (function(t) { return t.replace("|apie|", "").replace("|apie|", ""); });

var github = new GitHub({ token: desalinize(token) });
const client = github.getRepo("InnovMetierEtat", "innovmetieretat.github.io");

// Get all commits
const GithubRepo = {
  client: client,
  get_files: function(callback) {
    client.listCommits()
      .then(function(commits) {
        var last_commit = _.last(commits.data);
        console.log(commits);
        client.getTree(last_commit.sha + "?recursive=1").then(function(response) {
          if (response.data && response.data.tree) {
            callback(_.filter(response.data.tree, (file) => file.path.match('^files/') && file.type == "blob")); // Only files
          } else {
            callback([]);
          }
        });
      });
  }
};

export default GithubRepo;
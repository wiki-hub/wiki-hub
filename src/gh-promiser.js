import _GitHub from 'github-api';
import denodeify from 'denodeify';

export default function GHPromiser(token, GitHub = _GitHub) {
  const github = new GitHub({ token, auth: 'OAUTH_TOKEN' });

  return {
    contents: denodeify(({ owner, repo, branch, path }, callback) => {
      github.getRepo(owner, repo).contents(branch, path, callback);
    }),

    branch: denodeify(({ owner, repo, oldBranch, newBranch }, callback) => {
      github.getRepo(owner, repo).branch(oldBranch, newBranch, callback);
    }),

    fork: denodeify(({ owner, repo }, callback) => {
      github.getRepo(owner, repo).fork(callback);
    }),

    forks: denodeify(({ owner, repo }, callback) => {
      github.getRepo(owner, repo).listForks(callback);
    }),

    listBranches: denodeify(({ owner, repo }, callback) => {
      github.getRepo(owner, repo).listBranches(callback);
    }),

    listPulls: denodeify(({ owner, repo }, callback) => {
      github.getRepo(owner, repo).listPulls('open', callback);
    }),

    repos: denodeify(github.getUser().repos),

    pullRequest: denodeify(({ owner, repo, branch, message, head, body }, callback) => {
      const pull = { title: message, base: branch, head, body };
      github.getRepo(owner, repo).createPullRequest(pull, callback);
    }),

    write: denodeify(({ owner, repo, branch, path, text, message }, callback) => {
      github.getRepo(owner, repo).write(branch, path, text, message, callback);
    })
  }
}

import 'babel/polyfill';
import GHPromiser from './gh-promiser';
import atob from './atob';

export function load(opts) {
  return GHPromiser(opts.token).contents(opts).then(({ content }) => atob(content));
}

export function save(opts) {
  const github = GHPromiser(opts.token);
  const origin = opts.owner + '/' + opts.repo;
  opts.forkBranch = opts.forkBranch || 'wikihub';

  return Promise
    .all([getUsersRepos(github), getRepoForks(github, opts)])
    .then(findRepo(origin))
    .then(forkIfNotFound(github, opts))
    .then(ensureBranch(github, opts))
    .then(write(github, opts))
    .then(pullRequest(github, opts));
}

const returns = value => () => value;
const firstInBoth = (a, b) => a.find(x => b.includes(x));
const parseRepo = repo => repo.full_name;
const parseRepos = repos => repos.map(parseRepo);
const parsePulls = pulls => pulls.map(pull => pull.head.label);
const getUsersRepos = github => github.repos().then(parseRepos);
const getRepoForks = (github, opts) => github.forks(opts).then(parseRepos);
const findRepo = origin => ([repos, forks]) => firstInBoth([origin, ...forks], repos);
const forkIfNotFound = (github, opts) => name => name || github.fork(opts).then(parseRepo);

function ensureBranch(github, opts) {
  return name => {
    const [owner, repo] = name.split('/');

    return github.listBranches({ owner, repo }).then(branches => {
      return branches.includes(opts.forkBranch) ||
        github.branch({ owner, repo, oldBranch: opts.branch, newBranch: opts.forkBranch });
    }).then(returns(name));
  };
}

function write(github, opts) {
  return name => {
    const [owner, repo] = name.split('/');
    return github.write({ ...opts, owner, repo, branch: opts.forkBranch }).then(returns(name));
  };
}

function pullRequest(github, opts) {
  return name => {
    const [owner, repo] = name.split('/');
    const head = owner + ':' + opts.forkBranch;

    return github.listPulls(opts).then(parsePulls).then(pulls => {
      return pulls.includes(head) ? null : github.pullRequest({ ...opts, head, body });
    });
  };
}

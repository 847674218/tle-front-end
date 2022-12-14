// 提交者的简单信息
export interface IGHCommitSimpleAuthorAndCommitter {
  name: string;
  email: string;
  date: string;
}

// 提交者的信息细节
export interface IGHCommitDetailAuthorAndCommitter {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

// 提交的父级（似乎用不到）
export interface IGHCommitParent {
  sha: string;
  url: string;
  html_url: string;
}

// 提交
export interface IGHCommitRes {
  sha: string;
  node_id: string;
  commit: {
    author: IGHCommitSimpleAuthorAndCommitter;
    committer: IGHCommitSimpleAuthorAndCommitter;
    message: string;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: null;
      payload: null;
    };
  };
  url: string;
  html_url: string;
  comments_url: string;
  author: IGHCommitDetailAuthorAndCommitter;
  committer: IGHCommitDetailAuthorAndCommitter;
  parents: IGHCommitParent[];
}
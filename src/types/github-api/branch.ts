// 分支信息
export interface IGHBranchRes {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

export type IGHBranchesRes = IGHBranchRes[];
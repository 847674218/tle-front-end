// 已重构
// 搜索GitHub仓库：只有搜索框（展示内容在别的组件）
import React, { FunctionComponent, memo } from "react";
import { Input } from "antd";
import { createUseStyles } from "react-jss";

export interface IStateProps { }

export interface IDispatchProps {
  doSearch: (searchFor: string) => void;
}

export interface IOwnProps { }

export interface ISearchGitHubRepositoryProps extends IStateProps, IDispatchProps, IOwnProps { }

const useStyles = createUseStyles({
  searchGitHub: {
    width: "100%"
  },
  searchInput: {
    width: "100%"
  }
});

const SearchGitHubRepository: FunctionComponent<ISearchGitHubRepositoryProps> = memo(
  (props: ISearchGitHubRepositoryProps) => {
    const styles = useStyles();
    const { doSearch } = props;

    return (
      <Input.Search
        className={styles.searchInput}
        placeholder={"Search for repository"}
        onSearch={doSearch}
      />
    );
  }
);

export default SearchGitHubRepository;
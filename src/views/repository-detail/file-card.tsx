// 已重构
// 仓库文件展示
import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { IFileTreeNode, ShaFileContentMap } from "../../types";
import PropertyCard from "../../components/property-card/property-card";
import { FileTree } from "../../components/file-tree";

export interface IRepositoryFilesProps {
    treeData: IFileTreeNode[];
    shaFileContentMap: ShaFileContentMap;
    onFileNodeClick: (node: IFileTreeNode) => void;
}

const useStyles = createUseStyles({
    fileTreeArea: {
        margin: { left: "8px", right: "8px" }
    },
    fileContentArea: {
        margin: "8px"
    }
});

const FileCard: FunctionComponent<IRepositoryFilesProps> = memo((props: IRepositoryFilesProps) => {
    const { treeData, shaFileContentMap, onFileNodeClick } = props;
    const styles = useStyles();

    return (
        <PropertyCard titleProps={{ text: "文件" }}>
            <div className={styles.fileTreeArea}>
                <FileTree
                    showLoading={false}
                    treeData={treeData}
                    shaFileContentMap={shaFileContentMap}
                    onClick={onFileNodeClick}
                    defaultExpandAll
                />
            </div>
        </PropertyCard>
    );
});

export default FileCard;
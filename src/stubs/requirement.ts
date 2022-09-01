import { requirementDescription } from "./requirement-description";
import { IRequirement } from "./../types/index";

const fromIndex = Math.round(Math.random() * requirementDescription.length);

export const requirement: IRequirement = {
  _id: "jkladjf",
  relatedRepoName: "RELATED REPO NAME",
  relatedCommitSha: "dfb78965d9c0dc69c9dc2cdc7fd6090a8e32c601",
  descriptions: requirementDescription.slice(fromIndex, fromIndex + 10)
};
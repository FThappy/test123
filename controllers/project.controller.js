import User from "../models/User.js";
import Project from "../models/Project.js";
import { changeFile, deleteFile, uploadFile } from "../utils/file.js";
import { checkValidCard } from "../utils/utilsCard.js";



export const getProjectById = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findOne({ _id: projectId, isDelete: false });
    if (!project) {
      return res.status(404).json({ message: " Project not exist", code: 3 });
    }
    if (project.isLock) {
      return res.status(200).json({ message: "Success", code: 9 });
    }
    return res
      .status(200)
      .json({ message: "Success", code: 0, project: project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", code: 4 });
  }
};

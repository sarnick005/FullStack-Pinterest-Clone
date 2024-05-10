import mongoose, { isValidObjectId } from "mongoose";
import { Folder } from "../models/folder.Models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE  A FOLDER
const createFolder = asyncHandler(async (req, res) => {
  const { folderName, folderDescription } = req.body;
  const folder = new Folder({
    folderName,
    folderDescription,
    userId: req.user._id,
  });

  const newFolder = await folder.save();
  if (!newFolder) {
    throw new ApiErrors(400, "Folder is not created");
  }
  return res.json(
    new ApiResponse(201, newFolder, "Folder created successfully")
  );
});

// GET ALL FOLDERS

const getUserFolder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  //   console.log(userId);
  const folders = await Folder.find({ userId });
  //   console.log(folders);
  return res.json(
    new ApiResponse(200, folders, "User folders retrieved successfully")
  );
});

// GET FOLDER BY ID

const getFolderById = asyncHandler(async (req, res) => {
  const { folderId } = req.params;
  if (!isValidObjectId(folderId)) {
    return res.status(400).json(new ApiErrors(400, "Invalid folder ID"));
  }
  const folder = await Folder.findById(folderId);

  if (!folder) {
    return res.status(404).json(new ApiErrors(404, "Folder not found"));
  }

  if (folder.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json(new ApiResponse(403, null, "Unauthorized"));
  }

  return res.json(
    new ApiResponse(200, folder, "Folder retrieved successfully")
  );
});

// DELETE FOLDER

const deleteFolder = asyncHandler(async (req, res) => {
  const { folderId } = req.params;
  if (!isValidObjectId(folderId)) {
    throw new ApiErrors(400, "Invalid folder ID");
  }
  const folder = await Folder.findByIdAndDelete(folderId);
  if (!folder) {
    throw new ApiErrors(404, "Folder not found");
  } else if (folder.userId.toString() !== req.user._id.toString()) {
    throw new ApiErrors(403, "Unauthorized");
  }
  return res.json(new ApiResponse(200, null, "Folder deleted successfully"));
});

// UPDATE FOLDER

const updateFolder = asyncHandler(async (req, res) => {
  const { folderId } = req.params;
  const { folderName, folderDescription } = req.body;
  if (!isValidObjectId(folderId)) {
    throw new ApiErrors(400, "Invalid folder ID");
  }
  let folder = await Folder.findById(folderId);
  if (!folder) {
    throw new ApiErrors(404, "Folder not found");
  }
  if (folder.userId.toString() !== req.user._id.toString()) {
    throw new ApiErrors(403, "Unauthorized");
  }
  if (folderName) folder.folderName = folderName;
  if (folderDescription) folder.folderDescription = folderDescription;
  folder = await folder.save();
  return res.json(new ApiResponse(200, folder, "Folder updated successfully"));
});

export {
  createFolder,
  getUserFolder,
  getFolderById,
  deleteFolder,
  updateFolder,
};

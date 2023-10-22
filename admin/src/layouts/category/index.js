import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MDButton from "components/MDButton";
import Slide from "@mui/material/Slide";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { fetchAllCategories } from "redux/slice/CategorySlice";
import { createCategory } from "redux/slice/CategorySlice";
import { updateCategory } from "redux/slice/CategorySlice";
import { deleteCategory } from "redux/slice/CategorySlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Categories = () => {
  const dispatch = useDispatch();
  const {
    categories,
    parentCategories,
    isLoading: isCategoryLoading,
  } = useSelector((state) => state.category);

  const [isLoading, setIsLoading] = useState(isCategoryLoading);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState(false);
  const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] = useState(false);
  const [formData, setFormData] = useState({
    parent: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  useEffect(() => {
    setIsLoading(isCategoryLoading);
  }, [isCategoryLoading]);

  const handleOpenCreateCategoryDialog = () => {
    setOpenCreateCategoryDialog(true);
  };

  const handleOpenDeleteCategoryDialog = () => {
    setOpenDeleteCategoryDialog(true);
  };

  const handleCloseCreateCategoryDialog = () => {
    setOpenCreateCategoryDialog(false);
    if (editingCategory) {
      setFormData({
        parent: "",
        name: "",
        description: "",
      });
    }
    setEditingCategory(null);
  };

  const handleCloseDeleteCategoryDialog = () => {
    setOpenDeleteCategoryDialog(false);
    setEditingCategory(null);
  };

  const handleSubmit = async () => {
    const data = {
      name: formData.name,
      description: formData.description,
      key: formData.name.replaceAll(" ", "_").toUpperCase(),
      path: formData.parent
        ? `${formData.parent.toUpperCase()}/${formData.name.toUpperCase()}`
        : formData.name.toUpperCase(),
    };
    if (editingCategory) {
      await dispatch(updateCategory({ _id: editingCategory._id, data }))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          } else {
            setFormData({
              parent: "",
              name: "",
              description: "",
            });
            handleCloseCreateCategoryDialog();
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    } else {
      await dispatch(createCategory(data))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          } else {
            setFormData({
              parent: "",
              name: "",
              description: "",
            });
            handleCloseCreateCategoryDialog();
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    }
  };

  const handleEditCategoryClick = (category) => {
    let parent = "";
    if (category.path.includes("/")) {
      parent = category.path.split("/")[0].toLowerCase();
      parent = parent.charAt(0).toUpperCase() + parent.slice(1);
    }
    setFormData({
      parent,
      name: category.name,
      description: category.description,
    });
    setEditingCategory(category);
    handleOpenCreateCategoryDialog();
  };

  const handleDeleteCategoryClick = (category) => {
    handleOpenDeleteCategoryDialog();
    setDeletingCategory(category);
  };

  const handleSubmitDeleteCategory = () => {
    dispatch(deleteCategory(deletingCategory._id))
      .then((res) => {
        if (!res.payload.data?.success) {
          toast.error(res.payload.message || res.payload);
        } else {
          handleCloseDeleteCategoryDialog();
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 2000,
        });
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
        <MDButton variant="gradient" color="success" onClick={handleOpenCreateCategoryDialog}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Create Category
        </MDButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Path</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          {categories.length ? (
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description || "-"}</TableCell>
                  <TableCell>{category.key}</TableCell>
                  <TableCell>{category.path}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                          aria-label="edit"
                          color="info"
                          onClick={() => handleEditCategoryClick(category)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteCategoryClick(category)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="info">No Data !</Alert>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Dialog
        open={openCreateCategoryDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCreateCategoryDialog}
      >
        {editingCategory ? (
          <DialogTitle
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              Updating
              <Typography color={"#1A73E8"} sx={{ marginLeft: "5px", fontWeight: "bold" }}>
                {editingCategory.name}
              </Typography>
            </Box>
            <IconButton onClick={handleCloseCreateCategoryDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        ) : (
          <DialogTitle
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            Create New Category
            <IconButton onClick={handleCloseCreateCategoryDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        )}
        <DialogContent sx={{ paddingTop: "1rem!important" }}>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel id="parent-category">Parent Category</InputLabel>
              <Select
                labelId="parent-category"
                id="parent-category"
                label="Parent Category"
                value={formData.parent}
                onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                MenuProps={MenuProps}
                sx={{ height: "45px", textTransform: "capitalize" }}
              >
                <MenuItem value={""}>No parent</MenuItem>
                {parentCategories.map((category) => {
                  return (
                    <MenuItem
                      key={category._id}
                      value={category.name}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {category.path.toLowerCase().replaceAll("/", " ")}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box mb={3}>
            <TextField
              id="name"
              label="Name"
              type="text"
              sx={{ minWidth: "500px" }}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              id="description"
              label="Description"
              type="text"
              sx={{ minWidth: "500px" }}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {!editingCategory ? (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.parent}
            >
              Submit
            </MDButton>
          ) : (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.parent}
            >
              Update
            </MDButton>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteCategoryDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteCategoryDialog}
      >
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            paddingTop: "1rem!important",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          Are you sure you want to delete category
          <Typography color={"#F44335"} sx={{ margin: "0px 5px", fontWeight: "bold" }}>
            {deletingCategory?.name}
          </Typography>
          ?
        </DialogContent>
        <DialogActions>
          <MDButton variant="gradient" color="dark" onClick={handleCloseDeleteCategoryDialog}>
            Cancel
          </MDButton>
          <MDButton variant="gradient" color="success" onClick={handleSubmitDeleteCategory}>
            Yes
          </MDButton>
        </DialogActions>
      </Dialog>
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </DashboardLayout>
  );
};

export default Categories;

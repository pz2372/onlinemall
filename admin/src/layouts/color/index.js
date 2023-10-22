import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
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
import { fetchAllColors } from "redux/slice/ColorSlice";
import { createColor } from "redux/slice/ColorSlice";
import { updateColor } from "redux/slice/ColorSlice";
import { deleteColor } from "redux/slice/ColorSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Colors = () => {
  const dispatch = useDispatch();
  const { colors, isLoading: isColorLoading } = useSelector((state) => state.color);

  const [isLoading, setIsLoading] = useState(isColorLoading);
  const [editingColor, setEditingColor] = useState(null);
  const [deletingColor, setDeletingColor] = useState(null);
  const [openCreateColorDialog, setOpenCreateColorDialog] = useState(false);
  const [openDeleteColorDialog, setOpenDeleteColorDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    hex: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    hex: "",
  });

  useEffect(() => {
    dispatch(fetchAllColors());
  }, []);

  useEffect(() => {
    setIsLoading(isColorLoading);
  }, [isColorLoading]);

  const handleOpenCreateColorDialog = () => {
    setOpenCreateColorDialog(true);
  };

  const handleOpenDeleteColorDialog = () => {
    setOpenDeleteColorDialog(true);
  };

  const handleCloseCreateColorDialog = () => {
    setOpenCreateColorDialog(false);
    if (editingColor) {
      setFormData({
        name: "",
        hex: "",
      });
    }
    setEditingColor(null);
  };

  const handleCloseDeleteColorDialog = () => {
    setOpenDeleteColorDialog(false);
    setEditingColor(null);
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    if (editingColor) {
      await dispatch(updateColor({ _id: editingColor._id, data: formData }))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          } else {
            setFormData({
              name: "",
              hex: "",
            });
            handleCloseCreateColorDialog();
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    } else {
      await dispatch(createColor(formData))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          } else {
            setFormData({
              name: "",
              hex: "",
            });
            handleCloseCreateColorDialog();
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    }
  };

  const handleEditColorClick = (color) => {
    setFormData({
      name: color.name,
      hex: color.hex,
    });
    setEditingColor(color);
    handleOpenCreateColorDialog();
  };

  const handleDeleteColorClick = (color) => {
    handleOpenDeleteColorDialog();
    setDeletingColor(color);
  };

  const handleSubmitDeleteColor = () => {
    dispatch(deleteColor(deletingColor._id))
      .then((res) => {
        if (!res.payload.data?.success) {
          toast.error(res.payload.message || res.payload);
        } else {
          handleCloseDeleteColorDialog();
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 2000,
        });
      });
  };

  const isFormValid = () => {
    let isValid = true;
    let cloneErrors = { ...errors };
    if (formData.name.length < 3) {
      isValid = false;
      cloneErrors.name = "Name must be at least 3 characters.";
    } else {
      cloneErrors.name = "";
    }
    setErrors(cloneErrors);
    return isValid;
  };

  useEffect(() => {
    Object.values(errors).forEach((err) => {
      if (err) {
        toast.error(err);
      }
    });
  }, [errors]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
        <MDButton variant="gradient" color="success" onClick={handleOpenCreateColorDialog}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Create Color
        </MDButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Hex</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          {colors.length ? (
            <TableBody>
              {colors.map((color) => (
                <TableRow
                  key={color._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          marginRight: "10px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: color.hex,
                          boxShadow: "0 3px 10px rgb(0 0 0 / 0.6)",
                        }}
                      ></Box>
                      <Box>{color.name}</Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{color.hex}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                          aria-label="edit"
                          color="info"
                          onClick={() => handleEditColorClick(color)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteColorClick(color)}
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
        open={openCreateColorDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCreateColorDialog}
      >
        {editingColor ? (
          <DialogTitle
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              Updating
              <Typography color={"#1A73E8"} sx={{ marginLeft: "5px", fontWeight: "bold" }}>
                {editingColor.name}
              </Typography>
            </Box>
            <IconButton onClick={handleCloseCreateColorDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        ) : (
          <DialogTitle
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            Create New Color
            <IconButton onClick={handleCloseCreateColorDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        )}
        <DialogContent sx={{ paddingTop: "1rem!important" }}>
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
              id="colorpicker"
              label="Color Picker"
              type="color"
              sx={{ minWidth: "500px" }}
              value={formData.hex}
              onChange={(e) => setFormData({ ...formData, hex: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {!editingColor ? (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.hex}
            >
              Submit
            </MDButton>
          ) : (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.hex}
            >
              Update
            </MDButton>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteColorDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteColorDialog}
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
          Are you sure you want to delete color
          <Typography color={"#F44335"} sx={{ margin: "0px 5px", fontWeight: "bold" }}>
            {deletingColor?.name}
          </Typography>
          ?
        </DialogContent>
        <DialogActions>
          <MDButton variant="gradient" color="dark" onClick={handleCloseDeleteColorDialog}>
            Cancel
          </MDButton>
          <MDButton variant="gradient" color="success" onClick={handleSubmitDeleteColor}>
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

export default Colors;

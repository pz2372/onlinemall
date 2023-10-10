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
import { fetchAllSizes } from "redux/slice/SizeSlice";
import { updateSize } from "redux/slice/SizeSlice";
import { createSize } from "redux/slice/SizeSlice";
import { deleteSize } from "redux/slice/SizeSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Sizes = () => {
  const dispatch = useDispatch();
  const { sizes, isLoading: isSizeLoading } = useSelector((state) => state.size);

  const [isLoading, setIsLoading] = useState(isSizeLoading);
  const [editingSize, setEditingSize] = useState(null);
  const [deletingSize, setDeletingSize] = useState(null);
  const [openCreateSizeDialog, setOpenCreateSizeDialog] = useState(false);
  const [openDeleteSizeDialog, setOpenDeleteSizeDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    dispatch(fetchAllSizes());
  }, []);

  useEffect(() => {
    setIsLoading(isSizeLoading);
  }, [isSizeLoading]);

  const handleOpenCreateSizeDialog = () => {
    setOpenCreateSizeDialog(true);
  };

  const handleOpenDeleteSizeDialog = () => {
    setOpenDeleteSizeDialog(true);
  };

  const handleCloseCreateSizeDialog = () => {
    setOpenCreateSizeDialog(false);
    if (editingSize) {
      setFormData({
        name: "",
      });
    }
    setEditingSize(null);
  };

  const handleCloseDeleteSizeDialog = () => {
    setOpenDeleteSizeDialog(false);
    setEditingSize(null);
  };

  const handleSubmit = async () => {
    if (editingSize) {
      await dispatch(updateSize({ _id: editingSize._id, data: formData }))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          } else {
            setFormData({
              name: "",
            });
            handleCloseCreateSizeDialog();
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    } else {
      await dispatch(createSize(formData))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          } else {
            setFormData({
              name: "",
            });
            handleCloseCreateSizeDialog();
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    }
  };

  const handleEditSizeClick = (size) => {
    setFormData({
      name: size.name,
    });
    setEditingSize(size);
    handleOpenCreateSizeDialog();
  };

  const handleDeleteSizeClick = (size) => {
    handleOpenDeleteSizeDialog();
    setDeletingSize(size);
  };

  const handleSubmitDeleteSize = () => {
    dispatch(deleteSize(deletingSize._id))
      .then((res) => {
        if (!res.payload.data?.success) {
          toast.error(res.payload.message || res.payload);
        } else {
          handleCloseDeleteSizeDialog();
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
        <MDButton variant="gradient" color="success" onClick={handleOpenCreateSizeDialog}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Create Size
        </MDButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          {sizes.length ? (
            <TableBody>
              {sizes.map((size) => (
                <TableRow key={size._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{size.name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                          aria-label="edit"
                          color="info"
                          onClick={() => handleEditSizeClick(size)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteSizeClick(size)}
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
        open={openCreateSizeDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCreateSizeDialog}
      >
        {editingSize ? (
          <DialogTitle
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              Updating
              <Typography color={"#1A73E8"} sx={{ marginLeft: "5px", fontWeight: "bold" }}>
                {editingSize.name}
              </Typography>
            </Box>
            <IconButton onClick={handleCloseCreateSizeDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        ) : (
          <DialogTitle
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            Create New Size
            <IconButton onClick={handleCloseCreateSizeDialog}>
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
        </DialogContent>
        <DialogActions>
          {!editingSize ? (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formData.name}
            >
              Submit
            </MDButton>
          ) : (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formData.name}
            >
              Update
            </MDButton>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteSizeDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteSizeDialog}
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
          Are you sure you want to delete size
          <Typography color={"#F44335"} sx={{ margin: "0px 5px", fontWeight: "bold" }}>
            {deletingSize?.name}
          </Typography>
          ?
        </DialogContent>
        <DialogActions>
          <MDButton variant="gradient" color="dark" onClick={handleCloseDeleteSizeDialog}>
            Cancel
          </MDButton>
          <MDButton variant="gradient" color="success" onClick={handleSubmitDeleteSize}>
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

export default Sizes;

import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
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
import { fetchAllBrands } from "redux/slice/BrandSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MDButton from "components/MDButton";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { fetchAllAdmins } from "redux/slice/AdminSlice";
import { validateEmailAddress } from "utils/validateEmail";
import { validatePassword } from "utils/validatePassword";
import { createAdmin } from "redux/slice/AdminSlice";
import { updateAdmin } from "redux/slice/AdminSlice";
import { deleteAdmin } from "redux/slice/AdminSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

const Admins = () => {
  const dispatch = useDispatch();

  const { brands } = useSelector((state) => state.brand);
  const { admins, isLoading: isAdminLoading } = useSelector((state) => state.admin);

  const [isLoading, setIsLoading] = useState(isAdminLoading);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [deletingAdmin, setDeletingAdmin] = useState(null);
  const [openCreateAdminDialog, setOpenCreateAdminDialog] = useState(false);
  const [openDeleteAdminDialog, setOpenDeleteAdminDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "BRANDOWNER",
    brand: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    brand: "",
  });

  useEffect(() => {
    dispatch(fetchAllAdmins());
    dispatch(fetchAllBrands());
  }, []);

  useEffect(() => {
    setIsLoading(isAdminLoading);
  }, [isAdminLoading]);

  const handleOpenCreateAdminDialog = () => {
    setOpenCreateAdminDialog(true);
  };

  const handleOpenDeleteAdminDialog = () => {
    setOpenDeleteAdminDialog(true);
  };

  const handleCloseCreateAdminDialog = () => {
    setOpenCreateAdminDialog(false);
    if (editingAdmin) {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "BRANDOWNER",
        brand: "",
      });
    }
    setEditingAdmin(null);
  };

  const handleCloseDeleteAdminDialog = () => {
    setOpenDeleteAdminDialog(false);
    setEditingAdmin(null);
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    if (editingAdmin) {
      await dispatch(updateAdmin({ _id: editingAdmin._id, data: formData }))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    } else {
      await dispatch(createAdmin(formData))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    }
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "BRANDOWNER",
      brand: "",
    });
    handleCloseCreateAdminDialog();
  };

  const handleEditAdminClick = (admin) => {
    setFormData({
      name: admin.name,
      email: admin.email,
      role: "BRANDOWNER",
      brand: admin.brand._id,
    });
    setEditingAdmin(admin);
    handleOpenCreateAdminDialog();
  };

  const handleDeleteAdminClick = (admin) => {
    handleOpenDeleteAdminDialog();
    setDeletingAdmin(admin);
  };

  const handleSubmitDeleteAdmin = () => {
    dispatch(deleteAdmin(deletingAdmin._id))
      .then((res) => {
        if (!res.payload.data?.success) {
          toast.error(res.payload.message || res.payload);
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 2000,
        });
      });
    handleCloseDeleteAdminDialog();
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
    if (!validateEmailAddress(formData.email)) {
      isValid = false;
      cloneErrors.email = "Email address is not valid.";
    } else {
      cloneErrors.email = "";
    }
    if (!editingAdmin) {
      if (!validatePassword(formData.password)) {
        isValid = false;
        cloneErrors.password =
          "Password must be minimum 8 characters, at least one letter and one number";
      } else {
        cloneErrors.password = "";
      }
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
        <MDButton variant="gradient" color="success" onClick={handleOpenCreateAdminDialog}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Create admin
        </MDButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email address</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {admins.length ? (
            <TableBody>
              {admins.map((admin) => (
                <TableRow
                  key={admin._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>{admin.brand?.name}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton
                        aria-label="edit"
                        color="info"
                        onClick={() => handleEditAdminClick(admin)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDeleteAdminClick(admin)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
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
        open={openCreateAdminDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCreateAdminDialog}
      >
        {editingAdmin ? (
          <DialogTitle
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              Updating
              <Typography color={"#1A73E8"} sx={{ marginLeft: "5px", fontWeight: "bold" }}>
                {editingAdmin.name}
              </Typography>
            </Box>
            <IconButton onClick={handleCloseCreateAdminDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        ) : (
          <DialogTitle
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            Create New Admin
            <IconButton onClick={handleCloseCreateAdminDialog}>
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
          <Box mb={3}>
            <TextField
              id="email"
              label="Email address"
              type="email"
              sx={{ minWidth: "500px" }}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
            />
          </Box>
          {!editingAdmin ? (
            <Box mb={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Box>
          ) : null}
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel id="admin-brand">Brand</InputLabel>
              <Select
                labelId="admin-brand"
                id="admin-brand"
                value={formData.brand}
                label="Brand"
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                MenuProps={MenuProps}
                sx={{ height: "45px" }}
              >
                {brands.map((brand) => {
                  return (
                    <MenuItem key={brand._id} value={brand._id}>
                      {brand.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          {!editingAdmin ? (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.password || !formData.brand}
            >
              Submit
            </MDButton>
          ) : (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.brand}
            >
              Update
            </MDButton>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteAdminDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteAdminDialog}
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
          Are you sure you want to delete admin
          <Typography color={"#F44335"} sx={{ margin: "0px 5px", fontWeight: "bold" }}>
            {deletingAdmin?.name}
          </Typography>
          ?
        </DialogContent>
        <DialogActions>
          <MDButton variant="gradient" color="dark" onClick={handleCloseDeleteAdminDialog}>
            Cancel
          </MDButton>
          <MDButton variant="gradient" color="success" onClick={handleSubmitDeleteAdmin}>
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

export default Admins;

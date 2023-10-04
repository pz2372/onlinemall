import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Icon,
  IconButton,
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
  const { brands } = useSelector((state) => state.brand);
  const { admins } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [editingAdmin, setEditingAdmin] = useState(null);
  const [deletingAdmin, setDeletingAdmin] = useState(null);
  const [openCreateAdminDialog, setOpenCreateAdminDialog] = useState(false);
  const [openDeleteAdminDialog, setOpenDeleteAdminDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "BRANDOWNER",
    brand: "",
  });

  useEffect(() => {
    dispatch(fetchAllAdmins());
    dispatch(fetchAllBrands());
  }, []);

  const handleOpenCreateAdminDialog = () => {
    setOpenCreateAdminDialog(true);
  };

  const handleOpenDeleteAdminDialog = () => {
    setOpenDeleteAdminDialog(true);
  };

  const handleCloseCreateAdminDialog = () => {
    if (editingAdmin) {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "BRANDOWNER",
        brand: "",
      });
    }
    setOpenCreateAdminDialog(false);
    setEditingAdmin(null);
  };

  const handleCloseDeleteAdminDialog = () => {
    setOpenDeleteAdminDialog(false);
  };

  const handleSubmit = async () => {
    console.log("formData", formData);
    // if (editingAdmin) {
    //   await dispatch(updateAdmin({ _id: editingAdmin._id, data: formData }));
    // } else {
    //   await dispatch(createAdmin(formData));
    // }
    // setFormData({
    //   name: "",
    //   email: "",
    //   password: "",
    //   role: "BRANDOWNER",
    //   brand: "",
    // });
    // setOpenCreateAdminDialog(false);
  };

  const handleEditAdminClick = (admin) => {
    setFormData({
      name: admin.name,
      email: admin.email,
      password: admin.password,
      role: "BRANDOWNER",
      brand: admin.brand,
    });
    setEditingAdmin(admin);
    handleOpenCreateAdminDialog();
  };

  const handleDeleteAdminClick = (admin) => {
    handleOpenDeleteAdminDialog();
    setDeletingAdmin(admin);
  };

  const handleSubmitDeleteAdmin = () => {
    // dispatch(deleteBrand(deletingBrand._id));
    handleCloseDeleteAdminDialog();
  };

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
            {`Updating ${editingAdmin.name}`}
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
          <Box mb={3}>
            <TextField
              id="password"
              label="Password"
              type="password"
              sx={{ minWidth: "500px" }}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              fullWidth
            />
          </Box>
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
        open={openDeleteAdminDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteAdminDialog}
      >
        <DialogContent sx={{ paddingTop: "1rem!important", textAlign: "center", fontSize: "20px" }}>
          Are you sure you want to delete admin
          <b style={{ margin: "0 5px" }}>{deletingAdmin?.name}</b>?
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
    </DashboardLayout>
  );
};

export default Admins;

import {
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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBrands } from "redux/slice/BrandSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MDButton from "components/MDButton";
import Slide from "@mui/material/Slide";
import { fetchAllCategories } from "redux/slice/CategorySlice";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { createBrand } from "redux/slice/BrandSlice";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Brands = () => {
  const { brands } = useSelector((state) => state.brand);
  const categoriesState = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const logoRef = useRef(null);

  const [openCreateBrandDialog, setOpenCreateBrandDialog] = useState(false);
  const [selectedMenCategories, setSelectedMenCategories] = useState([]);
  const [selectedWomenCategories, setSelectedWomenCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    categories: [],
    logo: null,
  });

  useEffect(() => {
    dispatch(fetchAllBrands());
    dispatch(fetchAllCategories());
  }, []);

  const handleOpenCreateBrandDialog = () => {
    setOpenCreateBrandDialog(true);
  };

  const handleCloseCreateBrandDialog = () => {
    setOpenCreateBrandDialog(false);
  };

  const handleMenCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedMenCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleWomenCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedWomenCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleFileInput = (e) => {
    if (e.target.files[0]?.type === "image/png") {
      setFormData({ ...formData, logo: e.target.files[0] });
    } else {
      toast.error("Please upload PNG files only.");
    }
  };

  const handleSubmit = () => {
    let fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("logo", formData.logo);
    fd.append("website", formData.website);
    formData.categories.forEach((cat) => fd.append("categories[]", cat));

    dispatch(createBrand(fd));
    setFormData({
      name: "",
      description: "",
      website: "",
      categories: [],
      logo: null,
    });
    setOpenCreateBrandDialog(false);
  };

  useEffect(() => {
    const arr = [];
    selectedMenCategories.forEach((cat) => {
      arr.push(cat);
    });
    selectedWomenCategories.forEach((cat) => {
      arr.push(cat);
    });
    setFormData({ ...formData, categories: arr });
  }, [selectedMenCategories, selectedWomenCategories]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
        <MDButton variant="gradient" color="success" onClick={handleOpenCreateBrandDialog}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Create brand
        </MDButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>
                  <Avatar alt={brand.name} src={process.env.REACT_APP_S3_BUCKET_URL + brand.logo} />
                </TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand.description}</TableCell>
                <TableCell>
                  <a
                    style={{ color: "#1A73E8" }}
                    href={brand.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {brand.website}
                  </a>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton aria-label="edit" color="info">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openCreateBrandDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCreateBrandDialog}
      >
        <DialogTitle>Create New Brand</DialogTitle>
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
              id="description"
              label="Description"
              type="text"
              sx={{ minWidth: "500px" }}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
            />
          </Box>
          <Box mb={3}>
            <TextField
              id="website"
              label="Website"
              type="text"
              sx={{ minWidth: "500px" }}
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              fullWidth
            />
          </Box>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel id="men-categories">Men categories</InputLabel>
              <Select
                labelId="men-categories"
                id="men-categories"
                multiple
                value={selectedMenCategories}
                onChange={handleMenCategoryChange}
                input={<OutlinedInput label="Men categories" />}
                renderValue={(selected) => {
                  const arr = [];
                  selected.forEach((s) => {
                    const cat = categoriesState.menCategories.find((i) => i._id === s);
                    arr.push(cat.name);
                  });
                  return arr.join(", ");
                }}
                MenuProps={MenuProps}
                sx={{ height: "45px" }}
              >
                {categoriesState.menCategories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    <Checkbox checked={selectedMenCategories.indexOf(category._id) > -1} />
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel id="women-categories">Women categories</InputLabel>
              <Select
                labelId="women-categories"
                id="women-categories"
                multiple
                value={selectedWomenCategories}
                onChange={handleWomenCategoryChange}
                input={<OutlinedInput label="Women categories" />}
                renderValue={(selected) => {
                  const arr = [];
                  selected.forEach((s) => {
                    const cat = categoriesState.womenCategories.find((i) => i._id === s);
                    arr.push(cat.name);
                  });
                  return arr.join(", ");
                }}
                MenuProps={MenuProps}
                sx={{ height: "45px" }}
              >
                {categoriesState.womenCategories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    <Checkbox checked={selectedWomenCategories.indexOf(category._id) > -1} />
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <MDButton variant="gradient" color="dark" component="label">
              <Icon sx={{ fontWeight: "bold" }}>cloud_upload</Icon>
              &nbsp;&nbsp;Upload logo
              <VisuallyHiddenInput type="file" ref={logoRef} onChange={handleFileInput} />
            </MDButton>
          </Box>
          {formData.logo ? (
            <Box
              sx={{
                position: "relative",
                marginTop: "10px",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Avatar
                alt="image-preview"
                src={URL.createObjectURL(formData.logo)}
                sx={{ width: 100, height: 100 }}
              />
              <MDButton
                variant="gradient"
                color="error"
                onClick={() => {
                  logoRef.current.value = "";
                  setFormData({ ...formData, logo: null });
                }}
                sx={{ marginLeft: "20px" }}
              >
                Remove logo
              </MDButton>
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions>
          <MDButton
            variant="gradient"
            color="success"
            onClick={handleSubmit}
            disabled={!formData.name || !formData.categories.length}
          >
            Submit
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Brands;

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
  TablePagination,
  TableRow,
  TextField,
  Typography,
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
import { updateBrand } from "redux/slice/BrandSlice";
import { deleteBrand } from "redux/slice/BrandSlice";
import CloseIcon from "@mui/icons-material/Close";
import { fetchAllProducts } from "redux/slice/ProductSlice";
import ReactStars from "react-rating-stars-component";
import { fetchAllColors } from "redux/slice/ColorSlice";
import { fetchAllSizes } from "redux/slice/SizeSlice";

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

const Products = () => {
  const {
    products,
    isLoading: isProductLoading,
    currentPage,
    totalCount,
    totalPages,
  } = useSelector((state) => state.product);
  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const { colors } = useSelector((state) => state.color);
  const { sizes } = useSelector((state) => state.size);

  const dispatch = useDispatch();
  const logoRef = useRef(null);

  const [page, setPage] = React.useState(currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = useState(isProductLoading);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingBrand, setDeletingBrand] = useState(null);
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [openDeleteProductDialog, setOpenDeleteProductDialog] = useState(false);
  const [selectedMenCategories, setSelectedMenCategories] = useState([]);
  const [selectedWomenCategories, setSelectedWomenCategories] = useState([]);
  const [formData, setFormData] = useState({
    SKU: "",
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    images: [],
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const query = {
      page: page + 1,
      limit: rowsPerPage,
    };
    dispatch(fetchAllProducts(query));
  }, [page, rowsPerPage]);

  useEffect(() => {
    dispatch(fetchAllBrands());
    dispatch(fetchAllCategories());
    dispatch(fetchAllColors());
    dispatch(fetchAllSizes());
  }, []);

  useEffect(() => {
    setIsLoading(isProductLoading);
  }, [isProductLoading]);

  const handleOpenCreateProductDialog = () => {
    setOpenCreateProductDialog(true);
  };

  const handleOpenDeleteProductDialog = () => {
    setOpenDeleteProductDialog(true);
  };

  const handleCloseCreateProductDialog = () => {
    if (editingProduct) {
      setFormData({
        name: "",
        description: "",
        website: "",
        categories: [],
        logo: null,
      });
      setSelectedMenCategories([]);
      setSelectedWomenCategories([]);
    }
    setOpenCreateProductDialog(false);
    setEditingProduct(null);
  };
  const handleCloseDeleteBrandDialog = () => {
    setOpenDeleteProductDialog(false);
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

  const handleSubmit = async () => {
    let fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("logo", formData.logo);
    fd.append("website", formData.website);
    formData.categories.forEach((cat) => fd.append("categories[]", cat));

    if (editingProduct) {
      await dispatch(updateBrand({ _id: editingProduct._id, data: fd }))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          } else {
            setFormData({
              name: "",
              description: "",
              website: "",
              categories: [],
              logo: null,
            });
            setSelectedMenCategories([]);
            setSelectedWomenCategories([]);
            handleCloseCreateProductDialog();
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    } else {
      await dispatch(createBrand(fd))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          } else {
            setFormData({
              name: "",
              description: "",
              website: "",
              categories: [],
              logo: null,
            });
            setSelectedMenCategories([]);
            setSelectedWomenCategories([]);
            handleCloseCreateProductDialog();
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    }
  };

  const handleEditProductClick = (brand) => {
    const menCat = [];
    const womenCat = [];
    brand.categories.forEach((category) => {
      if (category.path.startsWith("MEN")) {
        menCat.push(category._id);
      } else {
        womenCat.push(category._id);
      }
    });
    setSelectedMenCategories(menCat);
    setSelectedWomenCategories(womenCat);
    setFormData({
      name: brand.name,
      description: brand.description,
      website: brand.website,
      categories: [],
      logo: brand?.logo || null,
    });
    setEditingProduct(brand);
    handleOpenCreateProductDialog();
  };

  const handleDeleteProductClick = (brand) => {
    handleOpenDeleteProductDialog();
    setDeletingBrand(brand);
  };

  const handleSubmitDeleteBrand = () => {
    dispatch(deleteBrand(deletingBrand._id))
      .then((res) => {
        if (!res.payload.data?.success) {
          toast.error(res.payload.message || res.payload);
        } else {
          handleCloseDeleteBrandDialog();
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 2000,
        });
      });
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
        <MDButton variant="gradient" color="success" onClick={handleOpenCreateProductDialog}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Create product
        </MDButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Colors</TableCell>
              <TableCell>Sizes</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {products.length ? (
            <TableBody>
              {products.map((product) => {
                const sum = product.ratings.reduce((accumulator, object) => {
                  return accumulator + object.rate;
                }, 0);
                let totalRating = sum > 0 ? sum / product.ratings.length : 0;
                return (
                  <TableRow
                    key={product._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ maxWidth: "150px" }}>
                      <Avatar
                        alt={product.name}
                        src={process.env.REACT_APP_S3_BUCKET_URL + product.images[0]}
                        variant="square"
                      />
                    </TableCell>
                    <TableCell sx={{ maxWidth: "150px" }}>
                      <Typography fontSize={"16px"} noWrap title={product.SKU}>
                        {product.SKU}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: "150px" }}>
                      <Typography fontSize={"16px"} noWrap title={product.name}>
                        {product.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: "150px" }}>
                      <Typography fontSize={"16px"} noWrap title={product.brand?.name}>
                        {product.brand?.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: "150px" }}>
                      <Typography fontSize={"16px"} noWrap title={product.category?.name}>
                        {product.category?.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: "150px" }}>
                      <Typography fontSize={"16px"} noWrap title={`$${product.price}`}>
                        ${product.price}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: "150px" }}>
                      <Typography
                        fontSize={"16px"}
                        noWrap
                        title={product.colors.map((color) => color.name).join(", ")}
                      >
                        {product.colors.map((color) => color.name).join(", ")}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: "150px" }}>
                      <Typography
                        fontSize={"16px"}
                        noWrap
                        title={product.sizes.map((size) => size.name).join(", ")}
                      >
                        {product.sizes.map((size) => size.name).join(", ")}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: "150px" }}>
                      <Box title={`${totalRating} OUT OF 5`} sx={{ width: "90px" }}>
                        <ReactStars
                          count={5}
                          size={16}
                          activeColor="#FF6D2E"
                          isHalf
                          value={totalRating}
                          edit={false}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                          aria-label="edit"
                          color="info"
                          onClick={() => handleEditProductClick(product)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteProductClick(product)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={10}>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="info">No Data !</Alert>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={openCreateProductDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCreateProductDialog}
      >
        {editingProduct ? (
          <DialogTitle
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              Updating
              <Typography color={"#1A73E8"} sx={{ marginLeft: "5px", fontWeight: "bold" }}>
                {editingProduct.name}
              </Typography>
            </Box>
            <IconButton onClick={handleCloseCreateProductDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        ) : (
          <DialogTitle
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            Create New Product
            <IconButton onClick={handleCloseCreateProductDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        )}
        <DialogContent sx={{ paddingTop: "1rem!important" }}>
          <Box mb={3}>
            <TextField
              id="sku"
              label="SKU"
              type="text"
              sx={{ minWidth: "500px" }}
              value={formData.SKU}
              onChange={(e) => setFormData({ ...formData, SKU: e.target.value })}
              fullWidth
            />
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
              id="price"
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              sx={{ minWidth: "500px" }}
              fullWidth
            />
          </Box>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel id="brand">Brand</InputLabel>
              <Select
                labelId="brand"
                id="brand"
                label="Brand"
                value={formData.brand}
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
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                MenuProps={MenuProps}
                sx={{ height: "45px", textTransform: "capitalize" }}
              >
                {categories.map((category) => {
                  return (
                    <MenuItem
                      key={category._id}
                      value={category._id}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {category.path.toLowerCase().replaceAll("/", " ")}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          {/* <Box mb={3}>
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
          </Box> */}
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
              {typeof formData.logo === "string" ? (
                <Avatar
                  alt="image-preview"
                  src={process.env.REACT_APP_S3_BUCKET_URL + formData.logo}
                  sx={{ width: 100, height: 100 }}
                />
              ) : (
                <Avatar
                  alt="image-preview"
                  src={URL.createObjectURL(formData.logo)}
                  sx={{ width: 100, height: 100 }}
                />
              )}
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
          {!editingProduct ? (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.categories.length}
            >
              Submit
            </MDButton>
          ) : (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.categories.length}
            >
              Update
            </MDButton>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteProductDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteBrandDialog}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "1rem!important",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          Are you sure you want to delete brand
          <Typography color={"#F44335"} sx={{ margin: "0px 5px", fontWeight: "bold" }}>
            {deletingBrand?.name}
          </Typography>
          ?
        </DialogContent>
        <DialogActions>
          <MDButton variant="gradient" color="dark" onClick={handleCloseDeleteBrandDialog}>
            Cancel
          </MDButton>
          <MDButton variant="gradient" color="success" onClick={handleSubmitDeleteBrand}>
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

export default Products;

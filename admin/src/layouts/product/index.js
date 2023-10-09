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
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { createProduct } from "redux/slice/ProductSlice";
import { updateProduct } from "redux/slice/ProductSlice";

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
  const imagesRef = useRef(null);

  const [page, setPage] = React.useState(currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = useState(isProductLoading);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [openDeleteProductDialog, setOpenDeleteProductDialog] = useState(false);
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
  const [formIsValid, setFormIsValid] = useState(false);

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
      resetForm();
    }
    setOpenCreateProductDialog(false);
    setEditingProduct(null);
  };
  const handleCloseDeleteBrandDialog = () => {
    setOpenDeleteProductDialog(false);
  };

  const handleColorChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({ ...formData, colors: typeof value === "string" ? value.split(",") : value });
  };

  const handleSizeChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({ ...formData, sizes: typeof value === "string" ? value.split(",") : value });
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    const fdImages = [...formData.images];
    const isValid = true;
    files.forEach((image) => {
      if (image.type === "image/png" || image.type === "image/jpeg") {
        fdImages.push(image);
        setFormData({ ...formData, images: fdImages });
      } else {
        isValid = false;
      }
    });
    if (!isValid) {
      toast.error("Please upload PNG or JPEG files only.");
    }
    imagesRef.current.value = "";
  };

  const handleRemoveFile = (imageIndex) => {
    let cloneImages = [...formData.images];
    cloneImages.splice(imageIndex, 1);
    setFormData({ ...formData, images: cloneImages });
  };

  const handleSubmit = async () => {
    let fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("SKU", formData.SKU);
    fd.append("price", formData.price);
    fd.append("brand", formData.brand);
    fd.append("category", formData.category);
    formData.sizes.forEach((size) => fd.append("sizes", size));
    formData.colors.forEach((color) => fd.append("colors", color));
    formData.images.forEach((image) => fd.append("images", image));

    if (editingProduct) {
      await dispatch(updateProduct({ _id: editingProduct._id, data: fd }))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          } else {
            resetForm();
            handleCloseCreateProductDialog();
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    } else {
      await dispatch(createProduct(fd))
        .then((res) => {
          if (!res.payload.data?.success) {
            toast.error(res.payload.message || res.payload);
          } else {
            resetForm();
            handleCloseCreateProductDialog();
            setPage(0);
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    }
  };

  const handleEditProductClick = (product) => {
    setFormData({
      SKU: product.SKU,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category._id,
      brand: product.brand._id,
      sizes: product.sizes.map((size) => size._id),
      colors: product.colors.map((color) => color._id),
      images: product.images,
    });
    setEditingProduct(product);
    handleOpenCreateProductDialog();
  };

  const resetForm = () => {
    setFormData({
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
  };

  const handleDeleteProductClick = (product) => {
    setDeletingProduct(product);
    handleOpenDeleteProductDialog();
  };

  const handleSubmitDeleteProduct = () => {
    // dispatch(deleteBrand(deletingBraProduct))
    //   .then((res) => {
    //     if (!res.payload.data?.success) {
    //       toast.error(res.payload.message || res.payload);
    //     } else {
    //       handleCloseDeleteBrandDialog();
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err.message, {
    //       autoClose: 2000,
    //     });
    //   });
  };

  useEffect(() => {
    if (
      !formData.SKU ||
      !formData.brand ||
      !formData.category ||
      !formData.colors.length ||
      !formData.images.length ||
      !formData.name ||
      !formData.price ||
      !formData.sizes.length
    ) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [formData]);

  // useEffect(() => {
  //   const arr = [];
  //   selectedColors.forEach((cat) => {
  //     arr.push(cat);
  //   });
  //   selectedSizes.forEach((cat) => {
  //     arr.push(cat);
  //   });
  //   setFormData({ ...formData, categories: arr });
  // }, [selectedColors, selectedSizes]);

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
              <TableCell align="center">Actions</TableCell>
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
                        src={`${process.env.REACT_APP_S3_BUCKET_URL}/${product.images[0]}`}
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
                          aria-label="view"
                          color="primary"
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_USER_PORTAL_URL}/product/${product._id}`
                            )
                          }
                        >
                          <VisibilityIcon />
                        </IconButton>
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
        maxWidth="md"
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
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                id="sku"
                label="SKU"
                type="text"
                sx={{ minWidth: "300px" }}
                value={formData.SKU}
                onChange={(e) => setFormData({ ...formData, SKU: e.target.value })}
                fullWidth
              />
              <TextField
                id="name"
                label="Name"
                type="text"
                sx={{ minWidth: "300px" }}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
              />
            </Stack>
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
              multiline
              rows={4}
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
            <Stack direction="row" alignItems="center" spacing={1}>
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
            </Stack>
          </Box>
          <Box mb={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <FormControl fullWidth>
                <InputLabel id="colors">Colors</InputLabel>
                <Select
                  labelId="colors"
                  id="colors"
                  multiple
                  value={formData.colors}
                  onChange={handleColorChange}
                  input={<OutlinedInput label="Colors" />}
                  renderValue={(selected) => {
                    const arr = [];
                    selected.forEach((s) => {
                      const color = colors.find((i) => i._id === s);
                      arr.push(color.name);
                    });
                    return arr.join(", ");
                  }}
                  MenuProps={MenuProps}
                  sx={{ height: "45px" }}
                >
                  {colors.map((color) => (
                    <MenuItem key={color._id} value={color._id}>
                      <Checkbox checked={formData.colors.indexOf(color._id) > -1} />
                      <ListItemText primary={color.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="sizes">Sizes</InputLabel>
                <Select
                  labelId="sizes"
                  id="sizes"
                  multiple
                  value={formData.sizes}
                  onChange={handleSizeChange}
                  input={<OutlinedInput label="Sizes" />}
                  renderValue={(selected) => {
                    const arr = [];
                    selected.forEach((s) => {
                      const cat = sizes.find((i) => i._id === s);
                      arr.push(cat.name);
                    });
                    return arr.join(", ");
                  }}
                  MenuProps={MenuProps}
                  sx={{ height: "45px" }}
                >
                  {sizes.map((size) => (
                    <MenuItem key={size._id} value={size._id}>
                      <Checkbox checked={formData.sizes.indexOf(size._id) > -1} />
                      <ListItemText primary={size.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>
          <Box>
            <MDButton variant="gradient" color="dark" component="label">
              <Icon sx={{ fontWeight: "bold" }}>cloud_upload</Icon>
              &nbsp;&nbsp;Upload Images
              <VisuallyHiddenInput
                type="file"
                multiple
                ref={imagesRef}
                onChange={handleFileInput}
              />
            </MDButton>
          </Box>
          {formData.images.length ? (
            <Box
              sx={{
                position: "relative",
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gridGap: "10px",
              }}
            >
              {formData.images.map((image, index) => {
                return (
                  <Box
                    key={index}
                    sx={{ position: "relative", display: "flex", justifyContent: "center" }}
                  >
                    {typeof image === "string" ? (
                      <Avatar
                        alt="image-preview"
                        src={`${process.env.REACT_APP_S3_BUCKET_URL}/${image}`}
                        sx={{ width: 100, height: 100 }}
                      />
                    ) : (
                      <Avatar
                        alt="image-preview"
                        src={URL.createObjectURL(image)}
                        sx={{ width: 100, height: 100 }}
                      />
                    )}
                    <IconButton
                      aria-label="remove"
                      color="error"
                      onClick={() => handleRemoveFile(index)}
                      sx={{ position: "absolute", top: "-10px", right: "-10px" }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions>
          {!editingProduct ? (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formIsValid}
            >
              Submit
            </MDButton>
          ) : (
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!formIsValid}
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
          <Box>
            <Typography
              color={"#F44335"}
              sx={{ display: "inline-block", margin: "0px 5px", fontWeight: "bold" }}
            >
              {deletingProduct?.name}
            </Typography>
            ?
          </Box>
        </DialogContent>
        <DialogActions>
          <MDButton variant="gradient" color="dark" onClick={handleCloseDeleteBrandDialog}>
            Cancel
          </MDButton>
          <MDButton variant="gradient" color="success" onClick={handleSubmitDeleteProduct}>
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

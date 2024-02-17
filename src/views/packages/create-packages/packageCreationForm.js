import { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';

// material-ui
import {
  Box,
  Stack,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  Grid,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import { useTheme, styled, alpha } from '@mui/material/styles';

// project imports
import useUser from 'hooks/useUser';
import { gridSpacing } from 'store/constant';
import { packageRoutes } from 'constants/servicesRoutes';
import { protectedFetch as axios } from 'utils/axios';
import { routeConsts } from 'constants/routeConsts';
import LoaderButton from 'ui-component/LoaderButton';
import SortableTextInputList from 'ui-component/SortableTextInputList';
import IconSelector from 'ui-component/IconSelector';

// assets
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { IconPackage } from '@tabler/icons';
import LinkIcon from '@mui/icons-material/Link';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const StyledFormHelper = styled(FormHelperText)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.error.main, 0.2),
  color: `${theme.palette.error.dark} !important`,
  borderRadius: '4px',
  minWidth: '100px',
  textAlign: 'center',
  paddingLeft: theme.spacing(0.5),
  paddingRight: theme.spacing(2),
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '30px',
  gap: theme.spacing(0.7)
}));

// ============================|| PACKAGE CREATION ||============================ //
const validationSchema = Yup.object().shape({
  name: Yup.string().max(14).required('Name is required'),
  tagline: Yup.string().max(65).required('Tagline is required'),
  packageType: Yup.mixed().oneOf(['free', 'paid']).required('Payment type is required'),
  price: Yup.number()
    .when('packageType', {
      is: 'paid',
      then: Yup.number().required('Price is required').min(0, 'Price must be non-negative').moreThan(0, 'Price must be greater than 0'),
      otherwise: Yup.number().nullable()
    })
    .min(0, 'Price must be non-negative'),

  selfHosting: Yup.boolean().required(),

  slUrl: Yup.string().when('selfHosting', {
    is: true,
    then: Yup.string().required('Self Hosting Url is required')
  }),
  status: Yup.boolean().required(),
  contactUs: Yup.boolean().required(),
  icon: Yup.string().required(),
  packageFeatures: Yup.array()
    .of(
      Yup.object().shape({
        precedence: Yup.number().required('Precedence is required').integer('Precedence must be an integer').min(0),
        title: Yup.string().required('Title is required')
      })
    )
    .test('array', 'Features are required', (value) => value && value.length > 0)
});

const defaultValues = {
  name: '',
  packageType: 'free',
  price: 0,
  tagline: '',
  packageFeatures: [],
  selfHosting: false,
  slUrl: '',
  icon: '',
  status: false,
  contactUs: false
};

PackageCreateForm.propTypes = {
  onSubmit: PropTypes.func
};

function PackageCreateForm() {
  const theme = useTheme();
  const user = useUser();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [isEdit, setIsEdit] = useState(false);
  const [packageLength, setPackageLength] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    if (state && state?._id) {
      setPackageLength(state.packageLength);
      const { selfHosting, status, contactUs } = state;
      const fixStatus = status === 'active';
      const fixSelfHosting = selfHosting === 'enabled';
      const fixContactUs = contactUs === 'enabled';
      const modifiedValues = { ...state, selfHosting: fixSelfHosting, status: fixStatus, contactUs: fixContactUs };
      setIsEdit(true);
      setInitialValues(modifiedValues);
    }
  }, [location]);

  const { mutate: postPackage, isPending } = useMutation({
    mutationFn: async (values) => {
      const payload = generatePayload(values);
      const response = await axios.post(packageRoutes.create, payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`Package '${data.name}' created successfully!`);
      formik.resetForm();
      navigate(routeConsts.package.index + routeConsts.package.children.packagesList);
    }
  });

  const { mutate: editPackage, isPending: isFetchingEdit } = useMutation({
    mutationFn: async (values) => {
      const payload = generatePayload(values);
      const response = await axios.put(packageRoutes.edit + location.state._id, payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`Package '${data.name}' updated successfully!`);
      formik.resetForm();
      navigate(routeConsts.package.index + routeConsts.package.children.packagesList);
    }
  });
  function generatePayload(values) {
    let precedence = values.precedence;
    if (!isEdit) precedence = Number(packageLength) + 1;
    const modifiedValues = {
      ...values,
      selfHosting: values.selfHosting ? 'enabled' : 'disabled',
      status: values.status ? 'active' : 'inActive',
      contactUs: values.contactUs ? 'enabled' : 'disabled',
      createdBy: user._id,
      updatedBy: user._id,
      precedence
    };
    return modifiedValues;
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: isEdit ? editPackage : postPackage,
    enableReinitialize: true
  });
  const { errors, touched, values, handleSubmit, handleChange, handleBlur } = formik;
  const isDisabled = isPending || isFetchingEdit;
  return (
    <Fragment>
      <form noValidate onSubmit={handleSubmit}>
        <Grid
          container
          columnSpacing={gridSpacing}
          rowSpacing={0.5}
          sx={{ alignItems: touched.name && errors.name ? 'flex-start' : 'flex-end' }}
        >
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
              <OutlinedInput
                id="outlined-adornment-name"
                type="text"
                value={values.name}
                name="name"
                placeholder="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <IconPackage />
                  </InputAdornment>
                }
                inputProps={{}}
              />
              <Stack direction="row" justifyContent="flex-end" minHeight={32}>
                {touched.name && errors.name && (
                  <StyledFormHelper id="standard-weight-helper-text-name">
                    <ErrorOutlineIcon />
                    <span>{errors.name}</span>
                  </StyledFormHelper>
                )}
              </Stack>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={4}>
                <FormControl fullWidth error={Boolean(touched.packageType && errors.packageType)}>
                  <ToggleButtonGroup
                    color="primary"
                    id="outlined-adornment-packageType"
                    exclusive
                    name="packageType"
                    value={values.packageType}
                    onChange={(event) => {
                      if (event.target.value === 'free') formik.setFieldValue('price', 0);
                      formik.setFieldValue('packageType', event.target.value);
                    }}
                    onBlur={formik.handleBlur('packageType')}
                    sx={{ width: '100%' }}
                  >
                    <ToggleButton value="free" sx={{ width: '50%' }}>
                      Free
                    </ToggleButton>
                    <ToggleButton value="paid" sx={{ width: '50%' }}>
                      Paid
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <Stack direction="row" justifyContent="flex-end" minHeight={32}>
                    {touched.packageType && errors.packageType && (
                      <StyledFormHelper id="standard-weight-helper-text-packageType">
                        <ErrorOutlineIcon />
                        <span>{errors.packageType}</span>
                      </StyledFormHelper>
                    )}
                  </Stack>
                </FormControl>
              </Grid>
              <Grid item md={8} sx={{ alignSelf: 'flex-end' }}>
                <FormControl fullWidth error={Boolean(touched.price && errors.price)}>
                  <OutlinedInput
                    id="outlined-adornment-price"
                    type="number"
                    placeholder="Price"
                    value={values.price}
                    name="price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={values.packageType === 'free'}
                    inputProps={{
                      typeof: 'number'
                    }}
                    startAdornment={
                      <InputAdornment position="start">
                        <AttachMoneyOutlinedIcon />
                      </InputAdornment>
                    }
                  />
                  <Stack direction="row" justifyContent="flex-end" minHeight={32}>
                    {touched.price && errors.price && (
                      <StyledFormHelper id="standard-weight-helper-text-price">
                        <ErrorOutlineIcon />
                        <span>{errors.price}</span>
                      </StyledFormHelper>
                    )}
                  </Stack>
                </FormControl>
              </Grid>
              {/* )} */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(touched.tagline && errors.tagline)}>
              <OutlinedInput
                id="outlined-adornment-tagline"
                type="text"
                value={values.tagline}
                name="tagline"
                placeholder="Tagline"
                onBlur={handleBlur}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <BookmarkBorderOutlinedIcon />
                  </InputAdornment>
                }
                inputProps={{}}
              />
              <Stack direction="row" justifyContent="flex-end" minHeight={32}>
                {touched.tagline && errors.tagline && (
                  <StyledFormHelper id="standard-weight-helper-text-tagline">
                    <ErrorOutlineIcon />
                    <span>{errors.tagline}</span>
                  </StyledFormHelper>
                )}
              </Stack>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                border: `1px solid ${theme.palette.action.disabled}`,
                borderRadius: 1,
                background: theme.palette.grey[50],
                px: 1,
                py: 0.7
              }}
            >
              <Typography variant="legend">Status</Typography>
              <FormControlLabel
                sx={{ width: '100%', justifyContent: 'flex-end' }}
                control={<Switch name="status" checked={values.status} onChange={handleChange} onBlur={handleBlur} />}
                label={values.status ? 'Active' : 'Inactive'}
              />
            </Stack>
            <Stack direction="row" justifyContent="flex-end" minHeight={32}>
              {touched.status && errors.status && (
                <StyledFormHelper id="standard-weight-helper-text-status">
                  <ErrorOutlineIcon />
                  <span>{errors.status}</span>
                </StyledFormHelper>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={6}>
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    border: `1px solid ${theme.palette.action.disabled}`,
                    borderRadius: 1,
                    background: theme.palette.grey[50],
                    px: 1,
                    py: 0.7
                  }}
                >
                  <Typography component="legend" whiteSpace="nowrap">
                    Self-Hosting
                  </Typography>
                  <FormControlLabel
                    sx={{ width: '100%', justifyContent: 'flex-end' }}
                    control={<Switch name="selfHosting" checked={values.selfHosting} onChange={handleChange} onBlur={handleBlur} />}
                    label={values.selfHosting ? 'Enabled' : 'Disabled'}
                  />
                </Stack>
                <Stack direction="row" justifyContent="flex-end" minHeight={32}>
                  {touched.selfHosting && errors.selfHosting && (
                    <StyledFormHelper id="standard-weight-helper-text-selfHosting">
                      <ErrorOutlineIcon />
                      <span>{errors.selfHosting}</span>
                    </StyledFormHelper>
                  )}
                </Stack>
              </Grid>
              {/* {values.selfHosting && ( */}
              <Grid item xs={6}>
                <FormControl fullWidth error={Boolean(touched.slUrl && errors.slUrl)}>
                  <OutlinedInput
                    id="outlined-adornment-slUrl"
                    type="text"
                    value={values.slUrl}
                    name="slUrl"
                    placeholder="Self Hosting Url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!values.selfHosting}
                    startAdornment={
                      <InputAdornment position="start">
                        <LinkIcon />
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  <Stack direction="row" justifyContent="flex-end" minHeight={32}>
                    {touched.slUrl && errors.slUrl && (
                      <StyledFormHelper id="standard-weight-helper-text-slUrl">
                        <ErrorOutlineIcon />
                        <span>{errors.slUrl}</span>
                      </StyledFormHelper>
                    )}
                  </Stack>
                </FormControl>
              </Grid>
              {/* )} */}
            </Grid>
          </Grid>
          {/* show Contact us switch */}
          <Grid item xs={12} lg={6}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                border: `1px solid ${theme.palette.action.disabled}`,
                borderRadius: 1,
                background: theme.palette.grey[50],
                px: 1,
                py: 0.7
              }}
            >
              <Typography component="legend" whiteSpace="nowrap">
                Contact us button
              </Typography>
              <FormControlLabel
                sx={{ width: '100%', justifyContent: 'flex-end' }}
                control={<Switch name="contactUs" checked={values.contactUs} onChange={handleChange} onBlur={handleBlur} />}
                label={values.contactUs ? 'Enabled' : 'Disabled'}
              />
            </Stack>
            <Stack direction="row" justifyContent="center" minHeight={32}>
              {touched.contactUs && errors.contactUs && (
                <StyledFormHelper id="standard-weight-helper-text-contactUs">
                  <ErrorOutlineIcon />
                  <span>{errors.contactUs}</span>
                </StyledFormHelper>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6} alignSelf="flex-start">
            <Stack>
              <IconSelector value={values.icon} handleChange={(value) => formik.setFieldValue('icon', value)} />
            </Stack>
            <Stack direction="row" justifyContent="flex-end" minHeight={32}>
              {touched.icon && errors.icon && (
                <StyledFormHelper id="standard-weight-helper-text-icon">
                  <ErrorOutlineIcon />
                  <span>{errors.icon}</span>
                </StyledFormHelper>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <SortableTextInputList
              error={Boolean(touched.packageFeatures && errors.packageFeatures)}
              handleChange={(list) => formik.setFieldValue('packageFeatures', list)}
              onBlur={handleBlur}
              value={values.packageFeatures}
              fullWidth
              placeholder="Features"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ExtensionOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
            <Stack direction="row" justifyContent="center" minHeight={32}>
              {touched.packageFeatures && errors.packageFeatures && (
                <StyledFormHelper error id="standard-weight-helper-text-packageFeatures">
                  <ErrorOutlineIcon />
                  <span>{errors.packageFeatures}</span>
                </StyledFormHelper>
              )}
            </Stack>
          </Grid>
        </Grid>

        {errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{errors.submit}</FormHelperText>
          </Box>
        )}

        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }} spacing={2}>
          <LoaderButton isLoading={isDisabled} disabled={isDisabled} size="large" type="submit" variant="contained">
            {isEdit ? 'Update' : 'Save'}
          </LoaderButton>
          <Button
            disabled={isDisabled}
            type="reset"
            variant="outlined"
            size="large"
            color="silver"
            onClick={() => navigate(`${routeConsts.package.index + routeConsts.package.children.packagesList}`)}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Fragment>
  );
}

export default PackageCreateForm;

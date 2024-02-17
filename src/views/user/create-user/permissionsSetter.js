import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

RenderPermission.propTypes = {
  permission: PropTypes.object,
  checkedPermissions: PropTypes.array,
  onPermissionChange: PropTypes.func
};

function RenderPermission({ permission, checkedPermissions, onPermissionChange }) {
  const [checked, setChecked] = useState(checkedPermissions[permission._id] || false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onPermissionChange(permission._id, event.target.checked);
  };

  return (
    <div key={permission._id}>
      {permission.type !== 'module' && (
        <FormControlLabel
          label={permission.title}
          control={<Checkbox checked={checked || checkedPermissions.includes(permission._id)} onChange={handleChange} />}
        />
      )}
      {permission.children && checkedPermissions.includes(permission._id) && (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {permission.children.map((child) => (
            <RenderPermission
              key={child._id}
              permission={child}
              checkedPermissions={checkedPermissions}
              onPermissionChange={onPermissionChange}
            />
          ))}
        </Box>
      )}
    </div>
  );
}

PermissionsSetter.propTypes = {
  module: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func
};

function PermissionsSetter({ module, values, handleChange }) {
  const [checkedPermissions, setCheckedPermissions] = useState([]);

  const handlePermissionChange = (permissionId, isChecked) => {
    let newCheckedArray = [];
    setCheckedPermissions((prevCheckedPermissions) => {
      if (isChecked) {
        newCheckedArray = [...prevCheckedPermissions, permissionId];
        return [...prevCheckedPermissions, permissionId];
      } else {
        const newCheckedPermissionsArray = prevCheckedPermissions.filter((p) => p !== permissionId);
        newCheckedArray = newCheckedPermissionsArray;
        return newCheckedPermissionsArray;
      }
    });
    handleChange(removeUncheckedPermissions(module.children, newCheckedArray));
  };

  useEffect(() => {
    function getCheckedPermissions(permissions, checkedPermissions = []) {
      if (!permissions || !permissions.length) {
        return checkedPermissions;
      }

      permissions.forEach((permission) => {
        checkedPermissions.push(permission._id);
        if (permission.children && permission.children.length) {
          getCheckedPermissions(permission.children, checkedPermissions);
        }
      });

      return checkedPermissions;
    }

    if (values && Array.isArray(values.children) && values.children.length > 0) {
      setCheckedPermissions(getCheckedPermissions(values.children));
    }
  }, [values]);

  function removeUncheckedPermissions(permissions, checkedPermissions) {
    return permissions.reduce((acc, permission) => {
      if (checkedPermissions.includes(permission._id)) {
        if (permission.children) {
          acc.push({ ...permission, children: removeUncheckedPermissions(permission.children, checkedPermissions) });
        } else {
          acc.push(permission);
        }
      }
      return acc;
    }, []);
  }

  return (
    <div key={module._id}>
      <Box sx={{ fontWeight: 900, fontSize: '1.3rem', mb: 2 }}>{module.title}</Box>
      {module.children && (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {module.children.map((page) => (
            <RenderPermission
              key={page._id}
              permission={page}
              checkedPermissions={checkedPermissions}
              onPermissionChange={handlePermissionChange}
            />
          ))}
        </Box>
      )}
    </div>
  );
}

export default PermissionsSetter;

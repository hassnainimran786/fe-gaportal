import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';

// project imports
import { protectedFetch as axios } from 'utils/axios';
import { user } from 'constants/servicesRoutes';
import MainCard from 'ui-component/cards/MainCard';
import UserCreateForm from './UserCreateForm';
import useUser from 'hooks/useUser';

const CreateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(null);
  const userdata = useUser();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (userdata && !userdata.permissions[0]?.all && !location.state?._id) {
      let permissions = userdata.permissions.find((permission) => permission.title === 'User');
      permissions = permissions.children.find((permission) => permission.title === 'Add Users');
      const isCreate = permissions.children.findIndex((permission) => permission.title === 'Save') > -1;
      if (!isCreate) {
        toast.warning('You are not authorized to create user');
        navigate(-1);
      }
    }

    if (location.state?._id) {
      if (!userdata.permissions[0]?.all) {
        let permissions = userdata?.permissions.find((permission) => permission.title === 'User');
        permissions = permissions.children.find((permission) => permission.title === 'Manage Users');
        const isEdit = permissions?.children.findIndex((permission) => permission.title === 'Edit') > -1;
        if (!isEdit) {
          toast.warning('You are not authorized to edit user');
          navigate(-1);
        }
      }
      setIsEdit(location.state._id);
    }
  }, [location, userdata, navigate]);

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: async (data) => {
      const { password, userName, roleId, email, status, permissions } = data;
      const response = await axios.post(user.create, {
        password,
        userName,
        roleId,
        email,
        status: status ? 'active' : 'inActive',
        permissions
      });
      return response.data;
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      toast.success('User created successfully');
      queryClient.invalidateQueries('users');
    }
  });
  const { mutate: updateUser } = useMutation({
    mutationFn: async (data) => {
      const { password, userName, roleId, email, status, permissions } = data;
      const dataToSend = {
        password,
        userName,
        roleId,
        email,
        status: status ? 'active' : 'inActive',
        permissions
      };
      if (!password) delete dataToSend.password;
      const response = await axios.put(`${user.edit}/${isEdit}`, dataToSend);
      return response.data;
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries('users');
    }
  });

  return (
    <MainCard title="Create user">
      <UserCreateForm onSubmit={isEdit ? updateUser : createUser} isPending={isPending} isEdit={Boolean(isEdit)} />
    </MainCard>
  );
};

export default CreateUser;

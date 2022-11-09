import React, { useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Layouts/Admin/Layout';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import ConfirmModal from '@/Shared/Modals/ConfirmModal';
import { Inertia } from '@inertiajs/inertia';

const DeleteUserDialog = ({ user }) => {

  const [deleteUserDialog, setDeleteUserDialog] = useState(false);

  function handleDeleteUserSubmit(e) {
    Inertia.delete(route('users.destroy', user.id), {
      preserveScroll: true
    });
  }

  return (
    <>
      <ConfirmModal
        title={`Delete user '${user.name}'?`}
        open={deleteUserDialog}
        onClose={() => setDeleteUserDialog(false)}
        onConfirm={handleDeleteUserSubmit}
      >
        Are you sure you want to delete this user?
      </ConfirmModal>
      <span className="flex items-center px-4 focus:outline-none cursor-pointer" onClick={() => setDeleteUserDialog(true)}><i className="bi bi-trash"></i></span>
    </>
  )
}

const RestoreUserDialog = ({ user }) => {

  const [restoreUserDialog, setRestoreUserDialog] = useState(false);

  function handleRestoreUserSubmit(e) {
    Inertia.put(route('users.restore', user.id), {
      preserveScroll: true
    });
  }

  return (
    <>
      <ConfirmModal
        title={`Restore user '${user.name}'?`}
        open={restoreUserDialog}
        onClose={() => setRestoreUserDialog(false)}
        onConfirm={handleRestoreUserSubmit}
      >
        Are you sure you want to restore this user?
      </ConfirmModal>
      <span className="flex items-center px-4 focus:outline-none cursor-pointer" onClick={() => setRestoreUserDialog(true)}><i className="bi bi-check2-square"></i></span>
    </>
  )
}

const UserActionToolbar = ({ user }) => {
  return (
    <>
      <InertiaLink
        tabIndex="-1"
        href={route('users.edit', user.id)}
        className="flex items-center px-4 focus:outline-none"
      >
        <i className="bi bi-pencil-square"></i>
      </InertiaLink>
      {user.deleted_at == '' && <DeleteUserDialog user={user} />}
      {user.deleted_at != '' && <RestoreUserDialog user={user} />}
    </>
  )
}

const UserRowData = ({ user }) => {
  console.log(user);
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{(user.type == 1 ? 'Owner' : 'Default')}</td>
      <td>{user.roles_list}</td>
      <td>0</td>
      <td>{user.created_at}</td>
      {/* <td></td> */}
      <td>0</td>
      <td>
        <div className="inline-flex items-center pr-5">
          <UserActionToolbar user={user} />
        </div>
      </td>
    </tr>
  );
};

const Index = () => {
  const { users, roles, filters } = usePage().props;
  const {
    data,
    meta: { links }
  } = users;

  return (
    <div>
      <div className="tab-content w-100">
        <div className="flex items-center justify-between mb-6">
          <SearchFilter />
        </div>
        <div className="tab-pane fade show active" role="tabpanel">
          <div className="overflow-x-auto bg-white shadow">
            <div className="card-body pt-0">
              <div className="table-responsive">
                <table className="table align-middle table-row-dashed fs-6 gy-5">
                  <thead>
                    <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                      <th>Full name</th>
                      <th>Email</th>
                      <th>User Type</th>
                      <th>Roles</th>
                      <th>Amount spent</th>
                      <th>Date created</th>
                      <th>Enrollments</th>
                      {/* <th>Last sign in</th> */}
                      <th className="min-w-75px">Action</th>
                    </tr>
                  </thead>
                  <tbody className="fw-bold text-gray-600">
                    {data.map((user, index) => (
                      <UserRowData user={user} key={index} />
                    ))}
                    {data.length === 0 && (
                      <tr>
                        <td className="px-6 py-4 border-t" colSpan="8">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination links={links} />
        </div>
      </div>
    </div>
  );
};

Index.layout = page => <Layout title="Users" children={page}
  toolbarbuttons={[{ link: route('users.create'), name: 'New User', icon: 'bi bi-plus' }]}
  openedMenu="3" />

export default Index;
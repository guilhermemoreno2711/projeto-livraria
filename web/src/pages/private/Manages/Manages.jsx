import React, { useCallback, useState } from "react";
import { useAdminsData, useDeleteAdmin } from "../../../hooks/useAdmins";

//-----Components
import SearchInputAdmin from "../../../components/SearchInputAdmin/SearchInputAdmin";
import AdminAddButton from "../../../components/AdminAddButton/AdminAddButton";
import AdminList from "../../../components/AdminList/AdminList";
import { ManagesModal } from "./ManagesModal";
import Loading from "../../../components/PageProcessing/Loading/Loading";
import ErrorFinding from "../../../components/PageProcessing/ErrorFinding/ErrorFinding";
import { toast } from "react-toastify";

import "./Manages.scss";

function Manages() {
  const { data, isLoading, error } = useAdminsData();
  const { mutate: deleteAdmin } = useDeleteAdmin();

  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateAdmin, setIsCreateAdmin] = useState(false);

  const getFilteredData = () => {
    let filteredData = [...data];

    if (filters.name) {
      filteredData = filteredData.filter(
        (adminItem) =>
          adminItem.name.toUpperCase().indexOf(filters.name.toUpperCase()) !==
          -1
      );
    }

    return filteredData;
  };

  const handleFilterChange = useCallback((evt) => {
    const { name, value } = evt.target;

    const getValue = (val) => {
      if (val === "true") {
        return true;
      } else if (val === "false") {
        return false;
      } else {
        return val;
      }
    };

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: getValue(value),
    }));
  }, []);

  const onClickCreate = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      newPassword: '',
      passwordConfirmation: '',
    });
    setIsModalOpen(true);
    setIsCreateAdmin(true);
  };

  const onClickUpdate = (row) => {
    setFormData({
      ...row,
      password: '',
      newPassword: '',
      passwordConfirmation: '',
    });
    setIsModalOpen(true);
    setIsCreateAdmin(false);
  };

  const onClickDelete = (data) => {
    const deletingDataToast = toast.loading('Deletando administrador...', {
      autoClose: false
    });

    try {
      deleteAdmin(data.id)
      toast.dismiss(deletingDataToast);
      toast.success('Administrador deletado com sucesso!');
    } catch (err) {
      toast.dismiss(deletingDataToast);
      toast.error('Erro ao deletar Administrador.');
    }
  }

  if (isLoading)
    return (
      <Loading
        title="Buscando lista de administradores"
        style={{ marginTop: "18rem" }}
      />
    );

  if (error)
    return (
      <ErrorFinding
        text="Erro ao carregar lista de administradores"
        style={{ marginTop: "13rem" }}
      />
    );

  return (
    <section className="manage-page">
      <div className="manage-page-inputs">
        <SearchInputAdmin
          title="Nome"
          placeholder="Pessoa 1"
          name="name"
          onChange={handleFilterChange}
        />
        <AdminAddButton title="Adicionar" onClick={onClickCreate} />
      </div>

      <AdminList
        tableLayout={[
          {
            key: "name",
            label: "Nome",
          },
          {
            key: "email",
            label: "E-mail",
          },
          {
            key: "phone",
            label: "Contato",
          },
        ]}
        listData={getFilteredData()}
        onEdit={onClickUpdate}
        onDelete={onClickDelete}
        type='adminAccounts'
      ></AdminList>

      {isModalOpen && (
        <ManagesModal
          isCreateAdmin={isCreateAdmin}
          formData={formData}
          setFormData={setFormData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </section>
  );
}

export default Manages;

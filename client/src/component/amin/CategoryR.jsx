import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import Admin from './Admin';
import { baseUrl1 } from '../../AxiosR';
import { toast } from 'react-toastify';
import CategoryForm from '../form/CategoryForm';

export default function CategoryR() {

  const [category, setCategory] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  // Create + Update
  const submitData = async (e) => {

    e.preventDefault();

    try {

      let data;

      if (editId) {

        // Update
        ({ data } = await baseUrl1.post(
          `/update/${editId}`,
          { name }
        ));

      } else {

        // Create
        ({ data } = await baseUrl1.post(
          "/cate",
          { name }
        ));

      }

      if (data?.success) {

        toast.success(data?.message);
        setName('');
        setEditId(null);
        getAllProduct();

      } else {

        toast.error(data?.message);

      }

    } catch (error) {

      console.log(error);
      toast.error("Invalid Data");

    }
  };

  // Get Categories
  const getAllProduct = async () => {

    try {

      const { data } = await baseUrl1.get("/getAll");

      if (data?.success) {

        setCategory(data.category);

      }

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  // Delete
  const deleteData = async (id) => {

    try {

      const { data } = await baseUrl1.post(
        `/delete/${id}`
      );

      if (data?.success) {

        toast.success(data?.message);
        getAllProduct();

      }

    } catch (error) {

      console.log(error);
      toast.error("Invalid Data");

    }
  };

  return (
    <Layout>

      <div className='container-fluid py-4'>

        <div className='row'>

          {/* Sidebar */}
          <div className='col-md-3 mb-4'>

            <div className='card shadow border-0 rounded-4'>

              <div className='card-body'>
                <Admin />
              </div>

            </div>

          </div>

          {/* Content */}
          <div className='col-md-9'>

            <div className='card shadow border-0 rounded-4'>

              <div className='card-body p-4'>

                <h1 className='fw-bold text-primary mb-4'>
                  Category
                </h1>

                {/* Form */}
                <CategoryForm
                  submitData={submitData}
                  value={name}
                  setValue={setName}
                  buttonText={editId ? "Update" : "Submit"}
                />

                {/* Table */}
                <table className='table table-bordered mt-4'>

                  <thead className='table-dark'>

                    <tr>
                      <th>S.NO</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {category?.map((item, idx) => (

                      <tr key={item._id}>

                        <td>{idx + 1}</td>

                        <td>{item.name}</td>

                        <td>

                          {/* Edit */}
                          <button
                            className='btn btn-primary btn-sm me-2'
                            onClick={() => {
                              setName(item.name);
                              setEditId(item._id);
                            }}
                          >
                            Edit
                          </button>

                          {/* Delete */}
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteData(item._id)}
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}
import React from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 } from 'uuid';
import FormFields from '../../components/FormFields';
import { addCustomer } from '../../actions/customersActions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
    customerName: yup.string().required('*Enter Customer Name'),
    city: yup.string().required('*Enter City')
});

const AddCustomer = (props) => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();

    const formFields = [
        { label: "Customer Name", name: 'customerName', register, error: errors.customerName ? errors.customerName : {} },
        { label: "City", name: 'city', register, error: errors.city ? errors.city : {} }
    ]

    const onSubmit = (data) => {
        const formData = {
            id: v4(),
            ...data,
        }
        dispatch(addCustomer(formData));
        toast.dark("Customer added!");
    }

    return (
        <>
            <h1> Add Customer </h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                {formFields.map(field => (
                    <FormFields key={field.name} {...field} />
                ))}
                <input type="submit" value="Add Customer" />
            </form>
        </>
    )
}

export default AddCustomer
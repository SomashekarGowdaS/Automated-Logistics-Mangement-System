import React from 'react'
import { useDispatch } from 'react-redux'
import { v4 } from 'uuid';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify'
import { addItem } from '../../actions/itemsActions';
import FormFields from '../../components/FormFields'

const schema = yup.object().shape({
    itemName: yup.string().required('*Enter Item Name'),
    price: yup
        .number('*Enter Numbers Only')
        .required('*Enter Price')
        .positive('*Enter Positive Numbers Only')
});

const AddItem = (props) => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();

    const formFields = [
        { label: "Item Name", name: 'itemName', register, error: errors.itemName ? errors.itemName : {} },
        { label: "Price", name: 'price', register, error: errors.price ? errors.price : {} }
    ]

    const onSubmit = (data) => {
        const formData = {
            id: v4(),
            ...data,
        }
        dispatch(addItem(formData));
        toast.dark("Item added!");
    }

    return (
        <>
            <h1> Add Item </h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                {formFields.map(field => (
                    <FormFields key={field.name} {...field} />
                ))}
                <input type="submit" value="Add Item" />
            </form>
        </>
    )
}

export default AddItem
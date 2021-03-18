import React from 'react'
import { useDispatch } from 'react-redux'
import { v4 } from 'uuid';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { addItem } from '../../actions/itemsActions';
import FormFields from '../../components/FormFields'

const schema = yup.object().shape({
    itemName: yup.string().required(),
    price: yup
        .number()
        .required()
        .positive()
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
    }
    console.log(errors)
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                {formFields.map(field => (
                    <FormFields key={field.name} {...field} />
                ))}
                <input type="submit" value="Add Item" />
            </form>
        </div>
    )
}

export default AddItem
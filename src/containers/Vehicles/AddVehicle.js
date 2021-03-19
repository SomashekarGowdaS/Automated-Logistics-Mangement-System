import React from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { addVehicle } from '../../actions/vehiclesActions';
import FormFields from '../../components/FormFields';
import { vehicleOptions } from '../../constants'

const schema = yup.object().shape({
    registrationNumber: yup.string().required(),
    vehicleType: yup.string().required(),
    city: yup.string().required()
});

const AddVehicle = (props) => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();

    const formFields = [
        { label: "Registration Number", name: 'registrationNumber', register, error: errors.registrationNumber ? errors.registrationNumber : {} },
        { label: "Vehicle Type", name: 'vehicleType', register, error: errors.vehicleType ? errors.vehicleType : {}, type: 'select', options: vehicleOptions },
        { label: "City", name: 'city', register, error: errors.city ? errors.city : {} },
    ]

    const onSubmit = (data) => {
        const formData = {
            ...data,
            availability: true
        }
        dispatch(addVehicle(formData));
        toast.dark("Vehicle added!");
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                {formFields.map(field => (
                    <FormFields key={field.name} {...field} />
                ))}
                <input type="submit" value="Add Vehicle" />
            </form>
        </div>
    )
}

export default AddVehicle